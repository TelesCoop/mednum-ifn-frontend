<template>
  <div class="sidebar__container">
    <div class="navbar__logo mb-2">
      <router-link to="/"
        ><img src="@/assets/bleu.png" alt="Logo mednum" style="max-width: 172px"
      /></router-link>
      <strong class="has-text-orange" style="display: inline-block; margin-left: 10px">BETA</strong>
    </div>
    <div class="content__wrapper">
      <div id="geocoder" class="geocoder"></div>
    </div>

    <div class="seniorSwitch">
      <div @click="toggleIsSenior()" :class="isSenior ? '' : 'active'">Tous âges</div>
      <div @click="toggleIsSenior()" :class="isSenior ? 'active' : ''">Seniors</div>
    </div>

    <div class="content__wrapper" ref="filtersWrappers">
      <h3 class="title">Indicateurs</h3>
      <ul class="filters__container__panels">
        <li v-for="category in fieldCategories" class="filters__panel" :key="category.ref">
          <div
            class="filters__container__title"
            @click="isHidden[category.ref] = !isHidden[category.ref]"
          >
            <h4 class="filters__title">
              {{ category.name }}
            </h4>
            <div class="arrow down" :class="isHidden[category.ref] ? 'down' : ''"></div>
          </div>
          <div :class="isHidden[category.ref] ? 'is-closed' : 'is-open'">
            <div v-for="field in category.fieldCategories" :key="field.name" class="field">
              <template v-if="(isSenior && field.isSenior) || (!isSenior && field.isGeneral)">
                <input
                  type="checkbox"
                  v-model="field[field.filter_key]"
                  @change="
                    updateFilters({
                      [field.filter_key]: field[field.filter_key],
                    })
                  "
                />
                <label>
                  {{ field.name }}
                </label>
                <span class="field__info" :data-tooltip="field.description">
                  <img src="../assets/info.svg" class="information__source" />
                </span>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="content__wrapper">
      <div class="section__contact">
        <h3 class="title">Aller plus loin</h3>
        <a
          class="sidebar__link"
          href="https://docs.google.com/document/d/1aXBez7QCPUVGdcuyT-Bs4FkU9mVpfsTS7NdKCf1bPeM/"
          target="_blank"
        >
          > En savoir plus sur la méthode</a
        >
        <a
          class="sidebar__link"
          href="https://framaforms.org/retour-sur-le-portail-de-la-fragilite-numerique-1619525253"
          target="_blank"
        >
          > Donner votre avis sur ce portail</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// @ts-ignore
import { computeColorFromScoring } from "@/utils/colors";
import { mapboxInstance } from "@/mapbox";
import {
  FIELDS_CONFIGURATION, // @ts-ignore
} from "@/utils/sidebarData";

interface IsHidden {
  [key: string]: boolean;
}

const isHidden: IsHidden = {};
for (const category of FIELDS_CONFIGURATION) {
  isHidden[category.ref] = false;
}

export default Vue.extend({
  name: "Sidebar",
  components: {},
  data() {
    return {
      fieldCategories: FIELDS_CONFIGURATION,
      isHidden: isHidden,
    };
  },
  computed: {
    isSenior() {
      return this.$store.state.map.isSenior;
    },
  },
  methods: {
    async toggleIsSenior() {
      await this.$store.commit("TOGGLE_SENIOR");
      this.updateScore();
    },
    async updateFilters(payload: object) {
      await this.$store.commit("SET_FILTER", payload);
      this.updateScore();
    },
    updateScore() {
      this.$store
        .dispatch(
          "FETCH_SCORES",
          Object.keys(this.$store.state.map.showingCities).filter(
            (k) => this.$store.state.map.showingCities[k] === true
          )
        )
        .then((res) => {
          const scores = res.data;
          for (const [inseeCode, info] of Object.entries(scores) as any) {
            if (mapboxInstance.map?.getLayer(inseeCode)) {
              const layerProperties = computeColorFromScoring(info.score && info.score.total);
              const opacity = (info.score && info.score.total) == null ? 0 : 0.8;
              mapboxInstance.map?.setPaintProperty(inseeCode, "fill-color", layerProperties);
              mapboxInstance.map?.setPaintProperty(inseeCode, "fill-opacity", opacity);
            }
          }
          const currentInseeCode = this.$store.state.map.currentInseeCode;
          if (scores[currentInseeCode]) {
            this.$store.commit("SET_GLOBAL_SCORE", scores[currentInseeCode]);
          }
        });
    },
  },
  mounted() {},
});
</script>

