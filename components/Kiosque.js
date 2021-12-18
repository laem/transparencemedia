import React from 'react'
import './Kiosque.css'
import m from '../model'
import Vignette from './Vignette.js'
import removeAccents from 'remove-accents'
import R from 'ramda'
import {cacheWikiPages} from '../utils/wikipedia'
import questions from './questions.js'
import classNames from 'classnames'
import './answerBlocks.css'
import Filters from '../components/Filters'

let normalise = s => removeAccents(s.toLowerCase())


export default class Kiosque extends React.Component {
	state = {
		search: null,
		filters: {},
		selectedQuestion: null,
		wikiCacheReady: false
	}

	componentDidMount() {
		cacheWikiPages(m.entitiesByType('journal'))
			.then( () =>
				this.setState({wikiCacheReady: true})
			)
	}

	onRadioClick = ({target: {name, value}}) => {
		let {filters} = this.state,
			newFilters = filters[name] === value ?
				R.dissoc(name)(filters) :
				R.assoc(name, value)(filters)

		this.setState({filters: newFilters})
	}

	render(){
		let {selectedQuestion} = this.state,
			selectedQuestionData = questions.find(({question}) => question === selectedQuestion),
			selectedQuestionName = selectedQuestionData && selectedQuestionData.name,
			selectedQuestionBackgrounds = selectedQuestionData && selectedQuestionData.backgrounds,
			selectedQuestionFilter = selectedQuestionData && selectedQuestionData.filter

		return (
				<div id="kiosque">
					<div id="search">
						<input
							type="text"
							placeholder="Trouvez un journal..."
							onChange={this.searchInput} />
						<Filters onClick={this.onRadioClick} state={this.state.filters}/>
						<i className="fa fa-search" aria-hidden="true"></i>
					</div>
						<div id="questions">
							{
								selectedQuestion ?
									<p id="backToQuestionList" onClick={() => this.setState({selectedQuestion: null})}>
										<i className="fa fa-undo" aria-hidden="true"></i>&nbsp;&nbsp;revenir à la liste des sujets
									</p>
								: <p>
										...ou explorez un sujet :
									</p>
							}
							<ul id="question-list">
								{questions.map(({name, question, filter, icon}) =>
									<li key={name}
											className={classNames({
												selected: question === selectedQuestion,
												oneSelected: selectedQuestion,
												unavailable: !filter,
											})}>
										<span className="iconWrapper">
											{filter ?
												<i className={"fa " + icon} aria-hidden="true"></i>
											: <span className="iconUnavailabe">À venir</span>
											}
										</span>
										<a
											href="#"
											onClick={() => this.setState({focusedAnswer: null, selectedQuestion: question})}>
											{question}
										</a>
									</li>
								)}
							</ul>
							{ selectedQuestion && (
								selectedQuestionFilter && (
									<section id="questionAnswers" data-question={selectedQuestionName}>
										<ul id="answerSummary">
											{ do {
												let questionAnswers = R.toPairs(selectedQuestionFilter()),
													sorted = R.sortBy(R.head)(questionAnswers)
												sorted.map(([text, items]) =>
													<li key={text}
															className={classNames('answerBlock')} >
														<div className="score">
															{items.length}
															{selectedQuestionBackgrounds && selectedQuestionBackgrounds[text[0]] &&
																<img src={require('../images/' + selectedQuestionBackgrounds[text[0]])} />}
														</div>
														<div className="text">{text.split(': ')[1]}</div>
														{
															this.state.wikiCacheReady &&
															<ul className="answerVignettes">
																{this.vignettes(items, 'small')}
															</ul> }
													</li>
												)
											}}
										</ul>
									</section>
								)
							)}
						</div>
						{!selectedQuestion && (
							this.state.wikiCacheReady ?
								<ul id="vignettes">
									{this.vignettes(null, 'big')}
								</ul>
							: <div style={{textAlign: 'center', margin: '10%'}}>Chargement des images en cours...</div>)
						}
				</div>
		)
	}

	searchInput = ({target: {value}})  =>
		this.setState({
			search: value.length < 3 ? null : normalise(value)
		})

	vignettes(questionItems, size) {
		let {search, filters} = this.state
		return R.pipe(
			R.filter(
				e => (
					search == null ||
					normalise(m.nodeName(e)).indexOf(search) > -1
				) && (
					R.isEmpty(filters) || !R.pipe(
						R.toPairs,
						R.find( ([k, v]) =>
							e.journal[k] !== v
						)
					)(filters)
				)
			),
			R.sortBy(R.compose(R.toLower, m.nodeNameFromId, R.prop('id'))),
			R.map(e =>
				<Vignette key={e.id} journal={e} size={size}/>
			)
		)(
			questionItems ?
				questionItems
			: m.entitiesByType('journal')
		)
	}
}
