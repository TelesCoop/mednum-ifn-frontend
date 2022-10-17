import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { map } from "@/store/map";
import { global } from "@/store/global";

import { RootState } from "@/store/types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    map,
    global,
  },
};

export default new Vuex.Store<RootState>(store);
