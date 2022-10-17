# Fragilité numérique

Développement d'un outil de localisation des zones d'exclusion numérique du territoire national grâce à l'indice de fragilité numérique. Outil à destination des collectivités et des élus locaux.

En savoir plus : https://docs.google.com/document/d/1s5Lrdw6dQ8K9j83mX50C0AkUby7w0ws1M0ULgcZa45U/edit#

## Variables

<table>
<thead>
    <tr>
        <th>Variable</th>
        <th>Description</th>
        <th>Source</th>
    </tr>
</thead>
<tbody>
<tr>
    <td colspan="4" class="divider">Accès au numérique
</td>
<tr>
    <td>Taux de pauvreté</td>
    <td>Part des personnes appartenant à des ménages dont le niveau de vie est inférieur au seuil de pauvreté (60 % de la médiane du revenu disponible de l'ensemble de la population). Selon le Baromètre du numérique, les revenus ont une forte influence sur l’équipement en ordinateur et la connexion internet fixe. Ainsi, plus la part des ménages pauvres est importante, plus le risque de sous-équipement ou d’absence d’équipement est élevé.</td>
    <td>Filosofi, 2019 </td>
</tr>
<tr>
    <td>Non-couverture THD</td>
    <td>Part des locaux de référence ne pouvant pas bénéficier d’une connexion avec un débit d’au moins 30 Mbit/s en réception. L’enquête du Défenseur des droits souligne qu’une connexion internet de faible qualité ne permet pas la réalisation des démarches administratives en ligne.</td>
    <td>ARCEP, 2021</td>
</tr>
<tr>
    <td colspan="4" class="divider">Accès à l'information</td>
</tr>
<tr>
    <td>Accès à des services publics</td>
    <td>Distance moyenne à vol d’oiseau (km) à un « panier de services publics » : pôle emploi (réseau spécialisé, réseau de proximité ou réseau partenarial), impôts (DDFIP ou DRFIP), maisons de services au public et poste (bureau ou agence). La proximité de services publics physiques permet d’accéder plus aisément à ses droits en cas de difficultés avec les démarches en ligne.</td>
    <td>INSEE, Base permanente des équipements 2019</td>
</tr>
<tr>
    <td>Ménages d’une personne</td>
    <td>Part des personnes vivant seules parmi l’ensemble des ménages. Les personnes vivant seules ont plus de difficultés à trouver un aidant pour réaliser des démarches en ligne, et le baromètre du numérique indique que le taux d’équipement augmente avec le nombre de personnes dans le ménage.</td>
    <td>INSEE, RP 2017</td>
</tr>
<tr>
    <td>Ménages monoparentaux</td>
    <td>Part des ménages dont la famille principale est une famille monoparentale parmi l’ensemble des ménages. Les ménages monoparentaux ont davantage de risques de cumuler des facteurs de difficultés, et peuvent avoir davantage de démarches à effectuer.</td>
    <td>INSEE, RP 2017</td>
</tr>
<tr>
    <td colspan="4" class="divider">Compétences numériques</td>
</tr>
<tr>
    <td>Part des 65 ans et plus</td>
    <td>Part des personnes âgées de 65 ans et plus dans le territoire. Le Baromètre du numérique montre que l’usage du numérique décroît avec l’âge</td>
    <td>Insee, RP 2017</td>
</tr>
<tr>
    <td>Part des pas ou peu diplômés</td>
    <td>Part des personnes sans diplômes ou avec un diplôme de niveau inférieur au baccalauréat parmi les 15 ans et plus non scolarisés . Le Baromètre du numérique montre que plus le niveau de diplôme est faible, moins les individus vont avoir tendance à utiliser le numérique.</td>
    <td>Insee, RP 2017</td>
</tr>
</tbody>
</table>

## Calcul des scores

Score par indicateur
Pour chaque indicateur, on calcule un score dépendant de la position relative de la commune par rapport au reste de la France.
Par exemple : pour la part des ménages d’une personne. Si la valeur de cet indicateur pour une commune donnée est dans les 10% les plus élevés de France, on attribue 3 points à cette commune pour cet indicateur.

La valeur centrale est la médiane c'est-à-dire la valeur qui divise en deux l’ensemble des scores des communes en parts égales. Ainsi 50% des communes ont un score inférieur à la médiane et 50% ont un score supérieur.
Plus le score est élevé, plus la population d’une commune présente un risque de fragilité numérique important.

Score total
Le score total (indice de fragilité numérique) est calculé en additionnant les scores de chaque commune sur chaque indicateur.
Avec 11 indicateurs, le score total varie entre -33 et 33.
On divise par 3,3 pour que ce score varie entre -10 et 10.

Score manuel
Si l’utilisateur de la carte interactive choisit d’exclure certains indicateurs, la méthode de calcul reste la même : on additionne les scores des indicateurs retenus et on divise le total pour que le score composé varie entre - 10 et 10.

## Project setup

### Code style

This project mainly use eslint and prettier as code style rules. It also use pre-commit to verify that each commit corresponds to the established rules.

### Env variables

You may have a .env file config at the project root that contains.

```
VUE_APP_BASE_API_URL="http://localhost:8000"
VUE_APP_MAPBOX_TOKEN="pk.kekw"
```

### Installation

Use Node v16.

with yarn :

```
yarn install
```

with npm :

```
npm install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
