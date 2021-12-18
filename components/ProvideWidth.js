import React from 'react'

/* Un simple décorateur de composants React donnant les dimensions de la fenêtre du navigateur */
export default Decorated =>
	class AutoResize extends React.Component {

		getDimensions = () => ({
			width: window.innerWidth,
			height: window.innerHeight
		})
		state = this.getDimensions()
		componentDidMount() {
			window.addEventListener('resize', () => this.setState(this.getDimensions()))
		}
		render(){
			return <Decorated {...this.props} width={this.state.width} height={this.state.height}/>
		}
	}
