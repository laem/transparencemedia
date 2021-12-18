import React from 'react'
import './Vignette.css'
import { Link } from 'react-router'
import classnames from 'classnames'

/* Les vignettes des journaux sur le kioque */

export let journalImgSrc = id => {
	let cache = window.wikiCache[id],
		imgUrl = cache && cache.imgUrl

	return imgUrl || id.indexOf('w:') === 0 &&
		console.log("Pas d'image wikipedia pour ", id) || require('../images/' + id.substring(2) + '.png') //eslint-disable-line no-console
}

export default class Vignette extends React.Component {
	render(){
		let
			{journal, size} = this.props,
			{brouillon} = journal

		return (
			<li className={classnames('vignette', size, {brouillon})} key={journal.id}>
				<Link to={`/journal/${journal.id}`}>
					<img src={journalImgSrc(journal.id)} />
				</Link>
				{/* {size == 'small' &&
				<span>{journal.nom}</span>} */}
			</li>
		)
	}

	imageSrc(id){
		let cache = window.wikiCache[id],
			imgUrl = cache && cache.imgUrl

		return imgUrl || id.indexOf('w:') === 0 &&
			console.log("Pas d'image wikipedia pour ", id) || require('../images/' + id.substring(2) + '.png') //eslint-disable-line no-console
	}
}
