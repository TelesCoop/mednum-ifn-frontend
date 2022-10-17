<template>
  <div id="wrapper">
    <Header></Header>
    <main id="homepage">
      <section class="section__search">
        <div class="banner">
          <div class="txt-banner has-text-left">
            <h1>Géolocaliser les zones de fragilité numérique de mon territoire</h1>
            <div class="blc-search">
              <div class="blc-chp home__geocoder">
                <button class="search"></button>
                <div class="chp" id="geocoder"></div>
              </div>
              <button
                type="submit"
                name=""
                class="btn btn-submit"
                value="Tester"
                @click="searchResult"
                >Tester</button
              >
            </div>
          </div>
        </div>
      </section>
      <section class="section__about">
        <div class="wrapper">
          <div class="row clr">
            <div class="col pr-40">
              <div class="text has-text-left is-text-blue">
                <h2
                  >Aujourd’hui, 13 millions <br class="mobile__none" />de Français sont en
                  difficulté avec le numérique.</h2
                >
                <p
                  >Plus que jamais, l’inclusion numérique est un enjeu de cohésion sociale et
                  territoriale qui concerne tout le monde : entreprises, associations,
                  administrations, collectivités et particuliers.</p
                >
                <p>
                  Accompagner nécessite de connaître les profils de personnes, de besoins et de
                  territoires où elles se trouvent, pour engager les bonnes actions au bon endroit.
                  C’est ce que permet l’indice de fragilité numérique !</p
                >
              </div>
            </div>
            <div class="col pl-40">
              <div class="img has-text-left">
                <img src="../assets/exclusion_numerique.svg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__indicators" id="reading-keys">
        <div class="wrapper">
          <div class="row clr">
            <div class="col">
              <div class="text has-text-left">
                <h2>Qu'est-ce que c'est ?</h2>

                <p>
                  L’indice de fragilité numérique révèle les territoires où la population est le
                  plus à risque d’exclusion.</p
                >
                <p>
                  De nombreux facteurs sont à l’origine de l’exclusion numérique. Ils sont regroupés
                  en quatre axes qui constituent les principales causes de l’exclusion numérique. Au
                  sein de chaque axe, on retrouve plusieurs variables utilisées pour le calcul.</p
                >
                <a
                  href="https://docs.google.com/document/d/1aXBez7QCPUVGdcuyT-Bs4FkU9mVpfsTS7NdKCf1bPeM"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="En savoir plus sur la méthode"
                  class="link2"
                >
                  > En savoir plus sur la méthode</a
                >
              </div>
            </div>
            <div class="col">
              <div v-if="!selectedInformationDetail" class="lst-indice has-text-left Right">
                <div class="item" @click="selectedInformationDetail = 'competences-numeriques'">
                  <div class="content">
                    <span class="ico">
                      <img src="../assets/ico1.svg" />
                    </span>
                    <p>Compétences numériques</p>
                  </div>
                </div>
                <div class="item" @click="selectedInformationDetail = 'acces-numeriques'">
                  <div class="content">
                    <span class="ico"><img src="../assets/ico2.svg" /></span>
                    <p>Accès au numérique</p>
                  </div>
                </div>
                <div class="item" @click="selectedInformationDetail = 'competences-admin'">
                  <div class="content">
                    <span class="ico"><img src="../assets/ico3.svg" /></span>
                    <p>Compétences administratives</p>
                  </div>
                </div>
                <div class="item" @click="selectedInformationDetail = 'acces-information'">
                  <div class="content">
                    <span class="ico"><img src="../assets/ico4.svg" /></span>
                    <p>Accès à l’information</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <div @click="selectedInformationDetail = null" class="informationDetailDescription">
                  <div>
                    <p class="detail-title">
                      {{ informationTitle[selectedInformationDetail] }}
                    </p>
                    <p>
                      {{ informationDetail[selectedInformationDetail] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__cartography">
        <div class="wrapper">
          <div class="row clr">
            <div class="col">
              <div class="text has-text-left has-text-marine">
                <h2
                  >Une cartographie <br />
                  dynamique</h2
                >
                <p>Les scores de fragilité qui composent cet indice sont projetés sur une carte.</p>
                <p
                  >Celle-ci permet de visualiser rapidement les zones de risques et de comprendre
                  leur nature.</p
                >
              </div>
            </div>
            <div class="col">
              <div class="text-r has-text-left Right">
                <p class="has-text-marine"
                  >Plus une zone tend vers le rouge, plus sa population est susceptible d’être en
                  situation d’exclusion numérique.</p
                >
                <img
                  src="@/assets/color-palette.png"
                  alt="Palette de couleurs"
                  style="width: 280px; height: 20px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__visualization">
        <div class="wrapper">
          <div class="row">
            <div class="col">
              <div class="text has-text-left is-text-blue">
                <h2>Une visualisation <br />par cartographie dynamique</h2>
                <p
                  >Situez en un clin d’oeil les zones de fragilité potentielle sur votre
                  territoire.</p
                >
                <router-link to="/carte" class="link">Accéder à la cartographie</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__use__cases" id="use-cases">
        <div class="wrapper">
          <div class="text has-text-left is-text-blue">
            <h2>Cas d’usage</h2>
            <p>Prenons trois exemples d’utilisation</p>
          </div>
          <div class="use__cases__section">
            <div class="item has-text-left">
              <div class="col">
                <div class="content prof clr">
                  <div class="inner">
                    <div class="profil clr">
                      <div class="img">
                        <img src="../assets/profil1.png" />
                      </div>
                      <h3
                        ><span>Eric</span> Chef de projet numérique <br />pour une agglomération
                      </h3>
                    </div>
                    <div class="contenu">
                      <p>
                        On a la réunion de planification de la stratégie d’inclusion numérique pour
                        2022. A-t-on des recommandations ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="content prof clr">
                  <div class="inner">
                    <div class="profil clr">
                      <div class="img">
                        <img src="../assets/profil2.png" />
                      </div>
                      <h3
                        ><span>Julie</span>Chargée de partenariat pour une grande entreprise
                        mutualiste
                      </h3>
                    </div>
                    <div class="contenu">
                      <p
                        >Nos référents locaux mènent des actions pour nos clients qui n’arrivent pas
                        à utiliser leur espace personnel en ligne. Comment faire pour que les
                        actions locales soient cohérentes ?</p
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="content prof clr">
                  <div class="inner">
                    <div class="profil clr">
                      <div class="img">
                        <img src="../assets/profil3.png" />
                      </div>
                      <h3
                        ><span>Jérôme</span>
                        Directeur d’une association de médiation numérique du département des Grands
                        Lacs
                      </h3>
                    </div>
                    <div class="contenu">
                      <p
                        >L’agglomération Grands-Lacs-du-Sud nous a contacté pour mener des actions
                        itinérantes de médiation numérique. Que peut-on leur apporter ?</p
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__needs bg-marine">
        <div class="wrapper">
          <div class="text has-text-left">
            <h2>Pourquoi utiliser l’indice de fragilité numérique ?</h2>
          </div>
          <div class="needs__section">
            <div class="col">
              <div class="need__section__header">
                <h3>J’ai besoin...</h3>
                <img src="../assets/search_icon.svg" />
              </div>
              <div class="needs__section__content">
                <img src="../assets/men.svg" alt="" />
                <ul class="has-text-left need__content__list">
                  <li>d’analyser les risques de fragilité numérique</li>
                  <li
                    >d’avoir un outil d’aide à la décision pour piloter les actions de médiation
                    numérique</li
                  >
                  <li>de visualiser les zones de risque de fragilité numérique</li>
                  <li>de disposer d’un constat partagé avec mes partenaires</li>
                  <li
                    >d’utiliser les données publiques et internes à l’organisation pour comprendre
                    l’exclusion numérique</li
                  >
                </ul>
              </div>
            </div>
            <div class="col has-bg-white">
              <div class="need__section__header">
                <h3 class="has-text-orange">Avec l’IFN, je peux...</h3>
                <img src="../assets/key.svg" />
              </div>
              <div class="needs__section__content">
                <img src="../assets/woman.svg" alt="" />
                <ul class="has-text-left need__content__list has-text-marine">
                  <li>Objectiver les zones où il existe un risque accru d’exclusion numérique</li>
                  <li
                    >Comparer les territoires entre eux et selon différents niveaux (communes,
                    intercommunalités, départements et régions)</li
                  >
                  <li
                    >Partager une vision commune par les cartes de la géographie de l’exclusion
                    numérique</li
                  >
                  <li>Avoir simplement et clés en main un outil d’analyse des données</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__more__info">
        <div class="wrapper">
          <div class="row clr">
            <div class="col">
              <div class="text has-text-left">
                <h2>Agir maintenant</h2>
                <p
                  >Vous avez pris connaissance de votre score et souhaitez engager des actions pour
                  mieux comprendre les résultats et mettre en place une stratégie efficace
                  d’accompagnement de vos publics ?</p
                >
                <p
                  >Complétez le formulaire d’intérêt sur le site de la MedNum et un membre de notre
                  équipe vous contactera.</p
                >
              </div>
            </div>
            <div class="col">
              <div class="btn has-text-left">
                <a
                  href="https://lamednum.coop/actions/indice-de-fragilite-numerique/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link"
                  >Je suis intéressé.e</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section__partner has-text-left">
        <div class="wrapper">
          <h2 class="is-text-blue">Ils ont aidé à créer l'indice de fragilité numérique</h2>
        </div>
        <div class="grid__images">
          <div class="item">
            <div class="img">
              <img src="../assets/part1.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/part2.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/part8.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/part3.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/part4.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/part5.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/part7.jpg" alt="partner" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/logo_mh.png" alt="Malakoff Humanis" class="img__partner" />
            </div>
          </div>
          <div class="item">
            <div class="img">
              <img src="../assets/logo_credoc.png" alt="Crédoc" class="img__partner" />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapboxInstance } from "@/mapbox";
// @ts-ignore
import { filterGeocoderResults, isRegion } from "@/utils/utils";
export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      informationDetail: {
        "competences-numeriques":
          "La capacité à utiliser le numérique est fortement liée avec l’âge et le niveau de diplôme. Les variables “part des personnes âgées” et “personnes peu ou pas diplômées” donnent un indicateur de la part de la population qui risque d’être en difficulté.",
        "acces-numeriques":
          "Pour pouvoir utiliser le numérique, il faut un équipement (dont le coût peut être élevé) et un accès à un réseau de bonne qualité (couverture en très haut débit).",
        "competences-admin":
          "Les compétences administratives sont essentielles dans l’accès au droit. Or, les plus précaires et les plus jeunes connaissent des difficultés dans l’accomplissement des démarches administratives. Le numérique vient donc renforcer des difficultés préexistantes, notamment chez ces publics.",
        "acces-information":
          "Les personnes vivant seules ont une tendance à avoir plus de difficultés avec les démarches administratives car elles bénéficient moins de l’assistance d’un proche.",
      },
      informationTitle: {
        "competences-numeriques": "Compétences numériques",
        "acces-numeriques": "Accès au numérique",
        "competences-admin": "Compétences administratives",
        "acces-information": "Accès à l'information",
      },
      isSearchedDepartement: "",
      lat: null,
      lng: null,
      searchedText: "",
      selectedInformationDetail: null,
    };
  },
  mounted() {
    this.$store.commit("INIT_GEOCODER", "home");
    mapboxInstance.geocoder!.setFilter(filterGeocoderResults);
    mapboxInstance.geocoder!.on("result", (e: any) => {
      this.lat = e.result.center[1];
      this.lng = e.result.center[0];
      this.searchedText = e.result.text;
      this.isSearchedDepartement = isRegion(e.result);
      this.trackResult(e.result.text);
    });
  },
  methods: {
    trackResult(search: string): void {
      // @ts-ignore
      this.$matomo && this.$matomo.trackSiteSearch(search, false, 1);
    },
    searchResult(): void {
      if (!this.lat && !this.lng) {
        return;
      }
      this.$store.commit("SET_SEARCH_CENTER", {
        isDepartement: this.isSearchedDepartement,
        lng: this.lng,
        lat: this.lat,
        searchedText: this.searchedText,
      });
      mapboxInstance.geocoder!.off("result", () => {});
      this.$router.push("/carte");
    },
  },
});
</script>

