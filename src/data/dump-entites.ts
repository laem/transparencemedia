import { Entité } from "@/types"

export const entites: Array<Entité> = [
  {
    id: "w:Arrêt_sur_images",
    web: "http://www.arretsurimages.net",
    depuis: 2007,
    journal: {
      papier: "non",
      devise: "Réflexion critique sur les médias",
      couverture: "nationale",
      journalistes: ["w:Daniel_Schneidermann"],
      revenus: "abonnements",
      "accès gratuit": "sélection d'articles",
      formeJuridique: "SA",
    },
    actionnariat: {
      estInconnu: "non",
      composition: [
        {
          id: "w:Daniel_Schneidermann",
          type: "individu",
          part: 100,
        },
      ],
    },
  },
  {
    id: "w:Atlantico",
    journal: {
      papier: "non",
      devise: "Un vent nouveau sur l'info",
      couverture: "nationale",
      revenus: ["abonnements", "publicité"],
      "accès gratuit": "limite de lecture",
    },
    web: "http://www.atlantico.fr",
    depuis: 2011,
    actionnariat: {
      sources: ["http://www.atlantico.fr/qui-sommes-nous#financement"],
      commentaire: "À notre connaissance, l'actionnariat de ce journal est secret.",
      estInconnu: "oui",
    },
  },
  {
    id: "w:Challenges",
    journal: {
      papier: "oui",
      périodicité: "hebdomadaire",
      devise: "Que dit l'économie cette semaine ?",
      couverture: "nationale",
      revenus: ["publicité", "abonnements"],
    },
    web: "http://www.challenges.fr",
    depuis: 1982,
    actionnariat: {
      composition: [
        {
          id: "w:Groupe_Perdriel",
          part: 100,
        },
      ],
    },
  },
  {
    id: "w:Le_Monde",
    nom: "Le Monde",
    depuis: 1944,
    web: "http://lemonde.fr",
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      devise: "Le quotidien français de référence",
      revenus: ["publicité", "abonnements"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Le_Monde_libre_(entreprise)",
          part: 64,
        },
        {
          id: "w:Groupe_Le_Monde",
          part: 34,
        },
      ],
    },
  },
  {
    id: "w:Télérama",
    web: "http://www.telerama.fr/",
    depuis: 1947,
    journal: {
      papier: "oui",
      périodicité: "hebdomadaire",
      couverture: "nationale",
      domaine: "culturel",
      revenus: ["publicité", "abonnements"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Le_Monde",
          part: 100,
        },
      ],
    },
  },
  {
    id: "w:Le_Monde_libre_(entreprise)",
    nom: "Le Monde libre",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Pierre_Bergé",
        },
        {
          id: "w:Matthieu_Pigasse",
        },
        {
          id: "w:Xavier_Niel",
        },
        {
          id: "w:Prisa",
          part: 23,
        },
      ],
    },
  },
  {
    id: "w:Prisa",
    nom: "Prisa",
    société: {
      secteurs: ["médias"],
    },
  },
  {
    id: "w:Matthieu_Pigasse",
    type: "individu",
    liens: [
      {
        role: "dirigeant",
        id: "w:Banque_Lazard",
      },
    ],
  },
  {
    id: "w:Banque_Lazard",
    société: {
      secteurs: ["finance"],
    },
  },
  {
    id: "w:Pierre_Bergé",
    individu: {
      fortune: "cent-millionnaires",
    },
    liens: [
      {
        role: "fondateur",
        id: "w:Yves_Saint_Laurent_(entreprise)",
      },
    ],
  },
  {
    id: "w:Yves_Saint_Laurent_(entreprise)",
    société: {
      secteurs: ["luxe"],
    },
  },
  {
    id: "w:Xavier_Niel",
    individu: {
      fortune: "milliardaires",
    },
    liens: [
      {
        role: ["actionnaire", "fondateur", "dirigeant"],
        id: "w:Free_(entreprise)",
      },
    ],
  },
  {
    id: "w:Free_(entreprise)",
    société: {
      secteurs: ["télécoms"],
    },
  },
  {
    id: "w:Groupe_Le_Monde",
    nom: "Le Monde partenaires et associés",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: undefined,
          nom: "actionnaires_internes_Le_Monde",
          internes: "oui",
          part: 52,
        },
        {
          id: undefined,
          nom: "Actionnaires externes Le Monde",
          part: 48,
          commentaire: "Dont Société des lecteurs, à mentionner",
        },
      ],
    },
  },
  {
    id: "w:Fakir_(journal)",
    nom: "Fakir",
    journal: {
      papier: "oui",
      périodicité: "mensuelle",
      couverture: "nationale",
      devise: "Journal fâché avec tout le monde. Ou presque.",
      revenus: "abonnements",
      formeJuridique: "loi de 1901",
    },
    depuis: 1999,
    web: "http://www.fakirpresse.info/",
    actionnariat: {
      sources: [
        "https://fr.ulule.com/fakirpresse",
        {
          source: "http://www.acrimed.org/Les-lecteurs-La-structure-Les-finances-Les-tarifs-Contacts",
          commentaire: "lien complet mais ancien datant de 2003",
        },
      ],
      composition: [
        {
          id: undefined,
          nom: "Association Fakir",
        },
      ],
    },
  },
  {
    id: "w:Huffington_Post",
    web: "http://www.huffingtonpost.fr",
    journal: {
      papier: "non",
      couverture: "nationale",
      revenus: ["publicité", "abonnements"],
    },
    depuis: 2012,
    actionnariat: {
      composition: [
        {
          id: "w:Les_Nouvelles_Éditions_indépendantes",
          part: 11,
        },
        {
          id: "w:Le_Monde",
          part: 34,
        },
        {
          id: "w:AOL",
          part: 51,
        },
      ],
    },
  },
  {
    id: "w:AOL",
    société: {
      secteurs: ["télécoms"],
    },
  },
  {
    id: "w:Les_Inrockuptibles",
    journal: {
      papier: "oui",
      périodicité: "hebdomadaire",
      couverture: "nationale",
      devise: "Hebdo culturel généraliste de gauche",
      revenus: ["publicité", "abonnements"],
    },
    depuis: 1986,
    web: "http://www.lesinrocks.com/",
    actionnariat: {
      composition: [
        {
          id: "w:Les_Nouvelles_Éditions_indépendantes",
          part: 100,
        },
      ],
    },
  },
  {
    id: "w:Les_Nouvelles_Éditions_indépendantes",
    société: {
      type: "holding",
      secteurs: ["médias"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Matthieu_Pigasse",
          type: "individu",
          part: 78,
        },
        {
          id: undefined,
          nom: "Elaïs Orium",
          type: "fonds de placement",
          part: 18,
        },
        {
          id: "w:Christian_Fevret",
          type: "individu",
          part: 2,
        },
      ],
    },
  },
  {
    id: "w:L'Humanité",
    journal: {
      devise: "Fondé par Jean Jaurès",
      web: "http://www.humanite.fr",
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      revenus: ["publicité", "abonnements"],
    },
    depuis: 1904,
    actionnariat: {
      sources: [
        {
          source: "http://www.lesinrocks.com/2016/04/23/actualite/journal-lhumanite-va-t-disparaitre-11821813",
          commentaire: "Il n’y a aujourd’hui plus d’actionnaires extérieurs dans le capital du journal.",
        },
      ],
      commentaire:
        "Le capital semble être détenu par la Société des Lecteurs et la Société des amis. Selon les Inrocks, \"il n’y a aujourd’hui plus d’actionnaires extérieurs dans le capital du journal\", faisant référence à Hachette, TF1 et la Caisse d'Épargne qui l'étaient.",
    },
  },
  {
    id: "w:L'Opinion_(quotidien,_2013)",
    nom: "l'Opinion",
    journal: {
      devise: "Libéral, pro-business et pro-européen",
      papier: "oui",
      couverture: "nationale",
      revenus: ["publicité", "abonnements"],
    },
    depuis: 2013,
    web: "http://www.lopinion.fr",
    journalistes: ["w:Nicolas_Beytout"],
    actionnariat: {
      sources: [
        "https://fr.wikipedia.org/wiki/Bernard_Arnault#Actionnariat",
        "http://www.lemonde.fr/actualite-medias/article/2013/05/13/les-investisseurs-mysteres-de-l-opinion_3178646_3236.html",
        "https://www.mediapart.fr/journal/economie/010713/nicolas-beytout-finance-par-les-bettencourt",
      ],
      composition: [
        {
          id: "w:Nicolas_Beytout",
          type: "individu",
          part: 30,
        },
        {
          id: "w:Bernard_Arnault",
          part: 44.44,
        },
        {
          id: "w:Liliane_Bettencourt",
          type: "individu",
          part: 13.4,
        },
        {
          id: "w:News_Corp",
          part: 14.81,
        },
      ],
    },
  },
  {
    id: "w:News_Corp",
    société: {
      secteurs: ["médias"],
    },
  },
  {
    id: "w:Liliane_Bettencourt",
    type: "individu",
    liens: [
      {
        type: ["actionnaire principal"],
        id: "w:L'Oréal",
      },
    ],
  },
  {
    id: "w:L'Oréal",
    société: {
      secteurs: ["cosmétiques"],
    },
  },
  {
    id: "w:La_Croix",
    web: "http://www.la-croix.com",
    depuis: 1883,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      devise: "Chrétien, catholique et progressiste",
      revenus: ["publicité", "abonnements"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Groupe_Bayard",
        },
      ],
    },
  },
  {
    id: "w:Groupe_Bayard",
    actionnariat: {
      composition: [
        {
          id: "w:Assomptionnistes",
        },
      ],
    },
  },
  {
    id: "w:Assomptionnistes",
    nom: "Augustins de l'Assomption",
    type: "organisation religieuse",
  },
  {
    id: "w:Le_Monde_diplomatique",
    web: "http://www.monde-diplomatique.fr",
    depuis: 1954,
    journal: {
      papier: "oui",
      périodicité: "mensuelle",
      couverture: "nationale",
      devise: "Le titre français le plus diffusé dans le monde",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Le_Monde",
          part: 51,
        },
        {
          id: "w:Amis_du_Monde_diplomatique",
          part: 25,
        },
        {
          id: "w:Günter_Holzmann#Association_G.C3.BCnter_Holzmann",
          part: 24,
        },
      ],
    },
  },
  {
    id: "w:Amis_du_Monde_diplomatique",
    type: "société",
  },
  {
    id: "w:Günter_Holzmann#Association_G.C3.BCnter_Holzmann",
    nom: "Équipe rédactionnelle Monde Diplomatique",
    internes: "oui",
  },
  {
    id: "w:Le_Canard_enchaîné",
    journal: {
      web: "non",
      périodicité: "hebdomadaire",
      publicité: 0,
      devise: "La liberté de la presse ne s’use que quand on ne s’en sert pas",
      couverture: "nationale",
      revenus: ["abonnements"],
    },
    depuis: 1915,
    actionnariat: {
      sources: ["https://fr.wikipedia.org/wiki/Le_Canard_encha%C3%AEn%C3%A9#Ind.C3.A9pendance_financi.C3.A8re"],
      composition: [
        {
          id: undefined,
          nom: "SA Les Éditions Maréchal",
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "SA Les Éditions Maréchal",
    internes: "oui",
    fondateurs: "oui",
  },
  {
    id: "w:Le_Figaro",
    nom: "Le Figaro",
    web: "http://www.lefigaro.fr",
    depuis: 1826,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      devise: "Sans la liberté de blâmer, il n'est point d'éloge flatteur.",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Société_du_Figaro",
        },
      ],
    },
  },
  {
    id: "w:Société_du_Figaro",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Socpresse",
        },
      ],
    },
  },
  {
    id: "w:Socpresse",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Serge_Dassault",
        },
      ],
    },
  },
  {
    id: "w:Serge_Dassault",
    individu: {
      fortune: "milliardaires",
    },
    liens: [
      {
        type: ["actionnaire", "ancien dirigeant"],
        id: "w:Groupe_Dassault",
      },
    ],
  },
  {
    id: "w:Groupe_Dassault",
    société: {
      secteurs: ["armes", "aviation"],
    },
  },
  {
    id: "w:Le_Point",
    web: "http://www.lepoint.fr",
    depuis: 1972,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      devise: "Le newsmagazine français",
      couverture: "nationale",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Artémis_(holding)",
        },
      ],
    },
  },
  {
    id: "w:Artémis_(holding)",
    société: {
      type: "holding",
    },
    actionnariat: {
      composition: [
        {
          id: "w:François_Pinault",
        },
      ],
    },
  },
  {
    id: "w:François_Pinault",
    individu: {
      fortune: "milliardaires",
    },
  },
  {
    id: "w:Les_Jours",
    web: "http://lesjours.fr",
    depuis: 2016,
    journal: {
      papier: "non",
      devise: "Hier, Aujourd'hui, Demain",
      couverture: "nationale",
      revenus: ["abonnements"],
    },
    actionnariat: {
      sources: ["http://lesjours.fr/obsessions/les-jours-c-quoi/les-jours-actionnaires/"],
      composition: [
        {
          id: undefined,
          nom: "Fondateurs Les Jours",
          part: 89.24,
        },
        {
          id: "w:Xavier_Niel",
          part: 3.47,
        },
        {
          id: "w:Olivier_Legrain",
          type: "individu",
          part: 2.43,
        },
        {
          id: "w:Marc-Olivier_Fogiel",
          type: "individu",
          part: 1.24,
        },
        {
          id: "w:Pierre-Antoine_Capton",
          type: "individu",
          part: 0.99,
        },
        {
          id: "w:Matthieu_Pigasse",
          part: 0.99,
        },
        {
          id: undefined,
          nom: "Famille_amis_les_jours",
          part: 0.89,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "Fondateurs Les Jours",
    fondateurs: "oui",
  },
  {
    id: "w:Les_Échos",
    web: "http://lesechos.fr",
    depuis: 1908,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      sujets: ["économie", "finance"],
      revenus: ["abonnements", "publicité"],
      devise:
        "Nous défendons l’idée que le marché est supérieur au plan. En conséquence, nous pensons que l’entreprise privée est l’outil le plus performant, même si ce n’est pas le seul.",
    },
    actionnariat: {
      composition: [
        {
          id: "w:Groupe_Les_Échos",
        },
      ],
    },
  },
  {
    id: "w:Groupe_Les_Échos",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:LVMH",
        },
      ],
    },
  },
  {
    id: "w:Le_Parisien",
    commentaire: "w:Aujourd'hui_en_France",
    web: "http://www.leparisien.fr",
    depuis: 1944,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      devise: "Le premier quotidien national payant d'information générale",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:LVMH",
        },
      ],
    },
  },
  {
    id: "w:LVMH",
    "nom complet": "LVMH - Moët Hennessy Louis Vuitton ",
    société: {
      secteurs: ["luxe"],
    },
    actionnariat: {
      commentaire:
        "Selon wikipedia, le groupe Arnault (ou le groupe familial Arnault ?) détient LVMH par l'intermédiaire de Christian Dior SA.\n",
      sources: [
        {
          commentaire: "Wikipedia LVMH Actionnaires",
          source: "https://fr.wikipedia.org/wiki/LVMH_-_Mo%C3%ABt_Hennessy_Louis_Vuitton#Actionnaires",
        },
        {
          commentaire: "LVMH.fr - Structure du capital",
          source: "http://www.lvmh.fr/communication-financiere/actionnaires/structure-du-capital",
        },
      ],
      composition: [
        {
          id: "w:Bernard_Arnault",
          part: 46.6,
        },
        {
          id: undefined,
          nom: "institutionnels_étrangers",
          part: 33.8,
        },
        {
          id: undefined,
          nom: "institutionnels_français",
          part: 13.5,
        },
        {
          id: undefined,
          nom: "personnes_physiques",
          part: 5.2,
        },
        {
          id: undefined,
          nom: "autocontrôle",
          part: 0.9,
        },
      ],
    },
  },
  {
    id: "w:Bernard_Arnault",
    individu: {
      fortune: "milliardaires",
    },
    liens: [
      {
        type: ["propriétaire"],
        id: "w:LVMH",
      },
    ],
  },
  {
    id: "w:Libération_(journal)",
    nom: "Libération",
    web: "http://liberation.fr",
    depuis: 1973,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      couverture: "nationale",
      devise: "Fondé sous l'égide de Jean-Paul Sartre",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Société_française_du_radiotéléphone",
        },
      ],
    },
  },
  {
    id: "w:L'Express",
    web: "http://www.lexpress.fr",
    depuis: 1953,
    journal: {
      papier: "oui",
      périodicité: "hebdomadaire",
      devise: "Ni de droite ni de gauche, il est au-dessus de la mêlée.",
      couverture: "nationale",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Société_française_du_radiotéléphone",
        },
      ],
    },
  },
  {
    id: "w:BFM_TV",
    web: "http://www.bfmtv.com",
    depuis: 2005,
    "chaîne TV": {
      devise: "Première chaîne d'information de France",
      couverture: "nationale",
    },
    actionnariat: {
      composition: [
        {
          id: "w:NextRadioTV",
        },
      ],
    },
  },
  {
    id: "w:NextRadioTV",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Société_française_du_radiotéléphone",
          part: 100,
        },
      ],
    },
  },
  {
    id: "w:Société_française_du_radiotéléphone",
    nom: "SFR",
    divisions: "SFR Média -> SFR Presse",
    société: {
      secteurs: ["télécoms"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Altice",
          part: 77.77,
        },
        {
          id: undefined,
          nom: "capital_flottant_sfr",
          part: 22.22,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "capital_flottant_sfr",
  },
  {
    id: "w:Altice",
    type: "société",
    actionnariat: {
      sources: ["http://www.boursorama.com/bourse/profil/profil.phtml?symbole=1rAATC"],
      composition: [
        {
          id: "w:Patrick_Drahi",
          part: 58,
        },
        {
          id: undefined,
          nom: "Europacific Growth Fund",
          part: 4.9,
        },
        {
          id: undefined,
          nom: "Carmignac Gestion",
          part: 3.38,
        },
        {
          id: "w:Fidelity_Investments",
          part: 3.17,
        },
        {
          id: undefined,
          nom: "Capital flottant Altice",
        },
      ],
    },
  },
  {
    id: "w:Patrick_Drahi",
    individu: {
      fortune: "milliardaires",
    },
  },
  {
    id: undefined,
    nom: "Europacific Growth Fund",
    société: {
      type: "w:Fonds_de_placement",
      secteurs: ["finance"],
    },
  },
  {
    id: undefined,
    nom: "Carmignac Gestion",
    société: {
      type: "w:Fonds_de_placement",
      secteurs: ["finance"],
    },
  },
  {
    id: "w:Fidelity_Investments",
    société: {
      type: "w:Fonds_de_placement",
      secteurs: ["finance"],
    },
  },
  {
    id: "w:Mediapart",
    web: "https://www.mediapart.fr",
    depuis: 2008,
    journal: {
      papier: "non",
      devise: "Journal d'information numérique, indépendant et participatif",
      couverture: "nationale",
      revenus: ["abonnements"],
    },
    actionnariat: {
      sources: [
        "http://www.lemonde.fr/actualite-medias/article/2015/03/13/mediapart-plenel-prepare-l-apres-plenel_4593035_3236.html",
        "https://fr.wikipedia.org/wiki/Mediapart#Capital",
        "http://presite.mediapart.fr/contenu/quels-sont-vos-actionnaires.html",
      ],
      composition: [
        {
          id: undefined,
          nom: "fondateurs_mediapart",
          part: 36.71,
        },
        {
          id: undefined,
          nom: "société_amis_mediapart",
          part: 14.65,
        },
        {
          id: undefined,
          nom: "ecofinance",
          part: 18.27,
        },
        {
          id: undefined,
          nom: "doxa",
          part: 27.75,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "société_amis_mediapart",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Xavier_Niel",
          part: 39.68,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "fondateurs_mediapart",
    fondateurs: "oui",
    actionnariat: {
      composition: [
        {
          id: "w:Edwy_Plenel",
          type: "individu",
          part: 41.5,
        },
        {
          id: undefined,
          nom: "Marie-Hélène Smiejan",
          type: "individu",
          part: 41.5,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "Doxa",
    type: "société",
  },
  {
    id: undefined,
    nom: "Écofinance",
    type: "société",
  },
  {
    id: "w:L'Obs",
    web: "http://nouvelobs.com",
    depuis: 1964,
    journal: {
      papier: "oui",
      périodicité: "hebdomadaire",
      devise: "L'Observateur politique, économique et littéraire",
      couverture: "nationale",
      revenus: ["abonnements", "publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Le_Monde_libre_(entreprise)",
          part: 66,
        },
        {
          id: "w:Groupe_Perdriel",
          part: 34,
        },
      ],
    },
  },
  {
    id: "w:Groupe_Perdriel",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Claude_Perdriel",
          part: 93,
        },
        {
          id: "w:Le_Monde",
          part: 6,
        },
        {
          id: undefined,
          nom: "société_rédacteurs_perdriel",
          part: 1,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "société_rédacteurs_perdriel",
    internes: "oui",
  },
  {
    id: "w:Claude_Perdriel",
    individu: {
      fortune: "cent-millionnaires",
    },
  },
  {
    id: "w:Ouest-France",
    web: "http://www.ouest-france.fr",
    depuis: 1944,
    journal: {
      papier: "oui",
      périodicité: "quotidienne",
      devise: "Premier quotidien français en termes de diffusion",
      couverture: "locale",
      revenus: ["abonnements", "publicité"],
      formeJuridique: "loi de 1901",
    },
    actionnariat: {
      composition: [
        {
          id: "w:Groupe_SIPA_-_Ouest-France",
        },
      ],
    },
  },
  {
    id: "w:Groupe_SIPA_-_Ouest-France",
    type: "société",
    actionnariat: {
      composition: [
        {
          id: "w:Association_pour_le_soutien_des_principes_de_la_démocratie_humaniste",
        },
      ],
    },
  },
  {
    id: "w:Association_pour_le_soutien_des_principes_de_la_démocratie_humaniste",
    type: "association 1901",
  },
  {
    id: "w:Reporterre",
    web: "https://reporterre.net",
    depuis: 2007,
    journal: {
      papier: "non",
      devise: "Le quotidien de l'écologie",
      revenus: ["abonnements"],
    },
    actionnariat: {
      commentaire: "À notre connaissance, l'actionnariat de ce journal est secret.",
      estInconnu: "oui",
    },
  },
  {
    id: "w:RT_(chaîne_de_télévision)",
    nom: "RT France",
    web: "https://francais.rt.com",
    depuis: 2014,
    journal: {
      papier: "non",
      revenus: ["état"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Ministère_des_Affaires_étrangères_(Russie)",
          type: "pays",
        },
      ],
    },
  },
  {
    id: "w:Slate_(magazine)",
    web: "https://www.slate.fr",
    depuis: 2009,
    journal: {
      papier: "non",
      devise: "Slate.fr est le magazine en ligne de référence.",
      couverture: "nationale",
      revenus: ["publicité"],
    },
    actionnariat: {
      sources: [
        "http://bfmbusiness.bfmtv.com/entreprise/les-actionnaires-ultra-chic-de-slate-fr-943252.html",
        {
          source: "http://www.slate.fr/qui-sommes-nous",
          commentaire: 'La page "Qui sommes-nous" semble être en contradiction avec l\'article de BFMTV',
        },
      ],
      composition: [
        {
          id: "w:Benjamin_de_Rothschild",
          part: 29,
        },
        {
          id: undefined,
          nom: "Financière_Viveris",
          part: 22,
        },
        {
          id: undefined,
          nom: "fondateurs_slate",
          part: 25,
        },
        {
          id: undefined,
          nom: "actionnaires_externes_slate",
        },
      ],
    },
  },
  {
    id: "w:Benjamin_de_Rothschild",
    individu: {
      fortune: "milliardaires",
    },
    liens: [
      {
        type: ["proriétaire", "président"],
        id: "w:Groupe_Edmond_de_Rothschild",
      },
    ],
  },
  {
    id: "w:Groupe_Edmond_de_Rothschild",
    société: {
      secteurs: ["finance"],
    },
  },
  {
    id: undefined,
    nom: "Financière_Viveris",
    société: {
      type: "w:Fonds_de_placement",
    },
  },
  {
    id: undefined,
    nom: "fondateurs_slate",
    fondateurs: "oui",
  },
  {
    id: undefined,
    nom: "actionnaires_externes_slate",
    type: "actionnaires externes",
  },
  {
    id: "w:Alternatives_économiques",
    depuis: 1980,
    web: "http://www.alternatives-economiques.fr",
    journal: {
      papier: "oui",
      périodicité: "mensuelle",
      couverture: "nationale",
      sujets: ["économie"],
      devise: "Fondé en réaction au slogan « There is no alternative »",
      revenus: ["publicité", "abonnements"],
      formeJuridique: "coopérative",
    },
    actionnariat: {
      sources: [
        {
          commentaire: "Page Éditorial du journal, tous les mois",
        },
      ],
      composition: [
        {
          id: undefined,
          nom: "Salariés Altereco",
          internes: "oui",
          part: 62,
        },
        {
          id: undefined,
          nom: "Société civile lecteurs Altereco",
          part: 22,
        },
        {
          id: undefined,
          nom: "Association des lecteurs",
          part: 1,
        },
        {
          id: undefined,
          nom: "Anciens salariés",
          part: 3,
        },
        {
          id: undefined,
          nom: "Actionnaires externes",
          part: 12,
        },
      ],
    },
  },
  {
    id: "w:20_minutes_(France)",
    web: "http://www.20minutes.fr",
    depuis: 2002,
    journal: {
      devise: "Le journal papier le plus lu en France",
      revenus: ["publicité"],
    },
    actionnariat: {
      sources: ["http://www.rossel-lavoix.fr/Gouvernance-et-Valeurs/Actionnariat"],
      composition: [
        {
          id: "w:Groupe_SIPA_-_Ouest-France",
          part: 50,
        },
        {
          id: "w:Groupe_La_Voix",
          part: 49.3,
        },
      ],
    },
  },
  {
    id: "w:Groupe_La_Voix",
    actionnariat: {
      composition: [
        {
          id: "w:Groupe_Rossel",
          part: 73,
        },
        {
          id: "w:Crédit_agricole",
          part: 25,
        },
      ],
    },
  },
  {
    id: "w:Groupe_Rossel",
    actionnariat: {
      composition: [
        {
          id: "w:Famille_hurbain",
          part: 82.98,
        },
      ],
    },
  },
  {
    id: "w:Famille_hurbain",
    individu: {
      fortune: "cent-millionnaires",
    },
  },
  {
    id: "w:CNews_Matin",
    web: "http://cnewsmatin.fr",
    journal: {
      depuis: 2007,
      revenus: ["publicité"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Bolloré",
          part: 70,
        },
        {
          id: "w:Le_Monde",
          part: 30,
        },
      ],
    },
  },
  {
    id: "w:Bolloré",
    société: {
      secteurs: ["logistique"],
    },
    actionnariat: {
      composition: [
        {
          id: "w:Financière_de_l'Odet",
          part: 64.4,
        },
      ],
    },
  },
  {
    id: "w:Financière_de_l'Odet",
    société: {
      type: "financière",
    },
    actionnariat: {
      sources: [
        "http://www.financiere-odet.fr/fr-fr/la-societe/organigramme/",
        "http://www.latribune.fr/vos-finances/financiere-de-l-odet-tout-bollore-avec-une-decote-612426.html",
      ],
      composition: [
        {
          id: undefined,
          nom: "Sofibol",
          part: 55.3,
        },
      ],
    },
  },
  {
    id: undefined,
    nom: "Sofibol (Société financière Bolloré)",
    société: {
      type: "holding",
    },
    actionnariat: {
      composition: [
        {
          id: "w:Vincent_Bolloré",
          part: 100,
        },
      ],
    },
  },
  {
    id: "w:Vincent_Bolloré",
    individu: {
      fortune: "milliardaires",
    },
    liens: [
      {
        role: ["actionnaire", "dirigeant"],
        id: "w:Bolloré",
      },
    ],
  },
]
