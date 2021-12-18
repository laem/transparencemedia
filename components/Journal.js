import React from 'react'
import {withRouter, Link} from 'react-router'
import './Journal.css'
import m from '../model'
import Synthese from './Synthese'
import Galaxie from './Galaxie'
import R from 'ramda'
import {cacheWikiPages} from '../utils/wikipedia'
import {journalImgSrc} from '../components/Vignette'

@withRouter
export default class Journal extends React.Component {
	state = {
		wikiCacheReady: false
	}
	componentWillMount() {
		let { params: {id} } = this.props
		this.journal = m.nodeFromId(id)
		cacheWikiPages([this.journal]).then( () =>
			this.setState({wikiCacheReady: true})
		)
	}
	render(){
		let
			journal = this.journal,
			id = journal.id

		if (!journal) {
			this.props.router.push('/kiosque')
			return null
		}

		if (!this.state.wikiCacheReady) return null

		let
			enrichedJournal = m.findJournal(id),
			{derived: {nodes: _nodes, interests, finalHolders}} = enrichedJournal,
			nodes = [...R.values(_nodes), ... interests.filter(c => c.type == 'company').map(c => c.more)],
			mode = window.location.toString().indexOf('/journal/') > -1 ? 'normal' : 'galaxy'

		return (
			<div id="journal">
				<img id="title" src={journalImgSrc(id)} />
				{ mode === 'normal' ?
					<Synthese
						{...{journal, interests, finalHolders, nodes}} />
					:
					<Galaxie
						{...{journal, nodes}}/>
				}
				{mode !== 'normal' &&
					<div id="toSynthese">
							<Link to={"/journal/" + journal.id}>
									Revenir à la fiche du journal
							</Link>
					</div>
				}
			</div>
		)
	}
}
