import mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export interface MapState {
  activeDivision: string;
  bounds: number[];
  currentCity: string;
  currentInseeCode: string;
  filters: { [key: string]: boolean };
  isLoadingScores: boolean;
  isSenior: boolean;
  population: number;
  geocoder: MapboxGeocoder;
  score: Score;
  search: Search;
  selectedDivision: string;
  showingCities: { [key: string]: boolean };
}

export interface Search {
  hasSearch: boolean;
  isDepartement: boolean;
  center: number[] | null;
  searchedText: string;
}

export interface Score {
  informationsAccess: number;
  numericAccess: number;
  numericSkills: number;
  administrativeSkills: number;
  total: number;
}
