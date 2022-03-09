import React from "react"

/* Les boutons de filtre du kiosque : quotidien, national etc. */

function Radio(state, onClick) {
  return function InnerRadio({ name, label, value }) {
    const osef = Math.random()
    return (
      <div>
        <input type="radio" onClick={onClick} checked={state[name] === value} id={osef} name={name} value={value} />
        <label htmlFor={osef}>{label}</label>
      </div>
    )
  }
}

export default function Filters({ state, onClick }) {
  const AwareRadio = Radio(state, onClick)
  return (
    <ul id="tag-list">
      <li>
        <AwareRadio name="périodicité" label="mensuel" value="mensuelle" />
        <AwareRadio name="périodicité" label="hebdomadaire" value="hebdomadaire" />
        <AwareRadio name="périodicité" label="quotidien" value="quotidienne" />
      </li>
      <li>
        <AwareRadio name="couverture" label="national" value="nationale" />
        <AwareRadio name="couverture" label="local" value="locale" />
      </li>
      <li>
        <AwareRadio name="papier" label="papier et en ligne" value="oui" />
        <AwareRadio name="papier" label="en ligne seulement" value="non" />
      </li>
    </ul>
  )
}
