import React from "react"
import Link from "next/link"
import R from "ramda"
import * as d3 from "d3"

import Aires from "./Aires"
import m from "../domain/model"
import WikiLink from "./WikiLink"
import badgesData from "../domain/badges.yaml"
import { cacheWikiPages } from "../utils/wikipedia"

import chiffres from "dsv-loader?delimiter=;!../data/chiffres-ministère-culture-2015.csv"
import chiffresAidePostale from "dsv-loader?delimiter=;!../data/compensation-tarif-postal-2014.csv"

let companyImgUrl = "https://upload.wikimedia.org/wikipedia/commons/1/19/Factory_black.png"

class Company extends React.Component {
  render() {
    let cache = window.wikiCache[this.props.node.id],
      imgUrl = cache && cache.imgUrl
    return <img width="100" src={imgUrl || companyImgUrl} />
  }
}

export default class Synthese extends React.Component {
  state = {
    wikiCacheReady: false,
  }
  componentDidMount() {
    cacheWikiPages(this.props.nodes).then(() => this.setState({ wikiCacheReady: true }))
  }

  render() {
    const { journal, interests, finalHolders } = this.props
    const ligne = chiffres.find((l) => l["wId"] === journal.id)
    const subvention = ligne ? +ligne["h"].replace(/\s/g, "") : 0
    const ligneAidePostale = chiffresAidePostale.find((l) => l["wid"] === journal.id)
    const aidePostale = ligneAidePostale ? +ligneAidePostale["aide"].replace(",", ".") : 0
    const [, type] = m.nodeType(journal)
    const devise = type.devise
    const subventionTotale = aidePostale + subvention

    if (!this.state.wikiCacheReady) return <div>Chargement en cours...</div>

    //////
    const companies = interests.filter((i) => i.type == "company")
    const fortunes = interests.filter((i) => i.type == "fortune")
    const sectors = interests.filter((i) => i.type == "sector")
    const family = m.family({ id: journal.id, derived: { finalHolders } })

    return (
      <section id="synthese">
        <div id="devise">
          {devise && (
            <span>
              <span className="quote">“ </span>
              {devise}
              <span className="quote"> „</span>
            </span>
          )}
          <span id="since">créé en {journal.depuis}</span>
        </div>

        {R.path(["actionnariat", "inconnu"])(journal) ? (
          <div id="unknown-alert">
            <p>
              {journal.actionnariat.inconnu} <i className="fa fa-lock" aria-hidden="true"></i>
            </p>
            <p>
              {"Vous avez d'autres informations ? "}
              <Link to="/contribuer">Contribuez !</Link>
            </p>
          </div>
        ) : (
          <section id="visualisations">
            <section id="actionnariat">
              <h2>Appartient à</h2>
              <span className="title-explanation">Vue rapide des grands actionnaires finaux</span>
              {finalHolders.length > 0 ? (
                <div>
                  <span id="toGalaxy">
                    <Link href={"/galaxie/" + journal.id}>
                      <a>
                        <img src={"/images/graph.png"} />
                        Voir le graphe complet
                        {/* <span className="switch-explanation">
													Affichage du graphe complet des actionnaires
												</span> */}
                      </a>
                    </Link>
                  </span>
                  <Aires journal={journal} finalHolders={finalHolders} />
                </div>
              ) : (
                <div>Nada</div>
              )}
            </section>

            <section id="interests">
              <h2>Liens</h2>
              <span className="title-explanation">Liens notables pouvant potentiellement influencer le journal</span>
              {!interests.length && (
                <div id="unknown-alert">
                  <p>
                    {"Rien n'a été noté. Vous avez des informations ? "}
                    <Link href="/contribuer">
                      <a>Contribuez !</a>
                    </Link>
                  </p>
                </div>
              )}
              {interests.length && (
                <ul>
                  {fortunes.length > 0 && (
                    <li id="fortune">
                      <h3>Grandes fortunes</h3>
                      {this.renderBadges(fortunes)}
                    </li>
                  )}
                  {sectors.length > 0 && (
                    <li id="sectors">
                      <h3>Lié aux secteurs</h3>
                      {this.renderBadges(sectors)}
                    </li>
                  )}

                  {companies.length > 0 && (
                    <li id="companies">
                      <h3>Lié à des entreprises</h3>
                      <ul>
                        {companies.map((c) => (
                          <li key={c.name}>
                            <Company node={c.more} />
                            <span className="badge">
                              {c.more.id.indexOf("w:") > -1 && (
                                <a href="#">
                                  <WikiLink name={"+"} wikiId={c.more.id} lang="fr" />
                                </a>
                              )}
                              <span className="linkType">
                                {c.relation === "intérêts croisés"
                                  ? "lien indirect"
                                  : `propriétaire à ${d3.format(",d")(c.value)} %`}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}

                  {family.length > 0 && (
                    <li id="family">
                      <h3>Famille</h3>
                      <ul>
                        {R.pipe(
                          R.filter(R.pipe(R.last, R.lt(50))),
                          R.map(([jId, score]) => (
                            <li key={jId}>
                              {m.nodeNameFromId(jId)} : {score > 95 ? "mêmes actionnaires" : "actionnariat proche"}
                            </li>
                          )),
                        )(family)}
                      </ul>
                    </li>
                  )}

                  {subventionTotale != 0 && (
                    <li id="subvention">
                      <h3>{"Subventions de l'État"}</h3>
                      <ul>
                        <li>
                          <span className="badge">
                            <img width="40px" src={"/images/marianne.png"} />
                            {d3.format(",d")(subventionTotale)} € en 2015
                          </span>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              )}
            </section>
          </section>
        )}
      </section>
    )
  }

  renderBadges(data) {
    return (
      <ul>
        {data.map(({ type, [type]: datum }) => (
          <Badge key={datum} datum={datum} />
        ))}
      </ul>
    )
  }
}

function Badge({ datum }) {
  const defaultBadge = badgesData["défaut"]
  const badgeDatum = badgesData[datum] || defaultBadge
  const { couleur1 = defaultBadge.couleur1, couleur2 = defaultBadge.couleur2, icône: icon } = badgeDatum

  return (
    <li className="badge" key={datum}>
      <i
        style={{
          background: `radial-gradient(ellipse at center, ${couleur2} 20%,  ${couleur1} 100%)`,
        }}
        className={"fa fa-" + icon}
        aria-hidden="true"
      ></i>
      {datum}
    </li>
  )
}
