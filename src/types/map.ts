import {Score} from "@/store/map/types";

export interface Geometry {
  code: string;
  color: string;
  coordinates: Array<any>;
  name: string;
  type: string;
}

export interface ICityScore {
  [key: string]: number;
}
interface ScoreWithColor {
  score: number | undefined;
  color: string;
}
export interface ICityScoreWithColor{
  [key: string]: ScoreWithColor;
}
interface InfoData {
  name: string;
  population: number;
  insee_code: string;
  mh_population: number;
}
export interface ICityData {
  info: InfoData;
  score: ICityScore;
  scoreWithColor: ICityScoreWithColor;
}
export interface ICitiesScore extends Array<ICityScore> {}
export interface ILatLng {
  lat: number;
  lng: number;
}
