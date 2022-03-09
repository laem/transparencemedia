import React, { Component } from "react"
import { cacheWikiPages } from "../utils/wikipedia"
// require("./WikiLink.css")

/* Un composant qui rend un bout de texte référencé sur Wikipedia cliquable pour ouvrir une fiche résumée de la page Wikipedia.
Permet de se renseigner, par exemple, sur une entreprise sans quitter le site.
*/
export default class WikiLink extends Component {
  state = {
    hidden: true,
    content: "Veuillez patienter s'il vous plaît...",
  }

  render() {
    const { content, imgUrl, more, hidden } = this.state
    const { name } = this.props
    return (
      <span>
        <button className="wiki-link-name" onClick={() => this.setState({ hidden: false })}>
          {name}
        </button>
        {!hidden && (
          <div className="wiki-link">
            <div className="wiki-link-box">
              <button onClick={() => this.setState({ hidden: true })}>✕</button>
              {imgUrl && <img src={imgUrl} className="tipImage" />}
              <div className="tipContent" dangerouslySetInnerHTML={{ __html: content }}></div>
              {more && (
                <a href={more} className="tipMore" target="_blank" rel="noreferrer">
                  {"Lire l'article Wikipedia"}
                </a>
              )}
            </div>
          </div>
        )}
      </span>
    )
  }

  handleKeyDown({ key }) {
    if (key === "Escape") this.setState({ hidden: true })
  }

  componentDidMount() {
    const { wikiId, lang } = this.props
    if (wikiId == undefined || lang == undefined) {
      throw "Il y a un bug"
    }
    cacheWikiPages([{ id: wikiId }]).then(() =>
      this.setState({
        ...window.wikiCache[wikiId],
        more: `https://${lang}.wikipedia.org/wiki/${wikiId.replace("w:", "")}`,
      }),
    )

    this.boundHandleKeyDown = this.handleKeyDown.bind(this)
    window.addEventListener("keydown", this.boundHandleKeyDown)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.boundHandleKeyDown)
  }
}
