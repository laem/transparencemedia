import * as React from "react"

import personnes from "../data/personnes-physiques.yaml"

export default function TestPage() {
  return <div>{JSON.stringify(personnes, null, 2)}</div>
}
