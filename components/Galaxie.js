import React from 'react'
import './Galaxie.css'
import m from '../model'
import vis from 'vis'
import {cacheWikiPages} from '../utils/wikipedia'
import R from 'ramda'
import ProvideWidth from './ProvideWidth'

/* Visualisation en graphe utilisée pour afficher tous les actionnaires d'un journal.
Fait appelle à la librairie Vis.js
TODO cette visualisation peut beaucoup gagner en lisibilité en reglant les options disponibles dans la librairie utilisée...
*/


// Alternative possible : http://js.cytoscape.org/demos/aedff159b0df05ccfaa5/
@ProvideWidth
export default class Galaxie extends React.Component {
	render() {
		return (
			<div id="galaxie">
				<div style={{marginLeft: this.props.width * (1/6), width: this.props.width * (2/3), height: this.props.height * (2 / 3)}}
					ref={network => { this.network = network }} >
				</div>
			</div>
		)
	}

	componentDidMount() {
		let
			{journal} = this.props,
			// Galaxie d'un journal, ou univers complet
			items = journal ? [journal] : m.entitiesByType('journal'),
			{nodes, links} =
					items
						.map( j => m.getInterestingStuff(j.id, 100) )
						.reduce( ({nodes, links}, {nodes: n, links: l}) =>
							({nodes: {...nodes, ...n}, links: [...links, ...l]}),
							{nodes: {}, links: []}
						)

		cacheWikiPages(R.values(nodes)).then( () => {
			let data = {
					nodes: R.values(nodes).map(node => ({ ...node,
						label: m.nodeName(node),
						font: {
							size: 26,
							background: 'white'
						},
						borderWidth: 3,
						color: {
							color: 'black',
							border: '#222',
							background: '#42C299',
							//alaternative:
							// strokeWidth: 3,
							// strokeColor: 'white'
						},
						// nodes with images
						... (R.path([node.id, 'imgUrl'], window.wikiCache) ? {
							shape: 'circularImage',
							image: 'https://i.scaley.io/150/' + window.wikiCache[node.id].imgUrl.replace(/^https?:\/\//g, ''),
							size: 40,
						// nodes without images
						} : {shape: 'dot', size: 15}),
						// the inspected node : central
						... (journal && journal.id === node.id ? {
							fixed: true,
							size: 40,
							shape: 'circularImage',
							image: require('../images/icône-journal.svg'),
						} : {})
					})),
					edges: R.uniq(links).map(
						({source, target, value}) => ({
							from: source, to: target,
							arrows: 'to',
							label: Math.round(+value) + '%',
							font: {
								background: 'white',
								size: 26,
								strokeWidth: 1,
								strokeColor: '#444'
							},
							width: 3,
							color: {
								color: '#444',
								// opacity: (+value / 100) + .15
							}
							// Make the edge bigger if high value
							// value: +value / 100,
							// scaling: {
							// 	min: 0, max: 10,
							// 	label: {enabled: false}
							// }
						}))
				},
				options = {
					// configure: {
					// 	filter: function (option, path) {
					// 	  return path.indexOf('physics') !== -1;
					// 	}
					// },
					layout:{randomSeed:2},
					physics: {
						barnesHut: {
							gravitationalConstant: -8150
						}
					}
					// improvedLayout: true
				}
			new vis.Network(this.network, data, options)
		})
	}
}
