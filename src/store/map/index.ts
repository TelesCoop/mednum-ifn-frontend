import { Module } from "vuex";
import { RootState } from "@/store/types";
import { MapState } from "@/store/map/types";
import { mutations } from "@/store/map/mutations";
import { actions } from "@/store/map/actions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const state: MapState = {
  activeDivision: "city",
  bounds: [],
  currentCity: "",
  currentInseeCode: "",
  filters: {
    no_thd_coverage_rate: true,
    poverty_rate: true,
    library_distance: true,
    public_service_distance: true,
    menseul_rate: true,
    fammono_rate: true,
    unemployement_rate: true,
    foreigners_rate: true,
    social_assistance_rate: true,
    older_65_rate: true,
    nscol15p_rate: true,
    older_75_rate: true,
    poverty_rate_50_plus: true,
    nscol15p_rate_50_plus: true,
    menseul_rate_50_plus: true,
    unemployement_rate_50_plus: true,
    foreigners_rate_55_plus: true,
  },
  geocoder: new MapboxGeocoder(),
  isLoadingScores: false,
  isSenior: false,
  population: 0,
  search: {
    hasSearch: false,
    isDepartement: false,
    center: null,
    searchedText: "",
  },
  score: {
    informationsAccess: 0,
    numericAccess: 0,
    numericSkills: 0,
    administrativeSkills: 0,
    total: 0,
  },
  showingCities: {} as { [key: string]: boolean },
  selectedDivision: "auto",
};
export const map: Module<MapState, RootState> = {
  state,
  mutations,
  actions,
};
