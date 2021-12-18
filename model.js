/********************
		C'est ici que les données des médias sont analysées.
 ********************/

import nodes from './data/entités.yaml'
import types from './data/types.yaml'
import R from 'ramda'

/***********************
		Model methods
 ***********************/

let nodeFromId = id => nodes.find(node => node.id == id)


let nodeName = ({nom, id}) => nom ||
	// Remove possible wikipedia prefix
	id.replace('w:', '')
	//turn _ to spaces
	.replace(/_/g, ' ')


let nodeNameFromId = R.pipe(
	nodeFromId,
	nodeName
)


let nodeHasType = type => node =>
	node.type && node.type == type ||
	node[type]

// Types can be defined as strings (shortcut) or objects
let nodeType = node => {
	let typeName = types.find(t => node[t] || node.type === t)
	return [typeName, node[typeName] || {}]
}

let entitiesByType = type =>
	types.includes(type) ?
		nodes.filter(nodeHasType(type))
	: do {throw "Oups ! Ce type n'existe pas"}


let getInterestingStuff = initialNodeId => {
	/* Nous voulons extraire

	1) une liste plate des actionnaires physiques finaux,
		et leur part respective dans l'entité initiale. Ils peuvent être :
		- une personne
		- un groupe de personnes (eg. actionnaires internes)
		- une société dont nous ne connaissons pas les actionnaires
	2) une liste des intérêts des médias
		- une société connue qui détient un certain pourcentage de l'entité initiale
			(e.g. SFR détient Libération mais n'est pas un actionnaire final)
		- une société remarquable est liée à l'un des items de la première liste
			(e.g. Free est liée à Xavier Niel bien que non impliquée dans Le Monde)
		- la grande fortune d'un actionnaire
		- etc...
	3) un graphe du monde de l'entité (nodes & links)

	*/
	let results = {finalHolders: [], interests: [], nodes: {}, links: []}

	getParentsRecursive(initialNodeId, {id: initialNodeId}, 100, results)
	return results
}

/* Recursive function */
function getParentsRecursive(initialNodeId, partialNode, nodeShare, results) {

	let node = nodeFromId(partialNode.id)

	if (node == null)
		node = partialNode

	let
		name = nodeName(node),
		[typeName, type] = nodeType(node)

	results.nodes[node.id] = node

	if (node.liens) node.liens.map(lien => {
		results.interests.push({
			type: 'company',
			name: nodeNameFromId(lien.id),
			relation: 'intérêts croisés',
			more: lien
		})
		let company = nodeFromId(lien.id),
			[,companyType] = nodeType(company)
		companyType.secteurs && companyType.secteurs.map(sector =>
			results.interests.push({
				type: 'sector',
				sector
			})
		)
	})

	/* Un individu ne peut être détenu (en 2017 au moins) : c'est un finalShareholder */
	if (typeName == 'individu') {
		results.finalHolders.push({
			...node,
			id: node.id,
			name,
			value: nodeShare
		})
		type.fortune && results.interests.push({
			type: 'fortune',
			fortune: type.fortune,
			relativeShare: nodeShare,
			name
		})
		return
	}

	// une société connue qui détient un certain pourcentage de l'entité initiale
	if (typeName == 'société'){
		type.secteurs && type.secteurs.map(sector =>
			results.interests.push({
				type: 'sector',
				sector
			})
		)

		if (R.path(['société', 'connue'])(node) == 'oui')
			results.interests.push({
				type: 'company',
				name,
				relation: 'détenu',
				value: nodeShare,
				more: node
			})
	}


	/* si un journal est détenu en partie par un autre journal (qui a donc une page sur ce site),
		mieux vaut afficher son image avec un lien vers sa page
	*/
	if (typeName == 'journal' && initialNodeId != node.id && nodeShare !== 100) {
		results.finalHolders.push({
			...node,
			name,
			value: nodeShare
		})
		let parent = getInterestingStuff(node.id)
		// Puis l'on ajoute quand même les intérêts,
		// les noeuds et les liens pour visualiser le graphe complet
		results.interests = [...results.interests, ...parent.interests]

		results.links = [
			...results.links,
			...parent.links
				.filter(l => !results.links.find(ll => ll.source == l.source && ll.target == l.target))
				.map(l => ({...l, value: l.value * (nodeShare / 100)}))
		]

		results.nodes = {...results.nodes, ...parent.nodes}

		return
	}

	// passons maintenant aux actionnaires
	let actionnariat = node.actionnariat

	if (actionnariat == null) {
		// on doit s'arrêter là : c'est une société dont nous ne connaissons pas les actionnaires physiques : c'est un secret, ou c'est un nombre trop important d'individus
		results.finalHolders.push({
			...node,
			name,
			value: nodeShare
		})
		return
	}


	// actionnariat peut contenir une phrase d'indication si les actionnaires sont inconnus
	let actionnaires =
		R.is(Array)(actionnariat)
		? actionnariat
		: R.is(Object)(actionnariat) && actionnariat.actionnaires

	if (actionnaires) {
		/* Find shareholders with known ownership percentage,
			compute the formula if any,
			deduce the remainder */
		let
			actionnariatNum = actionnaires.map(actionnaire =>
				Object.assign(actionnaire, {part: evaluatePart(actionnaire.part)})
			),
			known = actionnariatNum.filter(actionnaire => typeof actionnaire.part === 'number'),
			remainder = 100 - known.reduce((result, value) => result + value.part, 0),
			respectiveShareOfOthers = remainder / (actionnaires.length - known.length)

		actionnariatNum.map( actionnaire => {
			let share = actionnaire.part || respectiveShareOfOthers
			let absoluteShare = (nodeShare / 100) * share
			results.nodes[actionnaire.id] = actionnaire
			results.links.push({
				source: actionnaire.id,
				target: node.id,
				value: share
			})
			/* here we go again */
			getParentsRecursive(initialNodeId, actionnaire, absoluteShare, results)
		})
	}
}

var evaluatePart = p =>
	typeof p == 'number' ?
		p : eval(p)

// Pre-compute as this could be a little heavy for the browser if done multiple times
let journaux =
	entitiesByType('journal')
		.map(n => ({
			...n,
			derived: getInterestingStuff(n.id)
		}))

let family = ({id: originalId, derived: {finalHolders: set1}}) => R.pipe(
	R.reject(R.propEq('id', originalId)),
	R.reduce((memo, {id: jId, derived: {finalHolders: set2}}) => {
		let score = set1.reduce( (sum, {id}) => {
			let tonton = set2.find(R.propEq('id', id))
			return sum + (tonton ? tonton.value : 0)
		}, 0) + do {
			let directLink = set2.find(R.propEq('id', originalId))
			directLink ? directLink.value : 0
		}
		return [...memo, [jId, score]]
	}, []),
	R.reject(R.pipe(R.last, R.equals(0)))
)(journaux)


/* OUR MODEL
	has data and handy functions
*/
let m = {
	nodeFromId,
	nodeNameFromId,
	nodeName,
	nodeHasType,
	nodeType,
	entitiesByType,
	journaux,
	findJournal: id => journaux.find(R.propEq('id', id)),
	family,
	getInterestingStuff
}

export default m
