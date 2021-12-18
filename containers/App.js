import React, { Component } from 'react'
import {Link} from 'react-router'
import './App.css'

export default class App extends Component {
	state = {
		music: false
	}
	render(){
		return (<div>
			<div id="pleaseRotate">
				<h2>
					Tournez votre écran en mode paysage pour voir ce site
				</h2>
				<i className="fa fa-picture-o" aria-hidden="true"></i>
			</div>
			<div className='main'>
				<div id="bandeau">
					Ce site est en version beta : soyez indulgent et <Link to="/contribuer">faites vos retours</Link> ! Le code et les données <a href="https://github.com/transparencemedia/site" target="_blank">sont ouverts.</a>
				</div>
				<ul id="menu">
					{/* <Link id="home" to="accueil">☖</Link> */}
					<li>
						<Link to="/accueil">
							<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/671857-200.png"/>
							<span>Accueil</span>
						</Link>
					</li>
					<li>
						<Link to="/kiosque">
							<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/866183-200.png"/>
							<span>Kiosque</span>
						</Link>
					</li>
					<li>
						<Link to="/a-propos">
							<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/817968-200.png"/>
							<span>À&nbsp;propos</span>
						</Link>
					</li>
				</ul>
				{this.props.children}
				<button id="music" onClick={() => this.setState({music: !this.state.music})}>
					<i className="fa fa-volume-up" aria-hidden="true"></i>&nbsp;
					{this.state.music ? 'Couper la musique' : 'Visiter en musique'}
				</button>
				{this.state.music && <div style={{display: 'none'}}>
					<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QC6Zw_w_1TE?&autoplay=1" frameBorder="0" ></iframe>
				</div>
				}
			</div>
		</div>)
	}
}
