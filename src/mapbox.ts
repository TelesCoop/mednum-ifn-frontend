import mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export interface MapInstance {
  map: mapbox.Map | null;
  geocoder: MapboxGeocoder | null;
}

export let mapboxInstance: MapInstance = {
  map: null,
  geocoder: null,
};