<style>
@font-face {
  font-family: "roboto";
  src: url("../assets/fonts/roboto-regular.eot");
  src: url("../assets/fonts/roboto-regular.eot?#iefix") format("embedded-opentype"),
    url("../assets/fonts/roboto-regular.woff") format("woff"),
    url("../assets/fonts/roboto-regular.ttf") format("truetype"),
    url("../assets/fonts/roboto-regular.svg#regular") format("svg");
}
@font-face {
  font-family: "roboto-b";
  src: url("../assets/fonts/roboto-bold-webfont.eot");
  src: url("../assets/fonts/roboto-bold-webfont.eot?#iefix") format("embedded-opentype"),
    url("../assets/fonts/roboto-bold-webfont.woff") format("woff"),
    url("../assets/fonts/roboto-bold-webfont.ttf") format("truetype"),
    url("../assets/fonts/roboto-bold-webfont.svg#robotobold") format("svg");
  font-weight: normal;
  font-style: normal;
}
body,
ul,
li,
ol,
form,
h1,
h2,
h3,
h4,
h5,
h6,
div,
span,
p {
  padding: 0;
  margin: 0;
  border: 0;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  text-size-adjust: none;
}
article,
aside,
dialog,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}
* {
  outline: none !important;
}
strong,
b {
  font-weight: normal;
  font-family: roboto;
}
ul {
  list-style-type: none;
}
body {
  font: normal 14px/24px roboto;
  color: #1e2c78;
}

