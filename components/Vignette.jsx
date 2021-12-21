import React from "react"
import classnames from "classnames"
import Link from "next/link"

/* Les vignettes des journaux sur le kiosque */

export const journalImgSrc = (id) => {
  const cache = window?.wikiCache[id]
  const imgUrl = cache?.imgUrl

  return (
    imgUrl || (id.indexOf("w:") === 0 && console.log("Pas d'image wikipedia pour ", id)) // || require("../images/" + id.substring(2) + ".png")
  )
}

export default class Vignette extends React.Component {
  render() {
    let { journal, size } = this.props,
      { brouillon } = journal

    return (
      <li className={classnames("vignette", size, { brouillon })} key={journal.id}>
        <Link href={`/journal/${journal.id}`}>
          <a>
            <img src={journalImgSrc(journal.id)} />
          </a>
        </Link>
        {/* {size == 'small' &&
				<span>{journal.nom}</span>} */}
      </li>
    )
  }

  imageSrc(id) {
    let cache = window.wikiCache[id],
      imgUrl = cache && cache.imgUrl

    return (
      imgUrl || (id.indexOf("w:") === 0 && console.log("Pas d'image wikipedia pour ", id)) // || require("../images/" + id.substring(2) + ".png")
    )
  }
}
