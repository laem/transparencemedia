// import personnesPhysiques from "../src/data/personnes-physiques.json" assert { type: "json" }
// import personnesMorales from "../src/data/personnes-morales.json" assert { type: "json" }
import { readYaml } from "./read-yaml.mjs"

// import personnes from "../src/data/personnes-physiques.yaml"

const personnesPhysiques = readYaml("./src/data/personnes-physiques.yaml")
const personnesMorales = readYaml("./src/data/personnes-morales.yaml")
const medias = readYaml("./src/data/medias.yaml")

console.log("personnesPhysiques", personnesPhysiques)