body,
html {
  height: 100%;
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
  color: #1e2c78;
  outline: none;
}
img {
  border: none;
}
#wrapper {
  min-width: 320px;
  min-height: 100%;
  margin: 0 auto;
  position: relative;
}
#wrapper * {
  box-sizing: border-box;
  outline: 0;
}

/* CLASS */
.clear {
  clear: both;
  float: none !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  display: block;
}
.has-text-left {
  text-align: left;
}
.is-text-blue {
  color: #1e2c78;
}
.link {
  width: auto;
  height: 60px;
  display: inline-block;
  position: relative;
  text-decoration: none !important;
  padding: 0 30px;
}
.clr:after {
  content: "";
  display: table;
  width: 100%;
  clear: both;
}
.wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Search section */
.section__search {
  padding: 100px;
}

.txt-banner h1 {
  text-align: center;
  font-size: 40px;
  line-height: 46px;
  display: block;
  text-align: center;
  font-family: roboto-b;
  margin-bottom: 35px;
  color: #1e2c78;
}
.blc-search {
  max-width: 660px;
  margin: 0 auto;
  position: relative;
}
.blc-search .blc-chp .chp {
  border: none;
  font-size: 13px;
  font-family: roboto;
  color: #1e2c78;
  width: 100%;
  height: 54px;
  border-radius: 30px;
  box-shadow: 0px 1px 15px -3px rgba(230, 89, 36, 0.2);
  -webkit-box-shadow: 0px 1px 15px -3px rgba(230, 89, 36, 0.2);
  -moz-box-shadow: 0px 1px 15px -3px rgba(230, 89, 36, 0.2);
  padding-left: 60px;
  background-color: white;
}
.blc-search .blc-chp .search {
  border: none;
  width: 60px;
  height: 54px;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../assets/search.svg") no-repeat center;
  cursor: pointer;
}
.blc-search .blc-chp {
  position: relative;
  padding-right: 200px;
}
.blc-search .btn-submit {
  position: relative;
  height: 54px;
  border-radius: 30px;
  color: #fff;
  font-size: 22px;
  font-family: roboto-b;
  border: none;
  padding: 0 57px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #e65924;
}

