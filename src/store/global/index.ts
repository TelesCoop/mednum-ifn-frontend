import { Module } from "vuex";
import { RootState } from "@/store/types";
import { mutations } from "@/store/global/mutations";
import { actions } from "@/store/global/actions";
import { GlobalState } from "@/store/global/types";

const state: GlobalState = {
  hasSeenModal: false,
  notification: {
    text: "text of the notification",
    title: "",
    type: "info",
  },
  showModal: true,
  step: 0,
};
export const global: Module<GlobalState, RootState> = {
  state,
  mutations,
  actions,
};
