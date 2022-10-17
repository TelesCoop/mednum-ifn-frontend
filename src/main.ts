import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import store from "@/store/index";
import router from "@/router/index";
Vue.config.productionTip = false;
// @ts-ignore
import VueMatomo from "vue-matomo";
import initAnalytics from "@/analytics";

new Vue({
  store,
  router: router,
  render: (h: any) => h(App),
}).$mount("#app");

initAnalytics();