.section__about {
  padding: 100px 100px 125px 100px;
}
.section__about .row .col {
  float: left;
  width: 50%;
}
.section__about h2 {
  font-size: 38px;
  line-height: 43px;
  font-family: roboto-b;
  margin-bottom: 24px;
  letter-spacing: 2px;
  position: relative;
}
.section__about h2:before {
  content: "";
  display: block;
  position: absolute;
  left: -28px;
  top: 9px;
  border-left: #e65924 solid 8px;
  height: 113px;
}
.section__about p {
  font-size: 22px;
  line-height: 25px;
  margin-bottom: 20px;
}
.section__about .img img {
  display: block;
  width: 100%;
}
.pl-40 {
  padding-left: 40px;
}
.pr-40 {
  padding-right: 40px;
}

.section__indicators {
  background-color: rgba(255, 247, 247, 0.7);
  padding: 90px;
}
.section__indicators .row .col {
  float: left;
  width: 50%;
}
.section__indicators h2 {
  font-size: 34px;
  line-height: 43px;
  font-family: roboto-b;
  margin-bottom: 19px;
  letter-spacing: 2px;
  position: relative;
  color: #e65924;
}
.section__indicators .text p {
  font-size: 22px;
  line-height: 25px;
  margin-bottom: 24px;
  color: #e65924;
}
.section__indicators .link2 {
  font-size: 22px;
  font-family: roboto-b;
  padding: 0;
  letter-spacing: 1.5px;
}

