import { ActionTree } from "vuex";
import { MapState } from "@/store/map/types";
import { RootState } from "@/store/types";
import axios from "axios";
import { mapboxInstance } from "@/mapbox";
// @ts-ignore
import { ZOOM_LEVELS, MAX_ZOOM_LEVELS } from "@/utils/constants";
// @ts-ignore
import { FIELDS_CONFIGURATION } from "@/utils/sidebarData";

interface IsSeniorOrGeneral {
  isGeneral: boolean;
  isSenior: boolean;
}
interface IsFilterSenior {
  [key: string]: IsSeniorOrGeneral;
}

const BASE_API_URL = process.env.VUE_APP_BASE_API_URL || "/api";
const isFilterSenior: IsFilterSenior = {};
for (const category of FIELDS_CONFIGURATION) {
  for (const fieldKey of Object.keys(category.fieldCategories)) {
    isFilterSenior[fieldKey] = {
      isGeneral: category.fieldCategories[fieldKey].isGeneral,
      isSenior: category.fieldCategories[fieldKey].isSenior,
    };
  }
}

export const actions: ActionTree<MapState, RootState> = {
  async FETCH_SCORES({ commit, state }, codes) {
    commit("SET_IS_LOADING_SCORES", true);
    const scoringUrl = `${BASE_API_URL}/scoring/${state.activeDivision}`;
    const data = await axios.get(scoringUrl, {
      params: {
        codes: codes,
        filters: Object.keys(state.filters)
          .filter((k) => state.filters[k] === true)
          .filter(
            (key) =>
              (isFilterSenior[key].isGeneral && !state.isSenior) ||
              (isFilterSenior[key].isSenior && state.isSenior)
          ),
      },
    });
    commit("SET_IS_LOADING_SCORES", false);
    return data;
  },
  async GET_GEOMETRIES({ commit, state }, payload) {
    const geometriesUrl = `${BASE_API_URL}/geometries/${state.activeDivision}/${payload.boundaries.north}/${payload.boundaries.east}/${payload.boundaries.south}/${payload.boundaries.west}`;
    return await axios.get(geometriesUrl);
  },
  async SELECT_DIVISION({ commit, dispatch }, division) {
    commit("SET_SELECTED_DIVISION", division);
    if (division === "auto") {
      dispatch("UPDATE_ACTIVE_DIVISION");
    } else {
      commit("SET_ACTIVE_DIVISION", division);
    }
  },
  async UPDATE_ACTIVE_DIVISION({ commit, dispatch, state }) {
    let division = "";
    const zoom = mapboxInstance.map!.getZoom();
    if (state.selectedDivision === "auto") {
      if (zoom > ZOOM_LEVELS.city) {
        division = "city";
      } else if (zoom > ZOOM_LEVELS.epci) {
        division = "epci";
      } else {
        division = "departement";
      }
    } else {
      division = state.selectedDivision;
    }
    if (
      (state.selectedDivision === "city" && zoom < MAX_ZOOM_LEVELS.city) ||
      (state.selectedDivision === "epci" && zoom < MAX_ZOOM_LEVELS.epci)
    ) {
      dispatch("notify", {
        title: "Découpage impossible à ce niveau de zoom",
        text: "Pour éviter d'afficher trop d'éléments, nous avons repassé le découpage en automatique",
        type: "info",
      });
      dispatch("SELECT_DIVISION", "auto");
      return;
    }

    console.log("### udpate active division, zoom=", zoom, "division=", division);
    commit("SET_ACTIVE_DIVISION", division);
  },
};
