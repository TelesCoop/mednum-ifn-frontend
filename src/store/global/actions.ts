import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { GlobalState } from "@/store/global/types";

export const actions: ActionTree<GlobalState, RootState> = {
  async notify({ commit }, payload) {
    commit("SET_NOTIFICATION", payload);
    setTimeout(() => commit("SET_NOTIFICATION", { text: "", title: "", type: "" }), 10000);
  },
};