.lst-indice .item {
  float: left;
  width: 50%;
}
.lst-indice .item .content:hover {
  box-shadow: 0 1px 15px rgba(222, 85, 33, 0.3);
}
.informationDetailDescription:hover {
  box-shadow: 0 1px 15px rgba(222, 85, 33, 0.3);
}
.lst-indice .item .content {
  cursor: pointer;
  max-width: 247px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 1px 15px -3px rgba(230, 89, 36, 0.2);
  -webkit-box-shadow: 0px 1px 15px -3px rgba(230, 89, 36, 0.2);
  -moz-box-shadow: 0px 1px 15px -3px rgba(230, 89, 36, 0.2);
  border-radius: 20px;
  padding: 10px 10px;
  height: 134px;
  margin: 10px;
}
.lst-indice .item .content .ico {
  width: 29px;
  height: 29px;
  border-radius: 50px;
  box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 1px 15px -3px rgba(0, 0, 0, 0.4);
  margin: 0 auto 12px;
  display: block;
  position: relative;
}
.lst-indice .item .content .ico img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.lst-indice .item .content p {
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
}

.section__cartography {
  padding: 90px;
}
.section__cartography .row .col {
  float: left;
  width: 50%;
}
.section__cartography h2 {
  font-size: 38px;
  line-height: 43px;
  font-family: roboto-b;
  margin-bottom: 24px;
  letter-spacing: 2px;
  position: relative;
  color: #1e2c78;
}
.section__cartography h2:before {
  content: "";
  display: block;
  position: absolute;
  left: -21px;
  top: 9px;
  border-left: #e65924 solid 8px;
  height: 77px;
}
.section__cartography p {
  font-size: 22px;
  line-height: 25px;
  margin-bottom: 24px;
}

.text-r p {
  font-size: 22px;
  line-height: 29px;
  text-align: center;
  max-width: 375px;
}
.text-r {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  flex-direction: column;
}
.text-r ul li {
  display: inline-block;
  margin: 0-2px;
}

.section__visualization {
  background: url("../assets/Carto.jpg") no-repeat center;
  background-size: cover;
  padding: 140px 100px;
  position: relative;
}
.section__visualization:before {
  content: "";
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: block;
  z-index: 1;
}
.section__visualization .wrapper {
  position: relative;
  z-index: 20;
}

