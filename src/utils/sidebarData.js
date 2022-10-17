export const FIELDS_CONFIGURATION = [
  {
    name: "Accès au numérique",
    ref: "ref-00",
    description:
      "Identification des territoires mal couverts par les réseaux ou dans lesquels des populations auront des difficultés financières à y accéder ou à s'équiper en terminaux numériques",
    fieldCategories: {
      no_thd_coverage_rate: {
        name: "Taux de non-couverture THD",
        description:
          "Part des locaux de référence ne pouvant pas bénéficier d’une connexion avec un débit d’au moins 30 Mbit/s en réception. L’enquête du Défenseur des droits souligne qu’une connexion internet de faible qualité ne permet pas la réalisation des démarches administratives en ligne.",
        no_thd_coverage_rate: true,
        source: "ARCEP, 2021",
        filter_key: "no_thd_coverage_rate",
        sourceUrl: "",
        isGeneral: true,
        isSenior: true,
      },
      poverty_rate: {
        name: "Taux de pauvreté",
        description:
          "Part des personnes appartenant à des ménages dont le niveau de vie est inférieur au seuil de pauvreté (60 % de la médiane du revenu disponible de l'ensemble de la population). Selon le Baromètre du numérique, les revenus ont une forte influence sur l’équipement en ordinateur et la connexion internet fixe. Ainsi, plus la part des ménages pauvres est importante, plus le risque de sous-équipement ou d’absence d’équipement est élevé.",
        poverty_rate: true,
        filter_key: "poverty_rate",
        source: "Filosofi, 2019",
        sourceUrl: "",
        isGeneral: true,
        isSenior: false,
      },
      poverty_rate_50_plus: {
        name: "Taux de pauvreté des 50 ans et plus",
        description:
          "Part des ménages pauvres dont le référent fiscal a plus de 50 ans parmi les ménages. Selon le Baromètre du numérique, les revenus ont une forte influence sur l’équipement en ordinateur et la connexion internet fixe. Ainsi, plus la part des ménages pauvres est importante, plus le risque de sous-équipement ou d’absence d’équipement est élevé.",
        poverty_rate_50_plus: true,
        filter_key: "poverty_rate_50_plus",
        source: "Filosofi, 2019",
        sourceUrl: "",
        isGeneral: false,
        isSenior: true,
      },
      library_distance: {
        name: "Accès aux bibliothèques",
        description:
          "Distance à vol d’oiseau (km) de la bibliothèque la plus proche. Les bibliothèques offrent un accès au réseau internet et à un équipement.",
        library_distance: true,
        source: "INSEE, Base permanente des équipements 2019",
        filter_key: "library_distance",
        sourceUrl: "",
        isGeneral: true,
        isSenior: true,
      },
    },
  },

  {
    name: "Accès à l'information",
    ref: "ref-01",
    description:
      "Identification des territoires mal couverts par une offre de service d’information ou des populations susceptibles d'être peu informées",
    fieldCategories: {
      public_service_distance: {
        name: "Accès à des services publics",
        description:
          "Distance moyenne à vol d’oiseau (km) à un « panier de services publics » : pôle emploi (réseau spécialisé, réseau de proximité ou réseau partenarial), impôts (DDFIP ou DRFIP), maisons de services au public et poste (bureau ou agence). La proximité de services publics physiques permet d’accéder plus aisément à ses droits en cas de difficultés avec les démarches en ligne.",
        public_service_distance: true,
        filter_key: "public_service_distance",
        source: "Insee ou Ircom",
        isGeneral: true,
        isSenior: true,
      },
      menseul_rate: {
        name: "Ménages d'une personne",
        description:
          "Part des personnes vivant seules parmi l’ensemble des ménages. Les personnes vivant seules ont plus de difficultés à trouver un aidant pour réaliser des démarches en ligne, et le baromètre du numérique indique que le taux d’équipement augmente avec le nombre de personnes dans le ménage.",
        menseul_rate: true,
        filter_key: "menseul_rate",
        source: "Insee ou Ircom",
        isGeneral: true,
        isSenior: false,
      },
      menseul_rate_50_plus: {
        name: "Ménages d'une personne 50 ans et plus",
        description:
          "Part des personnes de 50 ans et plus vivant seules parmi les ménages.\n" +
          "Les personnes vivant seules ont plus de difficultés à trouver un aidant pour réaliser des démarches en ligne, et le baromètre du numérique indique que le taux d’équipement augmente avec le nombre de personnes dans le ménage.",
        menseul_rate_50_plus: true,
        filter_key: "menseul_rate_50_plus",
        source: "Insee ou Ircom",
        isGeneral: false,
        isSenior: true,
      },
      fammono_rate: {
        name: "Ménages monoparentaux",
        description:
          "Part des ménages dont la famille principale est une famille monoparentale parmi l’ensemble des ménages. Les ménages monoparentaux ont davantage de risques de cumuler des facteurs de difficultés, et peuvent avoir davantage de démarches à effectuer.",
        fammono_rate: true,
        filter_key: "fammono_rate",
        source: "INSEE, RP 2017",
        isGeneral: true,
        isSenior: false,
      },
    },
  },

  {
    fieldCategories: {
      unemployement_rate: {
        name: "Taux de chômage",
        description:
          "Part des chômeurs au sens du BIT dans la population âgée de 15 à 64 ans. Les chômeurs, souvent en situation de précarité, ont à la fois de nombreuses démarches à accomplir en ligne et peuvent faire face à des difficultés liées à la compréhension de ces démarches. En particulier, l'ANLCI estime que 15% des chômeurs sont en situation d'illettrisme.",
        filter_key: "unemployement_rate",
        unemployement_rate: true,
        source: "https://www.observatoire-des-territoires.gouv.fr",
        isGeneral: true,
        isSenior: false,
      },
      unemployement_rate_50_plus: {
        name: "Taux de chômage 50-64 ans",
        description:
          "Taux de chômage des 50-64 ans. Les chômeurs ont à la fois de nombreuses démarches à accomplir en ligne et peuvent faire face à des difficultés liées à la compréhension de ces démarches.",
        filter_key: "unemployement_rate_50_plus",
        unemployement_rate_50_plus: true,
        source: "https://www.observatoire-des-territoires.gouv.fr",
        isGeneral: false,
        isSenior: true,
      },
      foreigners_rate: {
        name: "Part des étrangers",
        description:
          "Part des étrangers au sein de la population. Les personnes résidant en France mais n’y étant pas nées ont un risque accru d’être précaires et d’avoir des difficultés à comprendre les démarches administratives en ligne (connaissance du droit, barrière de la langue), et ce, alors qu’ils sont contraints à en réaliser plus que la moyenne.",
        filter_key: "foreigners_rate",
        foreigners_rate: true,
        source: "INSEE, RP 2017",
        isGeneral: true,
        isSenior: false,
      },
      foreigners_rate_55_plus: {
        name: "Part des étrangers 55 ans et plus",
        description:
          "Part des étrangers au sein de la population de 55 ans et plus du territoire. Les personnes résidant en France mais n’y étant pas nées ont un risque accru d’être précaires et d’avoir des difficultés à comprendre les démarches administratives en ligne (connaissance du droit, barrière de la langue), et ce, alors qu’elles sont contraintes à en réaliser plus que la moyenne.",
        filter_key: "foreigners_rate_55_plus",
        foreigners_rate_55_plus: true,
        source: "INSEE, RP 2017",
        isGeneral: false,
        isSenior: true,
      },
      social_assistance_rate: {
        name: "Dépendance aux prestations sociales",
        description:
          "Part des allocataires dont les ressources sont constituées à plus de 50 % des prestations Caf. Les personnes dont les revenus sont constitués majoritairement des prestations Caf font face à une plus grande précarité et ont une plus grande dépendance à la réalisation de leurs démarches administratives. Au même titre que les chômeurs, elles peuvent néanmoins faire face à de plus grandes difficultés pour les mener à bien.",
        social_assistance_rate: true,
        filter_key: "social_assistance_rate",
        source: "Cnaf, 2019",
        isGeneral: true,
        isSenior: true,
      },
    },
    name: "Compétences administratives",
    ref: "ref-02",
    description:
      "Identification des populations parmi lesquelles s’observe des difficultés à accomplir des démarches administratives",
  },

  {
    name: "Compétences numériques",
    ref: "ref-03",
    description:
      "Identification des populations parmi lesquelles s’observe une fréquence d’illectronisme ou des difficultés à utiliser internet",
    fieldCategories: {
      older_65_rate: {
        name: "Part des 65 ans et plus",
        description:
          "Part des personnes âgées de 65 ans et plus dans le territoire. Le Baromètre du numérique montre que l’usage du numérique décroît avec l’âge.",
        filter_key: "older_65_rate",
        older_65_rate: true,
        source: "Insee, RP 2017",
        isGeneral: true,
        isSenior: false,
      },
      older_75_rate: {
        name: "Part des 75 ans et plus",
        description:
          "Part des personnes âgées de 75 ans et plus parmi la population de 50 ans et plus du territoire. Le Baromètre du numérique montre que l’usage du numérique décroît avec l’âge et ce significativement à partir de 70 ans.",
        filter_key: "older_75_rate",
        older_75_rate: true,
        source: "Insee, RP 2017",
        isGeneral: false,
        isSenior: true,
      },
      nscol15p_rate: {
        name: "Part des pas ou peu diplômés",
        description:
          "Part des personnes sans diplômes ou avec un diplôme de niveau inférieur au baccalauréat parmi les 15 ans et plus non scolarisés . Le Baromètre du numérique montre que plus le niveau de diplôme est faible, moins les individus vont avoir tendance à utiliser le numérique.",
        filter_key: "nscol15p_rate",
        nscol15p_rate: true,
        source: "Insee, RP 2017",
        isGeneral: true,
        isSenior: false,
      },
      nscol15p_rate_50_plus: {
        name: "Part des pas ou peu diplômés 50 ans et plus",
        description:
          "Part des peu ou pas diplômés parmi la population de 50 ans et plus du territoire. Le Baromètre du numérique montre que plus le niveau de diplôme est faible, moins les individus vont avoir tendance à utiliser le numérique. Les personnes peu ou faiblement diplômés ont eu moins souvent recours au numérique dans leur travail.",
        filter_key: "nscol15p_rate_50_plus",
        nscol15p_rate_50_plus: true,
        source: "Insee, RP 2017",
        isGeneral: false,
        isSenior: true,
      },
    },
  },
];

export const SENIOR_FIELDS = [];
export const GENERAL_FIELDS = [];

for (const category of FIELDS_CONFIGURATION) {
  for (const fieldKey of Object.keys(category.fieldCategories)) {
    if (category.fieldCategories[fieldKey].isGeneral) {
      GENERAL_FIELDS.push(fieldKey);
    }
    if (category.fieldCategories[fieldKey].isSenior) {
      SENIOR_FIELDS.push(fieldKey);
    }
  }
}
