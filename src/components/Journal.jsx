import React from "react"
import Link from "next/link"
import R from "ramda"
import { withRouter } from "next/router"

import m from "../domain/model"
import Synthese from "./Synthese"
import Galaxie from "./Galaxie"
import { cacheWikiPages } from "../utils/wikipedia"
import { journalImgSrc } from "./Vignette"

class Journal extends React.Component {
  state = {
    wikiCacheReady: false,
  }

  componentDidMount() {
    const { id } = this.props
    this.journal = m.nodeFromId(id)
    if (!this.journal) {
      this.props.router?.push("/kiosque")
      return null
    }

    cacheWikiPages([this.journal]).then(() => this.setState({ wikiCacheReady: true }))
  }

  render() {
    const journal = this.journal
    const id = journal?.id

    if (!this.state.wikiCacheReady) return null

    const enrichedJournal = m.findJournal(id)
    const {
      derived: { nodes: _nodes, interests, finalHolders },
    } = enrichedJournal

    const nodes = [...R.values(_nodes), ...interests.filter((c) => c.type == "company").map((c) => c.more)]
    const mode = window.location.toString().indexOf("/journal/") > -1 ? "normal" : "galaxy"

    return (
      <div id="journal">
        <img id="title" src={journalImgSrc(id)} />
        {mode === "normal" ? (
          <Synthese {...{ journal, interests, finalHolders, nodes }} />
        ) : (
          <Galaxie {...{ journal, nodes }} />
        )}
        {mode !== "normal" && (
          <div id="toSynthese">
            <Link href={"/journal/" + journal.id}>Revenir à la fiche du journal</Link>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Journal)
