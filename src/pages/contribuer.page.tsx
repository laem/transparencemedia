import React from "react"
import "./contribuer.module.css"

function ContributePage() {
  return (
    <article id="contribute">
      <h1>Contribuer</h1>
      <div className="text">
        <h2>
          A. Vous êtes familiers avec la plateforme Github <i className="fa fa-github" aria-hidden="true" />
        </h2>
        <p>
          Rendez-vous sur le{" "}
          <a href="https://github.com/transparencemedia/site" target="_blank" rel="noreferrer">
            dépôt
          </a>{" "}
          du projet.
        </p>
        <p>
          Sans toucher au code, vous pouvez y{" "}
          <a
            href="https://github.com/transparencemedia/site/blob/master/ajouter-un-media.md"
            target="_blank"
            rel="noreferrer"
          >
            ajouter ou corriger un média
          </a>{" "}
          {"en éditant les données (c'est du YAML), ou "}
          <a href="https://github.com/transparencemedia/site/issues/new" target="_blank" rel="noreferrer">
            créer une <em>issue</em>
          </a>
          .
        </p>
        <p>Vous pouvez bien sûr améliorer le site en touchant au code.</p>

        <h2>
          {"B. C'est quoi ce truc, Github"} <i className="fa fa-question-circle" aria-hidden="true" />
        </h2>
        <p>
          {
            "C'est un site Web qui expose les bases de code source de plusieurs millions de projets libres, et qui permet aux développeurs de collaborer, de discuter, de se suivre, etc."
          }
        </p>
        <p>
          <b>La première bonne nouvelle</b>,{" "}
          {"c'est que les données des médias, qui font tourner ce site, sont compréhensibles par tous."}
          <a
            href="https://github.com/transparencemedia/site/blob/master/data/entités.yaml"
            target="_blank"
            rel="noreferrer"
          >
            {" Jetez-y un coup d'oeil !"}
          </a>
          .
        </p>
        <p>
          <b>La deuxième bonne nouvelle</b>
          {", c'est que vous pouvez tout simplement "}
          <a href="https://github.com/transparencemedia/site/issues/new" target="_blank" rel="noreferrer">
            faire une remarque
          </a>
          {", que l'on nomme "}
          <em>issue</em>
          {
            " sur la plateforme. Il faudra au préalable simplement vous créer un compte (malheureusement, les menus sont en anglais)."
          }
        </p>
        <p style={{ textAlign: "center", marginTop: "2em" }}>
          <b>
            Si tout ça vous semble trop casse-tête,
            <br />
            écrivez simplement à <i className="fa fa-envelope" aria-hidden="true" />{" "}
            <span style={{ fontWeight: "900" }}>contact@transparence.media</span>
          </b>{" "}
          .
        </p>
        {/* <h3>- cas 1. vous connaissez la plateforme <em>github</em></h3>
					<p>
						Le code source sera bientôt ouvert, et toute modification mettra le site transparencemedia.fr à jour automatiquement.
					</p>
					<h3>- cas 2</h3>
					<p>
						Envoyez un mail à transpamedia@protonmail.ch. On vous répondra, en essayant de vous faire contribuer.
					</p> */}
      </div>
    </article>
  )
}

export default ContributePage