.section__visualization .text {
  max-width: 500px;
}
.section__visualization .col {
  width: 50%;
}
.section__visualization .text h2 {
  font-size: 38px;
  line-height: 43px;
  margin-bottom: 23px;
  font-family: roboto-b;
}
.section__visualization .text p {
  font-size: 22px;
  line-height: 25px;
  margin-bottom: 20px;
}
.section__visualization .text .link {
  position: relative;
  height: 54px;
  border-radius: 30px;
  color: #fff;
  font-size: 22px;
  font-family: roboto-b;
  border: none;
  padding: 15px 57px;
  background-color: #e65924;
}
.link {
  position: relative;
  height: 54px;
  border-radius: 30px;
  color: #fff;
  font-size: 22px;
  font-family: roboto-b;
  border: none;
  padding: 15px 57px;
  background-color: #e65924;
}

.section__use__cases {
  padding: 120px 80px;
}
.section__use__cases .text {
  margin-bottom: 30px;
  color: #1e2c78;
}
.section__use__cases .text h2 {
  font-size: 38px;
  line-height: 43px;
  font-family: roboto-b;
  letter-spacing: 3px;
  margin-bottom: 22px;
}
.section__use__cases .text p {
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 1.7px;
}

.use__cases__section .col {
  float: left;
  width: 50%;
  height: 450px;
}
.use__cases__section .item {
  padding: 25px 0 25px 0px;
  display: flex;
  align-items: center;
}
.use__cases__section .item .content {
  border-radius: 20px;
  padding: 20px 35px;
  box-shadow: 0px 3px 22px -7px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 3px 22px -7px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 22px -7px rgba(0, 0, 0, 0.2);
  height: inherit;
  position: relative;
}
.use__cases__section .item .content .profil .img {
  float: left;
  margin-right: 20px;
}
.use__cases__section .item .content .profil h3 span {
  font-size: 18px;
  font-family: roboto-b;
  display: block;
}
.use__cases__section .item .content .profil h3 {
  font-size: 13px;
  line-height: 18px;
  font-family: roboto;
  font-weight: 400;
  padding-top: 12px;
}
.use__cases__section .item .content .profil {
  margin-bottom: 40px;
}
.use__cases__section .item .content .contenu {
  text-align: center;
  color: #e65924;
}
.use__cases__section .item .content .contenu p {
  font-size: 18px;
  line-height: 24px;
  max-width: 393px;
  margin: 0 auto;
}
.use__cases__section .item .content.prof:after {
  content: '"';
  font-size: 70px;
  font-family: roboto-b;
  color: #e65924;
  position: absolute;
  right: 14px;
  bottom: 9px;
  display: block;
  width: auto;
}
.use__cases__section {
  margin: 0 auto;
}
.use__cases__section .item .col {
  float: left;
  width: 50%;
  padding: 0 20px;
}

.use__cases__section .item .content__is__right {
  position: relative;
  border-radius: 20px;
  padding: 20px 35px;
  box-shadow: 0px 3px 22px -7px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 3px 22px -7px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 22px -7px rgba(0, 0, 0, 0.2);
  min-height: 190px;
  position: relative;
  margin-bottom: 18px;
}
.use__cases__section .item .content__is__right h3 {
  text-align: center;
  display: block;
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.07em;
  color: #1e2c78;
}
.use__cases__section .item .content__is__right ul li {
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #1e2c78;
}
.use__cases__section .item .content__is__right .icon {
  width: 29px;
  height: 29px;
  border-radius: 50px;
  box-shadow: 0px 1px 22px -6px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 1px 22px -6px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 1px 22px -6px rgba(0, 0, 0, 0.4);
  margin: 0 auto 12px;
  display: block;
  position: absolute;
  top: 15px;
  left: 15px;
}
.use__cases__section .item .content__is__right .icon.close {
  background: url("../assets/close.svg") no-repeat center;
}
.use__cases__section .item .content__is__right .icon.check {
  background: url("../assets/check.svg") no-repeat center;
}

