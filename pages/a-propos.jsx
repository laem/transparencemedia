import React from "react"
import Link from "next/link"
import "./contribuer.module.css"

function AboutPage() {
  return (
    <article id="about">
      <h1>À propos</h1>
      <div className="text">
        <p>
          Ce site est construit par un groupe de citoyens motivés par une plus grande transparence des médias, qui
          devrait permettre à chacun de faire des choix mieux réfléchis.
        </p>
        <p>
          {
            "Évidemment il n'est pas sans reproche, ne serait-ce que par l'absence de beaucoup de médias. Mais en tout cas, il n'est financé par aucune organisation politique."
          }
        </p>
        <p>
          Tout le monde peut y{" "}
          <Link href="/contribuer">
            <a>contribuer</a>
          </Link>
          {
            ", par exemple en complétant la fiche d'un journal. Le site sera mis à jour en conséquence, et les discussions seront publiques."
          }
        </p>
        <h2>Inspirations</h2>
        <p>
          Une{" "}
          <a href="http://www.monde-diplomatique.fr/cartes/ppa" target="_blank" rel="noreferrer">
            carte
          </a>
          {
            " de la propriété des médias a été publiée pendant la construction de ce site par Acrimed et le Monde Diplomatique. Elle donne une très bonne vue d'ensemble, mais reste une image."
          }
        </p>
        <p>
          {
            "Un nombre de plus en plus grand d'articles de journaux, de livres et de films critiquent et tentent d'apporter des solutions à la crise des médias, merci à eux."
          }
        </p>

        <p>
          Voir les{" "}
          <Link href="/crédits">
            <a>crédits</a>
          </Link>{" "}
          des images et icônes utilisés sur ce site.
        </p>

        <p id="depuis1932">
          <i className="fa fa-quote-left" aria-hidden="true"></i>
          {
            "La philosophie de notre temps vit. Mais de quelle vie ? Quelles sont les fonctions de sa vie ? Il existe bien des sortes de vie sur la terre. Celle des vivants et celle de leurs parasites... Je demande si le philosophe de maintenant vit comme un homme vivant ou comme un ver. Il n'y a aucune raison d'écarter ce genre de questions. Il n'y a aucune raison de ne pas leur donner de réponse."
          }
          <i className="fa fa-quote-right" aria-hidden="true"></i>
        </p>
      </div>
    </article>
  )
}

export default AboutPage
