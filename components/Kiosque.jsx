import React from "react"
import R from "ramda"
import classNames from "classnames"
import removeAccents from "remove-accents"

import m from "../domain/model"
import Vignette from "./Vignette.jsx"
import { cacheWikiPages } from "../utils/wikipedia"
import Filters from "../components/Filters"

const normalise = (s) => removeAccents(s?.toLowerCase())

const reduceByAppending = R.reduceBy(R.flip(R.append()), [])

/* Le code qui liste et résoud les sujets du kiosque.

TODO Plein d'autres sujets sont pertinents.

- Certains demandent d'enrichir les entités (par exemple en ajoutant la forme juridique de chaque journal)
- Certains n'attendent qu'à être implémentés : par exemple, faire le top 10 des propriétaires de journaux.
*/
const questions = [
  {
    name: "fortune",
    icon: "fa-money",
    question: (
      <span>
        Quels médias sont contrôlés par des <b>grandes fortunes</b> ?
      </span>
    ),
    filter: () =>
      reduceByAppending(({ id, actionnariat }) => {
        if (actionnariat && R.is(String)(actionnariat.inconnu)) return "4: Actionnariat inconnu"
        let { interests } = m.getInterestingStuff(id),
          fortunes = interests.filter((i) => i.type == "fortune"),
          score = fortunes.reduce((memo, { relativeShare }) => memo + relativeShare, 0)
        return score > 30 ? "1: Fortement" : score > 0 ? "2: Un peu" : "3: Pas du tout"
      })(m.entitiesByType("journal")),
  },
  {
    name: "revenus",
    icon: "fa-shopping-cart",
    question: (
      <span>
        Quels médias <b>dépendent de la publicité</b> ou de leurs abonnés ?
      </span>
    ),
    filter: () =>
      reduceByAppending(({ journal: { revenus } }) => {
        let r = R.is(String)(revenus) ? [revenus] : revenus
        return R.equals(["abonnements", "publicité"], r.sort())
          ? "2: publicité et abonnements"
          : R.equals(["publicité"], r)
          ? "1: publicité uniquement"
          : R.equals(["abonnements"], r)
          ? "3: pas de publicité, abonnements"
          : "4: autres"
      })(m.entitiesByType("journal")),
    backgrounds: {
      1: "pub.png",
      2: "pub-abonnement.png",
      3: "pas-de-pub.png",
    },
  },
  { question: "Quels médias ont des liens avec des grandes entreprises ?" },
  { question: "Quels sont les formes d'entreprise les plus courantes ?" },
  { question: "Quels médias utilisent le financement participatif ?" },
  { question: "Qui sont les actionnaires les plus présents ?" },
  { question: "Quels médias sont liés à des secteurs industriels ?" },
  { question: "Quel nombre d'actionnaires par média ?" },
]

export default class Kiosque extends React.Component {
  state = {
    search: null,
    filters: {},
    selectedQuestion: null,
    wikiCacheReady: false,
  }

  componentDidMount() {
    cacheWikiPages(m.entitiesByType("journal")).then(() => this.setState({ wikiCacheReady: true }))
    window.model = m
  }

  onRadioClick = ({ target: { name, value } }) => {
    let { filters } = this.state,
      newFilters = filters[name] === value ? R.dissoc(name)(filters) : R.assoc(name, value)(filters)

    this.setState({ filters: newFilters })
  }

  searchInput = ({ target: { value } }) =>
    this.setState({
      search: value.length < 3 ? null : normalise(value),
    })

  vignettes(questionItems, size) {
    let { search, filters } = this.state

    return R.pipe(
      R.filter(
        (e) =>
          (search == null || normalise(m.nodeName(e)).indexOf(search) > -1) &&
          (R.isEmpty(filters) ||
            !R.pipe(
              R.toPairs,
              R.find(([k, v]) => e.journal[k] !== v),
            )(filters)),
      ),
      R.sortBy(R.compose(R.toLower, m.nodeNameFromId, R.prop("id"))),
      R.sortBy(R.compose(R.prop("id"))),
      R.map((e) => <Vignette key={e.id} journal={e} size={size} />),
    )(questionItems ? questionItems : m.entitiesByType("journal"))
  }

  render() {
    const { selectedQuestion } = this.state
    const selectedQuestionData = questions.find(({ question }) => question === selectedQuestion)
    const selectedQuestionName = selectedQuestionData?.name
    const selectedQuestionBackgrounds = selectedQuestionData?.backgrounds
    const selectedQuestionFilter = selectedQuestionData?.filter

    let questionAnswers = selectedQuestionFilter ? R.toPairs(selectedQuestionFilter()) : []
    let sorted = R.sortBy(R.head)(questionAnswers)

    return (
      <div id="kiosque">
        <div id="search">
          <input type="text" placeholder="Trouvez un journal..." onChange={this.searchInput} />
          <Filters onClick={this.onRadioClick} state={this.state.filters} />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div id="questions">
          {selectedQuestion ? (
            <p id="backToQuestionList" onClick={() => this.setState({ selectedQuestion: null })}>
              <i className="fa fa-undo" aria-hidden="true"></i>&nbsp;&nbsp;revenir à la liste des sujets
            </p>
          ) : (
            <p>...ou explorez un sujet :</p>
          )}
          <ul id="question-list">
            {questions.map(({ name, question, filter, icon }) => (
              <li
                key={name}
                className={classNames({
                  selected: question === selectedQuestion,
                  oneSelected: selectedQuestion,
                  unavailable: !filter,
                })}
              >
                <span className="iconWrapper">
                  {filter ? (
                    <i className={"fa " + icon} aria-hidden="true"></i>
                  ) : (
                    <span className="iconUnavailabe">À venir</span>
                  )}
                </span>
                <a href="#" onClick={() => this.setState({ focusedAnswer: null, selectedQuestion: question })}>
                  {question}
                </a>
              </li>
            ))}
          </ul>
          {selectedQuestion && selectedQuestionFilter && (
            <section id="questionAnswers" data-question={selectedQuestionName}>
              <ul id="answerSummary">
                {sorted.map(([text, items]) => (
                  <li key={text} className={classNames("answerBlock")}>
                    <div className="score">
                      {items.length}
                      {/* {selectedQuestionBackgrounds && selectedQuestionBackgrounds[text[0]] && (
                        <img src={require("../images/" + selectedQuestionBackgrounds[text[0]])} />
                      )} */}
                    </div>
                    <div className="text">{text.split(": ")[1]}</div>
                    {this.state.wikiCacheReady && <ul className="answerVignettes">{this.vignettes(items, "small")}</ul>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {!selectedQuestion &&
          (this.state.wikiCacheReady ? (
            <ul id="vignettes">{this.vignettes(null, "big")}</ul>
          ) : (
            <div style={{ textAlign: "center", margin: "10%" }}>Chargement des images en cours...</div>
          ))}
      </div>
    )
  }
}
