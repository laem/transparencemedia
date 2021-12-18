import m from '../model'
import R from 'ramda'
import React from 'react'

/* Le code qui liste et résoud les sujets du kiosque.

TODO Plein d'autres sujets sont pertinents.

- Certains demandent d'enrichir les entités (par exemple en ajoutant la forme juridique de chaque journal)
- Certains n'attendent qu'à être implémentés : par exemple, faire le top 10 des propriétaires de journaux.
*/
let reduceByAppending = R.reduceBy(R.flip(R.append()), [])

let questions = [
	{
		name: 'fortune',
		icon: 'fa-money',
		question: <span>Quels médias sont contrôlés par des <b>grandes fortunes</b> ?</span>,
		filter: () =>
			reduceByAppending(
				({id, actionnariat}) => {
					if (actionnariat && R.is(String)(actionnariat.inconnu))
						return '4: Actionnariat inconnu'
					let {interests} = m.getInterestingStuff(id),
						fortunes = interests.filter(i => i.type == 'fortune'),
						score = fortunes.reduce((memo, {relativeShare}) => memo + relativeShare, 0)
					return 	score > 30 	? '1: Fortement' :
									score > 0 	? '2: Un peu' :
									'3: Pas du tout'
				}
			)(m.entitiesByType('journal'))
	},
	{
		name: 'revenus',
		icon: 'fa-shopping-cart',
		question: <span>Quels médias <b>dépendent de la publicité</b> ou de leurs abonnés ?</span>,
		filter: () =>
			reduceByAppending(
				({journal: {revenus}}) => {
					let r = R.is(String)(revenus) ? [revenus] : revenus
					return R.equals(['abonnements', 'publicité'], r.sort()) ?
						'2: publicité et abonnements'
					:	R.equals(['publicité'], r) ?
						'1: publicité uniquement'
					: R.equals(['abonnements'], r) ?
						'3: pas de publicité, abonnements'
					: '4: autres'
				}
			)(m.entitiesByType('journal')),
		backgrounds: {
			1: 'pub.png',
			2: 'pub-abonnement.png',
			3: 'pas-de-pub.png'
		}
	},
  {question: 'Quels médias ont des liens avec des grandes entreprises ?'},
  {question: "Quels sont les formes d'entreprise les plus courantes ?"},
  {question: 'Quels médias utilisent le financement participatif ?'},
  {question: 'Qui sont les actionnaires les plus présents ?'},
  {question: 'Quels médias sont liés à des secteurs industriels ?'},
  {question: "Quel nombre d'actionnaires par média ?"},
]

export default questions