<style>
.sidebar__container {
  width: calc(25vw);
  padding: 40px;
}
.navbar__logo {
  text-align: left;
}
.filters__panel,
.title {
  text-align: left;
}
.filters__panel {
  position: relative;
  margin-bottom: 10px;
}
[data-tooltip]:before {
  /* needed - do not touch */
  content: attr(data-tooltip);
  position: absolute;
  opacity: 0;

  /* customizable */
  padding: 10px;
  color: #333;
  border-radius: 10px;
  box-shadow: 2px 2px 1px silver;
}

[data-tooltip]:hover:before {
  /* needed - do not touch */
  opacity: 1;
  /* customizable */
  background: white;
  width: 200px;
  margin-top: -100px;
  margin-left: -200px;
  z-index: 9999;
}

[data-tooltip]:not([data-tooltip-persistent]):before {
  pointer-events: none;
}
.is-closed {
  height: 0;
  opacity: 0;
  display: none;
}
.is-open {
  opacity: 1;
  transition: all 0.5s ease-in;
  border-top: 2px solid #ec5732;
  margin-top: 10px;
}
.is-open h5 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.arrow::before {
  position: absolute;
  content: "";
  border-right: 2px solid #e4401f;
  border-bottom: 2px solid #e4401f;
  margin-top: -7px;
  transform: rotate(140deg);
  right: 0;
  width: 10px;
  height: 10px;
}
.information__source {
  width: 16px;
  margin-left: 5px;
  margin-top: 5px;
}
.field {
  margin-top: 10px;
  position: relative;
  width: 90%;
  color: #000000;
  font-family: Roboto;
}
.field__info {
  position: absolute;
  right: -10%;
  top: 0;
}
.arrow.down::before {
  transform: rotate(-315deg);
}
.filters__container__title {
  display: flex;
  align-items: center;
  width: 90%;
}
.filters__title {
  margin: 0px;
}
.filters__container__panels {
  list-style: none;
  padding: 0px;
  margin-bottom: 40px;
}
.section__contact {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.sidebar__link {
  text-decoration: none;
  color: #e4401f;
}
.title {
  color: #1e2c78;
  margin-bottom: 15px;
}
.content__wrapper {
  margin-top: 20px;
}
.sidebar__container .mapboxgl-ctrl-geocoder {
  width: 180px;
  border-radius: 180px;
}
.mapboxgl-ctrl-geocoder--input {
  font-size: 13px;
  line-height: 15px;
  color: #1e2c78;
  font-weight: 500;
}

@media (max-width: 767px) {
  .sidebar__container {
    width: 100%;
    padding: 0;
    order: 2;
    margin-top: -70px;
  }
  .sidebar__container .mapboxgl-ctrl-geocoder {
    position: absolute;
    top: 0;
    left: calc(50vw - 56px);
    border-radius: 5px !important;
  }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .sidebar__container {
    width: calc(40vw);
    padding: 20px;
  }
}

.seniorSwitch {
  margin-top: 20px;
  padding: 8px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.09);
  border-radius: 100px;
  background: white;
  display: inline-flex;
}
.seniorSwitch div {
  padding: 0 12px;
  color: #ec5732;
  cursor: pointer;
}
.seniorSwitch div.active {
  color: white;
  background: #ec5732;
  border-radius: 100px;
}
.field label.active {
  font-weight: bold;
}

.divisionSelection {
  text-align: left;
}
.divisionSelection div {
  cursor: pointer;
}
</style>