.section__more__info {
  background-color: rgba(255, 247, 247, 0.7);
  padding: 100px;
}
.section__more__info .text h2 {
  font-size: 38px;
  line-height: 43px;
  font-family: "Roboto";
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 18px;
  color: #e65924;
}
.section__more__info .text p {
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 1.7px;
  margin-bottom: 20px;
  color: #e65924;
}
.section__more__info .col {
  float: left;
  width: 50%;
}
.section__more__info .col .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.section__partner {
  padding: 50px 80px 50px 80px;
}
.section__partner h2 {
  font-size: 30px;
  line-height: 43px;
  font-family: roboto-b;
  letter-spacing: 1.7px;
  margin-bottom: 58px;
  color: #1e2c78;
}
.grid__images {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img__partner {
  width: 90%;
}
.home__geocoder .mapboxgl-ctrl-geocoder {
  min-width: 100%;
  background-color: transparent;
  box-shadow: none;
}

.home__geocoder .mapboxgl-ctrl-geocoder--icon-search {
  display: none;
}
.home__geocoder .mapboxgl-ctrl-geocoder--input {
  padding: 0;
  height: 50px;
}
.home__geocoder .mapboxgl-ctrl-geocoder--button {
  background-color: transparent;
}
.home__geocoder .mapboxgl-ctrl-geocoder--icon-close {
  margin-top: 15px;
  margin-right: 15px;
}

.txt-ftr {
  text-align: center;
}
.txt-ftr ul li {
  display: inline-block;
}
.txt-ftr ul li span,
.txt-ftr ul li a {
  font-size: 18px;
}
.txt-ftr ul li a:before {
  content: "-";
  font-size: 22px;
  margin: 0 5px;
}

.lst-indice .item .txt {
  display: none;
  text-align: center;
  margin-top: 10px;
  font: 500 16px/22px roboto;
  color: #1e2c78;
  padding: 0 15px;
}

.needs__section {
  display: flex;
  color: white;
}
.section__needs {
  padding: 40px 40px 80px 40px;
}
.needs__section .col {
  width: 50%;
  padding: 40px 40px 0px 40px;
  border-radius: 15px;
}
.needs__section__content {
  display: flex;
}

.need__content__list {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.07em;
  list-style: inside;
}
.need__content__list li {
  margin-bottom: 20px;
}
.need__section__header {
  display: flex;
  justify-content: space-between;
}
.need__section__header h3 {
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  margin-bottom: 15px;
}
.need__section__header img {
  width: 50px;
  height: 50px;
  fill: white;
}
.needs__section__content img {
  padding: 15px;
}
.section__needs .wrapper h2 {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 115%;
  color: white;
  margin-bottom: 50px;
}
.has-text-marine {
  color: #1e2c78;
}
.has-text-orange {
  color: #e4401f;
}
.informationDetailDescription {
  background-color: white;
  box-shadow: 0 1px 15px -3px rgba(230, 89, 36, 0.2);
  border-radius: 20px;
  padding: 10px 10px;
  width: 100%;
  cursor: pointer;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.informationDetailDescription .detail-title {
  font-size: 1.3em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}
@media (min-width: 1201px) {
  .wrapMenuMobile,
  .menu .vueMobile {
    display: none;
  }
  body a span,
  body a,
  span:before,
  span:after,
  a:after,
  a:before,
  .blc-search .btn-submit {
    -webkit-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    -ms-transition: all 400ms ease-in-out;
    transition: all 400ms ease-in-out;
  }

  .txt-ftr ul li a:hover {
    color: #e65924;
  }
  .menu a:hover {
    color: #e65924;
  }
  .section__indicators .link2:hover {
    color: #e65924;
  }

  .blc-search .btn-submit:hover,
  .section__visualization .text .link:hover,
  .link:hover {
    background-color: #c23400;
  }

  /*Zoom indice*/
  .lst-indice .item.active {
    width: 100%;
    pointer-events: initial;
  }
  .lst-indice .item.active .txt {
    display: block;
  }
  .lst-indice .item.active .content {
    max-width: 100%;
    height: 308px;
  }
  .lst-indice .item.siblings {
    display: none;
    pointer-events: none;
  }
  .section__indicators .text {
    padding-right: 30px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .txt-banner {
    padding: 0 40px;
  }
  .section__visualization .text .link {
    padding: 15px 20px;
  }
  .section__about .row .col,
  .section__indicators .row .col,
  .section__cartography .row .col,
  .section__more__info .col {
    float: none;
    width: 100%;
  }
  .lst-indice {
    margin-top: 40px;
  }
  .section__visualization .col {
    width: 100%;
  }
  .section__visualization {
    padding: 80px 0;
  }
  .section__visualization::before {
    width: 100%;
  }
  .section__more__info {
    padding: 60px 0;
  }
  .section__more__info .col .btn {
    height: auto;
  }
  .section__about .img img {
    max-width: 560px;
    margin: 0 auto;
  }
  .section__search,
  .section__indicators,
  .section__cartography,
  .section__use__cases,
  .section__more__info,
  .section__partner,
  .section__visualization,
  .footer {
    padding: 50px;
  }
  .map__container {
    padding: 0;
  }
  .section__about {
    padding: 50px 50px 62.5px 50px;
  }
  .needs__section {
    flex-direction: column;
  }
  .needs__section .col {
    width: 100%;
    margin-bottom: 20px;
  }
  .use__cases__section .item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .use__cases__section .item .col {
    width: 100%;
    margin: 20px;
  }
}

@media screen and (max-width: 767px) {
  h2 {
    font-size: 32px !important;
  }
  .grid__images {
    grid-template-columns: repeat(1, 1fr) !important;
  }
  .blc-search .blc-chp {
    padding-right: 0;
    text-align: center;
  }
  .blc-search .blc-chp .chp {
    text-overflow: ellipsis;
  }
  .blc-search .btn-submit {
    position: static;
    margin: 10px 0;
    display: inherit;
    margin: 10px auto;
    text-align: center;
  }
  .use__cases__section .item {
    padding: 0;
  }
  .use__cases__section .item .col {
    float: none;
    width: 100%;
    padding: 0 10px;
    margin-bottom: 20px;
    height: fit-content;
  }
  .section__needs {
    padding: 20px;
  }
  .needs__section {
    flex-direction: column;
  }
  .needs__section .col {
    width: 100%;
    padding: 20px;
  }
  .section__needs .wrapper h2 {
    margin-bottom: 22px;
  }
  .use__cases__section .item .content__is__right {
    width: 100%;
  }
  .use__cases__section .item .content.prof:after {
    top: 30px;
  }
  .use__cases__section .item .content {
    padding: 20px;
    margin-bottom: 20px;
    height: fit-content;
  }
  .use__cases__section .item .content .profil {
    margin-bottom: 40px;
  }
  .section__indicators {
    padding: 40px 0;
  }
  .section__more__info {
    padding: 0 0 40px;
  }

  map__wrapper {
    padding: 40px 0;
  }
  .section__search,
  .section__indicators,
  .section__cartography,
  .section__use__cases,
  .section__more__info,
  .section__partner,
  .section__visualization,
  .section__about,
  .footer,
  #header {
    padding: 20px;
  }
  .section__search .row .col,
  .section__indicators .row .col,
  .section__cartography .row .col,
  .section__use__cases .row .col,
  .section__more__info .row .col,
  .section__partner .row .col,
  .section__visualization .row .col,
  .section__about .row .col,
  .footer .row .col {
    width: 100%;
  }
  .use__cases__section .item {
    flex-direction: column;
  }
  .section__more__info .col .btn {
    height: 100%;
  }
  .section__visualization .text .link {
    font-size: 18px;
  }
  .lst-indice {
    display: grid;
    flex-direction: column;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15px;
  }
  .lst-indice .item {
    width: 100%;
    padding: 15px;
  }
  .lst-indice .item .content {
    margin: auto;
    margin-bottom: 10px;
  }
  .pr-40 {
    padding: 0;
  }
  .mobile__none {
    display: none;
  }
  .grid__images {
    display: flex;
    flex-wrap: wrap;
    margin: 10px;
    align-items: center;
  }
  .img__partner {
    width: 70px;
  }
}
</style>
