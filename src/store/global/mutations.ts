import { MutationTree } from "vuex";
import { GlobalState } from "@/store/global/types";

export const mutations: MutationTree<GlobalState> = {
  SET_MODAL(state) {
    state.showModal = !state.hasSeenModal;
  },
  SET_NOTIFICATION(state, { text, title, type }) {
    state.notification.text = text;
    state.notification.title = title;
    state.notification.type = type || "success";
  },
  SET_SEEN_MODAL(state) {
    if (state.hasSeenModal) {
      if (localStorage && localStorage.getItem("hasSeenModal"))
        localStorage.removeItem("hasSeenModal");
      state.hasSeenModal = false;
    } else {
      state.hasSeenModal = true;
      if (localStorage && !localStorage.getItem("hasSeenModal"))
        localStorage.setItem("hasSeenModal", "true");
    }
  },
  SET_STEP_NUMBER(state, payload) {
    if (payload.step === "+" && state.step <= 4) state.step++;
    if (payload.step === "-" && state.step >= 0) state.step--;
  },
  SET_CHANGE_STEP_NUMBER(state, payload) {
    state.step = payload.step;
  },
};
