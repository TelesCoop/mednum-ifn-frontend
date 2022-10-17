<template>
  <div class="map__container" style="position: relative; width: 100%">
    <!-- is fetching spinner -->
    <div
      v-if="$store.state.map.isLoadingScores"
      style="
        position: absolute;
        top: calc(50% - 2.5em);
        left: 0;
        right: 0;
        height: 80px;
        z-index: 99;
      "
    >
      <div class="loadingspinner"></div>
    </div>

    <!-- SET DIVISION -->
    <div class="division-holder" @click="isDivisionSelectionDetails = !isDivisionSelectionDetails">
      <h3 class="title" style="text-align: center; margin-bottom: 4px">Découpage</h3>
      <div
        style="border-top: 2px solid #ec5732; width: 70px; margin: auto; margin-bottom: 4px"
      ></div>
      <div v-if="!isDivisionSelectionDetails" class="activeDivision">
        <div>
          {{ divisionNames[activeDivision] }}
        </div>
        <div class="arrow down division" :class="isDivisionSelectionDetails ? '' : 'down'"></div>
      </div>
      <div v-else class="divisionSelection">
        <div
          @click.stop="selectDivision('city')"
          :class="activeDivision === 'city' ? 'active' : ''"
        >
          Commune
        </div>
        <div
          @click.stop="selectDivision('epci')"
          :class="activeDivision === 'epci' ? 'active' : ''"
        >
          EPCI
        </div>
        <div
          @click.stop="selectDivision('departement')"
          :class="activeDivision === 'departement' ? 'active' : ''"
        >
          Département
        </div>
        <div
          @click.stop="selectDivision('auto')"
          :class="activeDivision === 'auto' ? 'active' : ''"
        >
          Auto
        </div>
      </div>
    </div>

    <!-- DATA POPUP -->
    <div v-if="showPopup" class="map-layover" @click="showPopup = false">
      <div v-if="showPopup" class="city-popup">
        <div class="popup__title">{{ popUpData.info.name }}</div>
        <div class="horizontal__divider"></div>
        <template v-if="isMH">
          <div class="popup__subtitle has-text-left mb-2" style="font-weight: bold"
            >Nombre d'allocataires retraite :
            {{ popUpData.info.mh_population.toLocaleString("fr") }}</div
          >
        </template>

        <div class="popup__subtitle has-text-left mb-2" style="font-weight: bold"
          >Décomposition du score</div
        >
        <ul class="popup__list">
          <template v-for="category in fieldsConfiguration">
            <template v-for="field in Object.values(category.fieldCategories)">
              <li
                :key="field.filter_key"
                v-if="(field.isSenior && isSenior) || (field.isGeneral && !isSenior)"
                class="popup__item"
                ><strong>{{ field.name }} : </strong
                >{{ scoreOrUnknown(popUpData.scoreWithColor[field.filter_key].score) }}
                <span class="dot" :class="popUpData.scoreWithColor[field.filter_key].color"></span
              ></li>
            </template>
          </template>
        </ul>
      </div>
    </div>

    <div id="map"></div>
  </div>
</template>

<script lang="ts">
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import Vue from "vue";
import {
  colorClassFromScore,
  filterGeocoderResults,
  isRegion,
  isSiteMH,
  levenshtein, // @ts-ignore
} from "@/utils/utils.js";
// @ts-ignore
import { computeColorFromScoring } from "../utils/colors";
// @ts-ignore
import { ZOOM_LEVELS } from "@/utils/constants";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  Geometry, // eslint-disable-next-line no-unused-vars
  ICityData, // eslint-disable-next-line no-unused-vars
  ICityScore, // eslint-disable-next-line no-unused-vars
  ICityScoreWithColor,
} from "@/types/map";
import { mapboxInstance } from "@/mapbox";
// @ts-ignore
import { FIELDS_CONFIGURATION } from "@/utils/sidebarData";

const BASE_API_URL = process.env.VUE_APP_BASE_API_URL || "/api";

