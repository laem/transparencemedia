import './Aires.css'
import React from 'react'
let d3 = require('d3')
import WikiLink from '../components/WikiLink'
import classnames from 'classnames'
import {Link} from 'react-router'
import model from '../model'
import ProvideWidth from './ProvideWidth'

/*
 C'est un type de visualisation qui affiche des entités dans un rectangle, chacune ayant une aire proportionnelle à un pourcentage, et disposées de façon ordonnée du haut-gauche au bas-droit.

 On affichera si possible un nom + une image ventant de Wikipedia + le pourcentage.
 Les images absentes seront remplacées par un gros texte, dont la taille et l'orientation seront adaptées à l'aire disponible.

 Les trop petites entités seront regroupées dans un rectangle gris.

*/
let
	px = s => s + 'px',
	formatNumber = d3.format(",d")

@ProvideWidth
export default class Treemap extends React.Component {
	render(){
		let
			{finalHolders, width: unresponsiveWidth, journal} = this.props,
			width = unresponsiveWidth > 768 ? unresponsiveWidth/2 : (9 * unresponsiveWidth)/10,
			height = width * (500 / 960),
			style = {
				width: px(width),
				height: px(height)
			},
			hierarchy = d3.hierarchy({children: finalHolders})
				.sum(d => d.value)
				.sort((a, b) => b.value - a.value),
			treemap = d3.treemap()
				.size([width, height])
				.padding(2)
				.round(true)
		treemap(hierarchy)

		return (
			<div className="aires" style={style}>
				{	hierarchy.leaves().map(l =>
						<Cell journal={journal} key={l.data.name} {...l} />
					)
				}
			</div>
		)
	}
}

class Cell extends React.Component {
	render(){
		let {x0, y0, x1, y1, data, journal} = this.props,
			{id, name, value} = data,
			[type] = model.nodeType(data),
			cache = window.wikiCache[id],
			imgUrl = cache && cache.imgUrl,
			interestingImage =
				imgUrl &&
				!['defaut', 'dialog-info', 'flag'].find(s => imgUrl.toLowerCase().indexOf(s) > -1),
			w = x1-x0,
			h = y1- y0,

			needsVerticalText = h / w > 3,
			noRoomForImage = value < 5 || needsVerticalText || w / h > 3,
			isADetail = value < 2,
			cellStyle = {
				left: px(x0),
				top: px(y0),
				width: px(w),
				height: px(h)
			},
			// textImageSize = Math.min((Math.min(w,h) / 7), 40) + 'px',
			replaceImageByText = !interestingImage || noRoomForImage

		if (isADetail) return (
			<Link to={"/galaxie/" + journal.id}>
				<div className="node node-details" style={cellStyle}></div>
			</Link>
		)

		return (

			<div className="node" style={cellStyle}>
				{replaceImageByText &&
					<TextImage name={name} id={id} needsVerticalText={needsVerticalText}/>
				}

				{!replaceImageByText &&
					<img className="nodeImage" src={imgUrl} width="100%"></img>
				}

				{!replaceImageByText &&
					<span className="name label">
						{id.indexOf('w:')>-1 &&
							<WikiLink name={name} wikiId={id} lang="fr"/>
						}
						{type == 'journal' &&
							<Link to={"/journal/" + id}>
								<i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
							</Link>}
					</span>
				}


				<span className="value label">{formatNumber(value)} &nbsp;%</span>

			</div>
		)
	}
}

// Component that recursively finds the best text size to fit the div
class TextImage extends React.Component {
	state = {
		textSize: 200 // in %
	}
	elementSize = el => [el.offsetWidth, el.offsetHeight]
	adjustTextSize() {
		let
			[x1,y1] = this.elementSize(this.div),
			[x2,y2] = this.elementSize(this.span)
			;(x1 < x2 || y1 < y2) &&
				this.setState({textSize: this.state.textSize - 10})
	}
	componentDidUpdate = this.adjustTextSize
	componentDidMount = this.adjustTextSize
	render(){
		let {needsVerticalText, id, name} = this.props
		return (<div
			ref={div => this.div = div}
			className={classnames("text-image", {needsVerticalText})}
			style={{fontSize: this.state.textSize + '%'}}  >
			<span ref={span => this.span = span}>
				{id.indexOf('w:')>-1 ?
				<WikiLink name={name} wikiId={id} lang="fr"/>
			: <span  className="aire-text">{name}</span>
			}</span>
		</div>)
	}
}
