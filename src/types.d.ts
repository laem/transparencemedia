export interface Entité {
  id: WikipediaId | undefined
  nom?: string
  "nom complet"?: string
  web?: string
  depuis?: number
  journal?: Journal
  actionnariat?: Actionnariat
  type?: "individu" | "société" | "holding" | "organisation religieuse" | "association 1901" | "actionnaires externes"
  société?: Société
  liens?: Lien[]
  individu?: Individu
  journalistes?: string[]
  internes?: "oui" | "non" // ???
  fondateurs?: "oui" | "non" // ???
  commentaire?: string
  "chaîne TV"?: ChaîneTV
  divisions?: string
}

export type WikipediaId = `w:${string}`

export type Actionnariat = {
  commentaire?: string
  sources?: Array<string | { source?: string; commentaire?: string }>
  estInconnu?: "oui" | "non"
  composition?: Array<Actionnaire>
}

export interface Actionnaire {
  id: WikipediaId | undefined
  nom?: string
  type?: "individu" | "société" | "fonds de placement" | "pays"
  part?: number
  internes?: "oui" | "non"
  commentaire?: string
  sources?: Array<string>
}

export interface SourcesClass {
  lien?: string
  note: string
}

export interface ChaîneTV {
  devise: string
  couverture: Couverture
}

type Couverture = "locale" | "nationale"

export interface Individu {
  fortune: Fortune
}

export type Fortune = "cent-millionnaires" | "milliardaires"

export type Revenu = "abonnements" | "publicité" | "état"

export interface Journal {
  papier?: "oui" | "non"
  devise?: string
  couverture?: Couverture
  journalistes?: string[]
  revenus: Revenu[] | Revenu
  "accès gratuit"?: "sélection d'articles" | "limite de lecture"
  formeJuridique?: "loi de 1901" | "coopérative" | "SA"
  périodicité?: Périodicité
  domaine?: string
  web?: string
  publicité?: number
  sujets?: string[]
  depuis?: number
}

export type Périodicité = "hebdomadaire" | "mensuelle" | "quotidienne"

export type Role = "dirigeant" | "fondateur" | "actionnaire"

export interface Lien {
  role?: Role[] | Role
  id: string
  type?: string[]
}

export interface Société {
  secteurs?: Array<"médias" | "finance" | "luxe" | "télécoms" | "cosmétiques" | "armes" | "aviation" | "logistique">
  type?: string
}
