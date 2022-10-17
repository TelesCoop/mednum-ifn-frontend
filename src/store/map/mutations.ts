import { MutationTree } from "vuex";
import { MapState } from "@/store/map/types";
import mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { mapboxInstance } from "@/mapbox";
import { map } from "@/store/map/index";

export const mutations: MutationTree<MapState> = {
  SET_CURRENT_CITY(state, payload: string) {
    state.currentCity = payload;
  },
  SET_GLOBAL_SCORE(state, payload: any) {
    state.score.total = payload.score && payload.score.total;
    state.currentInseeCode = payload.info.insee_code;
    state.currentCity = payload.info.name;
    state.population = payload.info.population;
  },
  SET_FILTER(state, payload: object) {
    const key: string = Object.keys(payload)[0];
    // @ts-ignore
    state.filters[key] = payload[key];
  },
  SET_SEARCH_CENTER(state, payload: any) {
    state.search.hasSearch = true;
    state.search.isDepartement = payload.isDepartement;
    state.search.center = [payload.lng, payload.lat];
    state.search.searchedText = payload.searchedText;
  },
  SET_SHOWING_CITY(state, payload: any) {
    state.showingCities = Object.assign({}, state.showingCities, payload);
  },
  UPDATE_MAP_BOUNDS(state) {
    if (mapboxInstance.map) {
      const bounds = mapboxInstance.map!.getBounds();
      state.bounds = [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest()];
    }
  },
  UPDATE_BOUNDS(state, payload) {
    if (mapboxInstance.map) {
      state.bounds = [payload.north, payload.east, payload.south, payload.west];
    }
  },
  INIT_GEOCODER(state, place) {
    mapboxInstance.geocoder = new MapboxGeocoder({
      accessToken:
        "pk.eyJ1IjoibWF4aW1ldGVsZXNjb29wIiwiYSI6ImNrbHJrbWV6ajAzd20ycXB2YjZodzZ0ancifQ.VLDpa6x-j-3kh65_S-H_rA",
      types: "place, locality, district, region",
      zoom: 12,
      language: "FR",
      flyTo: {
        speed: 10,
      },
      marker: false,
      clearOnBlur: true,
      placeholder:
        place === "home"
          ? "Rechercher"
          : "Entrez le nom de la commune que vous souhaitez visualiser",
      render: (item) => {
        return item.place_name.split(",").slice(0, -1).join(",");
      },
    });
    const geocoderNode: HTMLElement = document.getElementById("geocoder")!;
    /* avoid duplicated geocoder */
    if (geocoderNode) {
      if (geocoderNode.firstChild && geocoderNode.childElementCount > 0) {
        geocoderNode.firstChild.remove();
      }
      if (place === "home") {
        mapboxInstance.geocoder.addTo(geocoderNode);
      } else {
        geocoderNode.appendChild(mapboxInstance.geocoder.onAdd(mapboxInstance.map!));
      }
    }
  },
  INIT_MAP(state) {
    /* Initialize the map */
    mapboxInstance.map = new mapbox.Map({
      container: "map",
      style: "mapbox://styles/aishwerya/ckc5ufmlw0nu11ip289o79bkl", // your map style,
      // @ts-ignore
      center: state.search.hasSearch ? state.search.center : [2, 47],
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      zoom: state.search.hasSearch ? (state.search.isDepartement ? 6 : 11) : 5,
      minZoom: 5,
      maxZoom: 13,
    });
    const nav = new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true,
    });
    mapboxInstance.map.addControl(nav);
    if (state.search.isDepartement) {
      console.log("### isDepartement, change division", mapboxInstance.map!.getZoom());
      state.activeDivision = "departement";
    }

    /* Reset the search */
    state.search.hasSearch = false;
    state.search.center = [];
  },
  SET_IS_LOADING_SCORES(state, value) {
    state.isLoadingScores = value;
  },
  SET_SELECTED_DIVISION(state, value) {
    state.selectedDivision = value;
  },
  SET_ACTIVE_DIVISION(state, value) {
    state.activeDivision = value;
  },
  TOGGLE_SENIOR(state) {
    state.isSenior = !state.isSenior;
  },
};
