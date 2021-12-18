import React from 'react'
import { Link, Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Kiosque from './components/Kiosque'
import Journal from './components/Journal'
import Home from './components/Home'
import Contribute from './components/Contribute'
import About from './components/About'
import Credits from './components/Credits'
import boussole from './images/boussole.png'
import Univers from './components/Univers'


let Page404 = () =>
<div style={{margin: '20% auto', width: '15em'}}>
  <h2>
    Il n'y a rien ici.
  </h2>
  <Link to="/"><img width="190px" src={boussole} /></Link>
</div>

export default (
  <Route path="/" component={App}>
    {/* Le Kiosque, où prendre un journal et comprendre qui le détient */}
    <Route path="kiosque" component={Kiosque} />

    {/* Une vue synthétique de l'actionnariat du journal et de ses liens */}
    <Route path="journal/:id" component={Journal}/>

    {/* Une vue complète sous forme de graphe des actionnaires du journal */}
    <Route path="galaxie/:id" component={Journal}/>

    {/* Une page expérimentale où devrait voir l'ensemble des médias français */}
    <Route path="univers" component={Univers}/>

    {/* Comment contribuer à ce site ? */}
    <Route path="contribuer" component={Contribute}/>

    {/* Certaines images Creative Commons sont utilisées sur ce site, leurs auteurs sont listés ici */}
    <Route path="crédits" component={Credits}/>

    {/* La page d'accueil quoi ! */}
    <Route path="accueil" component={Home}/>

    {/* Qu'est-ce que ce site ? Qui l'a fait ? Ses inspirations ? */}
    <Route path="a-propos" component={About}/>

    <IndexRoute component={Home} />
    <Route path="*" component={Page404}/>

  </Route>
)
