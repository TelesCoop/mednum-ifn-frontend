import { MapState } from "@/store/map/types";
import { GlobalState } from "@/store/global/types";

export interface RootState {
  map: MapState;
  global: GlobalState;
}
