import React from 'react'
import Galaxie from './Galaxie'

/* Vue en graphe de _tous_ les journaux et leurs actionnaires.

TODO ce n'est qu'un brouillon aujourd'hui qui ne marche probablement plus.
Il faudra passer un peu de temps à trouver les bons réglages pour rendre le tout lisible.
Ce serat aussi assez coûteux en requête : une requête pour trouver l'image Wikipedia de chaque entité... mieux vaudrait cacher tout ça sur un serveur...
*/
let dimensions = {
	width: window.innerWidth,
	height: window.innerHeight
}

export default () =>
	<div>
		<h1>L'univers</h1>
		<Galaxie {...dimensions} />
	</div>
