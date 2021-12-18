import React, { Component } from 'react'
import debounce from 'debounce'
import './Home.css'
import {Link} from 'react-router'

export default class Home extends Component {
	render() {
		let backToHome = window.location.toString().indexOf('accueil') > 0,
			transitionEnd = backToHome ? ' end' : ''
		return (
				<div id="Home">
					<div ref="large-header" style={{background: `url(${require('../images/kiosque.jpg')}) no-repeat center center fixed`}} className={"large-header" + transitionEnd}>
						<div id="home-text">
							<h1 className="main-title">
								{"Qui détient nos médias ?"}
							</h1>
							<p>
								On dirait que le nombre de médias français détenus par des milliardaires ou liés à des multinationales est en hausse.
							</p>
							<p>
								Evidemment, le propriétaire a une influence sur son journal. Mais quelle est son ampleur, ses formes ? Et puis, est-ce un problème ? Est-ce au contraire souhaitable, ou simplement inévitable ? Chacun se fera son avis librement.
							</p>
							<p>
								<b>Pour nourrir cette réfléxion, ce site expose les données de la possession des médias français.</b>
							</p>
							<Link id="action" to="/kiosque">Explorer le kiosque</Link>
						</div>
					</div>
				</div>
		)
	}

	componentDidMount() {

		let largeHeader = this.refs['large-header']

		let resize = debounce(() => (largeHeader.style.height = window.innerHeight + 'px'), 200)
		resize(); window.addEventListener('resize', resize)


		/*  Focus temporal gradient effect on title. TO ACTIVATE, remove the end class in render() above */
		let focusOnTitle = () => (largeHeader.className = 'large-header end')

		setTimeout(() => {
			if (document.hasFocus()) focusOnTitle()
			else window.onfocus = focusOnTitle
		}, 2000)
	}

}
