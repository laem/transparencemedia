import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import routes from './routes'
import { Router } from 'react-router'

/*
  Le point d'entrée pour Webpack dans l'application JS
*/

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
)
