import fetchJsonp from "fetch-jsonp"
import { stringify } from "querystring"

/* Au sujet des images des infobox Wikipedia
--------------------

Ce serait très cool si toutes les images étaient récupérées avec l'API Wikipedia. Sauf qu'aujourd'hui, l'API 'pageimages' ne renvoie pas les pageimages "non-free"... à voir si ça évolue...

On a donc un petit script maison bricolé qui récupère l'img URL.

Les images et textes d'article sont stockés dans un cache global, 'wikiCache', à la page pour éviter de les retélécharger.

*/

export const infoboxImageUrl = (wId) =>
  Promise.all([
    // Looks like we must use two wikipedia APIs to get both the page HTML and the extract
    new Promise((resolve) =>
      // 1. Just get the page HTML content throught the API
      fetchJsonp("https://fr.wikipedia.org/w/api.php?action=parse&format=json&prop=text&redirects=true&page=" + wId)
        .then((res) => res.json())
        .then(({ parse: { text } }) => {
          const html = text["*"],
            // 2. Then find the first image after the infobox keyword
            [, afterInfoboxKeyword] = html.split('class="infobox'),
            [beforeInfoboxTable] = afterInfoboxKeyword.split("<table"),
            [, url] = /src="\/\/(([A-Za-z\u00C0-\u017F]|[0-9]|%|\/|\.|_|-)+)"/g.exec(beforeInfoboxTable),
            // Go back if needed to the original image (not thumb)
            originalImageUrl =
              "https://" +
              (url.indexOf("thumb") > -1 ? url.replace("/thumb", "").split("/").slice(0, -1).join("/") : url)
          resolve({ imgUrl: originalImageUrl })
        })
        .catch((err) => {
          console.error("err", err)
          resolve({})
        }),
    ),
    new Promise((resolve) =>
      fetchJsonp(
        "https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&rawcontinue=&redirects=true&titles=" +
          wId,
      )
        .then((res) => res.json())
        .then(({ query: { pages } }) => {
          const { extract } = pages[Object.keys(pages)[0]]
          resolve({ content: extract })
        })
        .catch((err) => {
          console.error("err", err)
          resolve({})
        }),
    ),
  ]).then(([imgP, contentP]: [Record<string, string>, Record<string, string>]) => ({ ...imgP, ...contentP }))

export const cacheWikiPages = (nodes) => {
  // @ts-ignore: TODO refactor with localStorage maybe ?
  window.wikiCache = {}

  return Promise.all(
    nodes
      // @ts-ignore
      .filter(({ id }) => window.wikiCache[id] === undefined && id.indexOf("w:") >= 0)
      // @ts-ignore
      .map(({ id }) => infoboxImageUrl(id.replace("w:", "")).then((res) => (window.wikiCache[id] = res))),
  )
}
