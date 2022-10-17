import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// @ts-ignore
import Home from "@/views/Home.vue";
// @ts-ignore
import Map from "@/views/Map.vue";
// @ts-ignore
import LegalMentions from "@/views/LegalMentions.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mentions-legales",
    name: "LegalMentions",
    component: LegalMentions,
  },
  {
    path: "/carte",
    name: "Map",
    component: Map,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