let MAP_LISTENERS: { [key: string]: boolean } = {};
const citiesCenter: any = [
  ["Paris", [2.34, 48.85], 75101],
  ["Toulouse", [1.43, 43.6], 31555],
  ["Bordeaux", [-0.57918, 44.837789], 33063],
  ["Lyon", [4.835659, 45.764043], 69381],
  ["Marseille", [5.36978, 43.296482], 13201],
  ["Nantes", [-1.553621, 47.218371], 44109],
  ["Strasbourg", [7.74553, 48.58392], 67482],
  ["Nancy", [6.18496, 48.68439], 54395],
];
const FETCHING_DEBOUNCE = 300;

let firstLayerId: string;

export default Vue.extend({
  components: {},
  name: "Map",
  computed: {
    activeDivision() {
      return this.$store.state.map.activeDivision;
    },
    isSenior() {
      return this.$store.state.map.isSenior;
    },
  },
  methods: {
    addCircleSourceIfNotPresent(): void {
      if (mapboxInstance.map!.getSource("circles")) {
        return;
      }

      console.log("### adding circles source");
      mapboxInstance.map!.addSource("circles", {
        type: "geojson", // @ts-ignore
        data: this.mhCircleData,
      });
      mapboxInstance.map!.addLayer({
        id: "circles",
        type: "circle",
        source: "circles",
        paint: {
          "circle-color": "#8090de",
          "circle-radius": {
            property: "population_sqrt",
            stops: [
              [{ zoom: 8, value: 0 }, 0],
              [{ zoom: 8, value: 250 }, 15],
              [{ zoom: 11, value: 0 }, 0],
              [{ zoom: 11, value: 250 }, 90],
              [{ zoom: 16, value: 0 }, 0],
              [{ zoom: 16, value: 250 }, 360],
            ],
          },
          "circle-stroke-width": 1,
          "circle-stroke-color": "black",
          "circle-opacity": 0.5,
        },
      });
    },
    addGeometry(geometry: Geometry): void {
      // add source if necessary
      if (!(geometry.code in this.addedGeometries)) {
        this.addedGeometries[geometry.code] = true;
      }

      // add source if necessary
      if (mapboxInstance.map && !mapboxInstance.map.getSource(geometry.code)) {
        // @ts-ignore
        window.mapbox = mapboxInstance.map;
        const source = {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: geometry.coordinates,
            },
            properties: {},
          },
        };
        // @ts-ignore
        mapboxInstance.map.addSource(geometry.code, source);
      }

      // add city layer if necessary
      if (mapboxInstance.map && !mapboxInstance.map.getLayer(geometry.code)) {
        // Ref : https://docs.mapbox.com/mapbox-gl-js/example/geojson-layer-in-stack/
        let layers = mapboxInstance.map.getStyle().layers;
        // Find the index of the first symbol layer in the map style
        if (firstLayerId == null) {
          for (var i = 0; i < layers!.length; i++) {
            if (layers![i].type === "symbol") {
              firstLayerId = layers![i].id;
              break;
            }
          }
        }
        const layer = {
          id: geometry.code,
          type: "fill",
          source: geometry.code,
          sourceLayer: "cities_boundaries",
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.0,
            "fill-outline-color": "white",
          },
        };
        // @ts-ignore
        mapboxInstance.map.addLayer(layer, firstLayerId);
      }

      if (mapboxInstance.map!.getLayer(geometry.code)) {
        mapboxInstance.map!.setLayoutProperty(geometry.code as any, "visibility", "visible");
      }
      if (!MAP_LISTENERS[geometry.code]) {
        mapboxInstance.map!.on("click", geometry.code, () => {
          this.showPopupForInseeCode(geometry.code);
        });
        mapboxInstance.map!.on("mouseenter", geometry.code, () => {
          this.onMapHover(geometry.code);
        });
        MAP_LISTENERS[geometry.code] = true;
      }

      this.$store.commit("SET_SHOWING_CITY", {
        [geometry.code]: true,
      });
    },
    addMHPopulationToCircleFeaturesIfNotPresent(
      inseeCode: string,
      population: number,
      coordinates: Array<number>
    ) {
      // @ts-ignore
      if (this.inseeCodeHasMHCircle[inseeCode]) {
        return;
      }
      this.addCircleSourceIfNotPresent();

      this.mhCircleFeatures.push({
        // @ts-ignore
        type: "Feature", // @ts-ignore
        properties: {
          // @ts-ignore
          inseeCode: inseeCode,
          // @ts-ignore
          population_sqrt: Math.sqrt(population),
        }, // @ts-ignore
        geometry: {
          // @ts-ignore
          coordinates: coordinates, // @ts-ignore
          type: "Point",
        },
      });

      // @ts-ignore
      this.inseeCodeHasMHCircle[inseeCode] = true;
    },
    addPopup(cityData: ICityData): void {
      this.showPopup = true;
      this.popUpData = cityData;
    },
    doFetchScores() {
      if (this.$store.state.map.isLoadingScores) {
        // we're currently fetching, so we'll wait before fetching again
        setTimeout(() => this.doFetchScores(), FETCHING_DEBOUNCE);
        console.log("### we're currently fetching, so we'll wait before fetching again");
        return;
      }
      if (new Date().getTime() - this.fetchingScore.lastFetchingOrderDate < FETCHING_DEBOUNCE) {
        // there has been a more recent order, we ignore this one
        console.log("### there has been a more recent order, we ignore this one");
        return;
      }
      console.log("### alright, let's fetch");
      return this.$store
        .dispatch("FETCH_SCORES", this.fetchingScore.lastFetchingOrder.inseeCodes)
        .then((res) => {
          console.log("### done fetching");
          const inseeCodeToSelect = this.fetchingScore.lastFetchingOrder.inseeCodeToSelect;
          const inseeCodeForPopup = this.fetchingScore.lastFetchingOrder.inseeCodeForPopup;
          for (const [inseeCode, value] of Object.entries(res.data) as any) {
            if (inseeCode == inseeCodeToSelect) {
              console.log("### selecting", inseeCodeToSelect);
              this.$store.commit("SET_GLOBAL_SCORE", value);
              this.setSelectedBorder(inseeCodeToSelect);
            }
            this.updateLayer(inseeCode, value);
          }
          if (inseeCodeForPopup !== "0") {
            let cityData: ICityData = res.data[inseeCodeForPopup];
            cityData.scoreWithColor = this.normalizeCityScore(cityData.score);
            console.log("### inseeCodeForPopup ", inseeCodeForPopup, " score is", cityData);
            this.addPopup(cityData);
          }
          if (this.isMH) {
            this.updateMHCircleFeatures();
          }
        });
    },
    fetchScores(inseeCodes: Array<string>, inseeCodeToSelect = "0", inseeCodeForPopup = "0") {
      console.log("### fetchScores", inseeCodes, inseeCodeToSelect, inseeCodeForPopup);
      this.fetchingScore.lastFetchingOrder = { inseeCodes, inseeCodeToSelect, inseeCodeForPopup };
      this.fetchingScore.lastFetchingOrderDate = new Date().getTime();
      setTimeout(() => this.doFetchScores(), FETCHING_DEBOUNCE);
    },
    getCityInseeCodeFromBoundaries(geometries: any, textToFind: string): string {
      let inseeCode: null | string = "";
      let lowestScore = 99;
      for (const el of geometries) {
        let distance = levenshtein(textToFind, el.name);
        if (
          distance < lowestScore ||
          distance === 0 ||
          el.name.substr(0, textToFind.length) === textToFind
        ) {
          lowestScore = distance;
          inseeCode = el.code as any;
          if (distance === 0 || el.name.substr(0, textToFind.length) === textToFind) {
            break;
          }
        }
      }
      return inseeCode!;
    },
    getGeometries(hasSearch: boolean) {
      console.log("### get geometries", this.$store.state.map.activeDivision);
      return this.$store
        .dispatch("GET_GEOMETRIES", {
          boundaries: {
            north: this.$store.state.map.bounds[0],
            east: this.$store.state.map.bounds[1],
            south: this.$store.state.map.bounds[2],
            west: this.$store.state.map.bounds[3],
          },
        })
        .then((response) => {
          const geometries = response.data.geometries;
          this.updateGeometries(geometries);
          if (hasSearch) {
            const inseeCode = this.getCityInseeCodeFromBoundaries(
              response.data.geometries,
              this.$store.state.map.search.searchedText
            );
            return inseeCode;
          }
        });
    },
    initMap(): void {
      const hasSearch = this.$store.state.map.search.hasSearch;
      const city = citiesCenter[Math.floor(Math.random() * (citiesCenter.length - 1))];
      this.$store.commit("INIT_MAP");
      this.$store.commit("INIT_GEOCODER");
      mapboxInstance.map!.on("load", () => {
        // update map on first instance
        this.updateMapData(hasSearch, String(city[2]));

        // update map on move end
        mapboxInstance.map!.on("moveend", () => {
          console.log("### after move end", mapboxInstance.map!.getZoom());
          if (!this.isOnMapMoveDisabled) {
            this.updateMapData(this.$store.state.map.search.hasSearch);
          }
        });
      });
    },
    initGeocoderResults(): void {
      this.onResultsEvent();
    },
    normalizeCityScore(cityScore: ICityScore): ICityScoreWithColor {
      const scoreWithColor: ICityScoreWithColor = {};
      for (const [key, value] of Object.entries(cityScore) as any) {
        // @ts-ignore
        if (typeof cityScore[key] === "number") {
          // @ts-ignore
          scoreWithColor[key] = {
            color: colorClassFromScore(value),
            score: Math.round(parseFloat(value) * 10) / 10,
          };
        } else {
          scoreWithColor[key] = {
            color: colorClassFromScore(value),
            score: undefined,
          };
        }
      }
      return scoreWithColor;
    },
    onMapHover(inseeCode: string): void {
      this.setHoverBorder(inseeCode);
    },
    async onResultsEvent() {
      if (mapboxInstance.geocoder) {
        console.log("### init geocoder");
        mapboxInstance.geocoder.setFilter(filterGeocoderResults);
        mapboxInstance.geocoder.on("result", async (e: any) => {
          console.log("### on result", e, e.result.text);
          let inseeCode: string = "";
          const isDepartement = isRegion(e.result);
          this.isOnMapMoveDisabled = true;

          if (isDepartement) {
            mapboxInstance.map!.zoomTo(ZOOM_LEVELS.departement, { duration: 0 });
            await new Promise((resolve) => setTimeout(resolve, 500));
            await this.$store.dispatch("SELECT_DIVISION", "auto");
          } else {
            mapboxInstance.map!.zoomTo(ZOOM_LEVELS.city + 0.1, { duration: 0 });
            await new Promise((resolve) => setTimeout(resolve, 500));
            await this.$store.dispatch("SELECT_DIVISION", "auto");
          }

          mapboxInstance.map!.flyTo({ center: e.result.center, speed: 10 });
          await new Promise((resolve) => setTimeout(resolve, 500));

          const boundaries: number[] = e.result.bbox;
          this.$store
            .dispatch("GET_GEOMETRIES", {
              boundaries: {
                north: boundaries[3],
                east: boundaries[2],
                south: boundaries[1],
                west: boundaries[0],
              },
            })
            .then((response) => {
              if (response.data && response.data.geometries !== undefined) {
                /* here we use the Levenshtein distance to find the degrees of similarity between two chains of characters. */
                inseeCode = this.getCityInseeCodeFromBoundaries(
                  response.data.geometries,
                  e.result.text
                );
                console.log("### found insee code", inseeCode);
                if (!isDepartement) {
                  console.log("### is city, ", inseeCode);
                  this.updateMapData(false, inseeCode);
                } else {
                  console.log("### is departement, ", inseeCode);
                  this.updateMapData(false, inseeCode);
                }
                this.trackResult(e.result.text);
                this.isOnMapMoveDisabled = false;
              }
            });
        });
      } else {
        setTimeout(() => this.onResultsEvent(), 200);
      }
    },
    removeHover() {
      if (mapboxInstance.map?.getLayer("hover")) {
        mapboxInstance.map?.removeLayer("hover");
      }
    },
    scoreOrUnknown(score: number): string {
      if (score == null) {
        return "inconnu";
      }
      return String(score);
    },
    showPopupForInseeCode(inseeCode: string): void {
      console.log("Click on", inseeCode);
      this.fetchScores([inseeCode], inseeCode, inseeCode);
    },
    async selectDivision(division: String) {
      console.log("### set active division");
      this.isDivisionSelectionDetails = false;
      await this.$store.dispatch("SELECT_DIVISION", division);
      await this.updateMapData();
    },
    setHoverBorder(inseeCode: string) {
      this.removeHover();
      mapboxInstance.map!.addLayer({
        id: "hover",
        type: "line",
        source: inseeCode,
        paint: {
          "line-color": "#999",
          "line-width": 3,
        },
      });
    },
    setSelectedBorder(inseeCode: string) {
      console.log("### set border", inseeCode);
      if (mapboxInstance.map?.getLayer("selected")) {
        mapboxInstance.map?.removeLayer("selected");
      }
      mapboxInstance.map!.addLayer({
        id: "selected",
        type: "line",
        source: inseeCode,
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    },
    trackResult(search: string) {
      // @ts-ignore
      this.$matomo && this.$matomo.trackSiteSearch(search, false, 1);
    },
    updateGeometries(geometries: any): void {
      const newGeometries: { [key: string]: boolean } = {};
      for (const geometry of geometries) {
        newGeometries[geometry.code as any] = true;
        this.addGeometry(geometry);
      }
      // remove geometries that should no longer be shown
      for (const code in this.$store.state.map.showingCities) {
        if (!this.$store.state.map.showingCities[code as any]) {
          continue;
        }
        if (!(code in newGeometries) && mapboxInstance.map!.getLayer(code as any)) {
          mapboxInstance.map!.setLayoutProperty(code as any, "visibility", "none");
          this.$store.commit("SET_SHOWING_CITY", {
            [code]: false,
          });
        }
      }
    },
    updateLayer(inseeCode: string, data: any) {
      const score = data.score && data.score.total;
      if (mapboxInstance.map?.getLayer(inseeCode)) {
        const layerProperties = computeColorFromScoring(score);
        mapboxInstance.map?.setPaintProperty(inseeCode, "fill-color", layerProperties);
        const opacity = score == null ? 0 : 0.8;
        mapboxInstance.map?.setPaintProperty(inseeCode, "fill-opacity", opacity);
      }
      if (this.isMH && data.info.mh_population) {
        this.addMHPopulationToCircleFeaturesIfNotPresent(
          inseeCode,
          data.info.mh_population,
          data.info.center
        );
      }
    },
    updateMapBounds(): void {
      this.$store.commit("UPDATE_MAP_BOUNDS");
    },
    async updateMapData(hasSearch = false, inseeCodeToSelect: any = "0"): Promise<any> {
      console.log("### updateMapData, inseecode?", inseeCodeToSelect, hasSearch);
      await this.$store.dispatch("UPDATE_ACTIVE_DIVISION");
      await this.updateMapBounds();
      const foundInseeCode = await this.getGeometries(hasSearch);
      console.log("### foundInseeCode", foundInseeCode);
      if (hasSearch) {
        inseeCodeToSelect = foundInseeCode;
      }
      this.updateScore(inseeCodeToSelect);
    },
    updateMHCircleFeatures() {
      const keepFeatures = this.mhCircleFeatures.filter((feature) => {
        // @ts-ignore
        return !!this.$store.state.map.showingCities[feature.properties.inseeCode];
      });
      this.mhCircleData.features = keepFeatures;
      // @ts-ignore
      mapboxInstance.map!.getSource("circles").setData(this.mhCircleData);
    },
    updateScore(inseeCodeToSelect = "0") {
      console.log("### updateScore fetchScores", inseeCodeToSelect);
      this.fetchScores(
        Object.keys(this.$store.state.map.showingCities).filter(
          (k) => this.$store.state.map.showingCities[k] === true
        ),
        inseeCodeToSelect
      );
    },
  },
  data() {
    return {
      addedGeometries: {} as { [key: string]: boolean },
      divisionNames: {
        city: "Commune",
        epci: "EPCI",
        departement: "Département",
      },
      fetchingScore: {
        lastFetchingOrderDate: new Date().getTime() - FETCHING_DEBOUNCE,
        lastFetchingOrder: {
          inseeCodes: ["0"],
          inseeCodeForPopup: "0",
          inseeCodeToSelect: "0",
        },
      },
      inseeCodeHasMHCircle: {},
      isDivisionSelectionDetails: false,
      isMH: isSiteMH(),
      isOnMapMoveDisabled: false,
      fieldsConfiguration: FIELDS_CONFIGURATION,
      mhCircleData: {
        type: "FeatureCollection",
        features: [],
      },
      mhCircleFeatures: [],
      popUpData: {},
      showingGeometries: {} as { [key: string]: boolean },
      showPopup: false,
    };
  },

  mounted() {
    axios.get(`${BASE_API_URL}/version`).then(() => {});
    this.initMap();
    this.initGeocoderResults();
  },
  beforeDestroy() {
    this.$store.commit("SET_CURRENT_CITY", null);
    MAP_LISTENERS = {};
  },
});
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
.mb-2 {
  margin-bottom: 8px;
}
.map-layover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
}
.map-layover p {
  text-align: center;
  font-size: 26px;
  line-height: 1.5em;
}
.map__container {
  height: calc(100vh - 170px);
  width: calc(100% - 50px);
}
.popup__list {
  list-style: none;
  padding: 0;
}
.popup__item {
  text-align: left;
}
.popup__title {
  font-weight: 700;
}
.horizontal__divider {
  height: 2px;
  background-color: #e4401f;
  width: 20%;
  margin: 5px 0;
}
.mt-1 {
  margin-top: 1em;
}
.city-popup {
  padding: 10px;
  background: white;
  color: black;
  border-radius: 10px;
  user-select: none;
}
@media (max-width: 767px) {
  .map__container {
    padding: 0;
    height: 80%;
    margin-top: 70px;
    width: 100%;
  }
  .navbar__logo {
    position: absolute;
    top: 10px;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .map__container {
    width: 90%;
  }
}
@media screen and (min-width: 2559px) {
  .map__container {
    height: 850px;
  }
  .content {
    width: 70vw;
  }
}
.division-holder {
  cursor: pointer;
  background: white;
  position: absolute;
  top: 9px;
  right: 55px;
  z-index: 10;
  padding: 10px 15px;
  border-radius: 15px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  width: 98px;
}

.activeDivision {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 90%;
}

.arrow.division {
  cursor: pointer;
}
.arrow.division::before {
  right: 10px;
  margin-top: 3px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  display: inline-block;
  margin-left: 3px;
}
.dot.danger-strong {
  background-color: #d03f24;
}
.dot.danger {
  background-color: #e89981;
}
.dot.warning {
  background-color: #ecbf87;
}
.dot.neutral {
  background-color: #e5e5e5;
}
.dot.info {
  background-color: #dbf1da;
}
.dot.success {
  background-color: #b3e0b1;
}
.dot.success-strong {
  background-color: #39762e;
}
.loadingspinner {
  pointer-events: none;
  width: 5em;
  height: 5em;
  border: 0.4em solid white;
  border-top-color: #e4401f;
  border-radius: 50%;
  animation: loadingspin 1s linear infinite;
  margin: auto;
}
@keyframes loadingspin {
  100% {
    transform: rotate(360deg);
  }
}

.mapboxgl-ctrl-group button {
  height: 38px !important;
}
.mapboxgl-ctrl-zoom-in {
  /*padding-top: 10px !important;*/
}
.mapboxgl-ctrl-zoom-out {
  /*padding-bottom: 10px !important;*/
}
</style>
