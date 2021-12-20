import React from "react"
import Head from "next/head"
import Link from "next/link"

export default function Home() {
  const [transitionEnd, setTransitionEnd] = React.useState("")

  React.useEffect(() => {
    setTimeout(() => {
      setTransitionEnd("end")
    }, 2000)
  }, [])

  return (
    <>
      <Head>
        <title>Transparence média</title>
        <meta name="description" content="Qui détient nos médias ?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="Home">
        <div
          style={{ background: `url("/images/kiosque.jpg") no-repeat center center fixed`, minHeight: "100vh" }}
          className={`large-header ${transitionEnd}`}
        >
          <div id="home-text">
            <h1 className="main-title">{"Qui détient nos médias ?"}</h1>
            <p>
              On dirait que le nombre de médias français détenus par des milliardaires ou liés à des multinationales est
              en hausse.
            </p>
            <p>
              Evidemment, le propriétaire a une influence sur son journal. Mais quelle est son ampleur, ses formes ? Et
              puis, est-ce un problème ? Est-ce au contraire souhaitable, ou simplement inévitable ? Chacun se fera son
              avis librement.
            </p>
            <p>
              <b>Pour nourrir cette réfléxion, ce site expose les données de la possession des médias français.</b>
            </p>
            <Link href="/kiosque">
              <a id="action">Explorer le kiosque</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
