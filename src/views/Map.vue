<template>
  <div>
    <div class="map__wrapper">
      <span v-if="!hasSeenModal">
        <Modal v-show="showModal" />
      </span>
      <Sidebar />
      <div class="map-holder">
        <MapInformations />
        <Map />
      </div>
    </div>
    <div class="map__footer">
      <div class="wrapper">
        <div class="txt-ftr">
          <ul>
            <li><span> © 2021 MedNum. Tous droits réservés </span> </li>
            <li>
              <router-link to="/" rel="noopener noreferrer">Accueil </router-link>
            </li>
            <li>
              <router-link to="/mentions-legales" rel="noopener noreferrer"
                >Mentions légales
              </router-link>
            </li>
            <li
              ><a
                href="https://lamednum.coop/"
                target="_blank"
                rel="noopener noreferrer"
                title="Notre coopérative"
                >Notre coopérative</a
              ></li
            >
            <li
              ><a
                href="https://lamednum.coop/actions/indice-de-fragilite-numerique/"
                target="_blank"
                rel="noopener noreferrer"
                title="Notre coopérative"
                >Contact</a
              ></li
            >
          </ul>
          <div class="mt-1">
            Site réalisé avec engagement par
            <a href="https://www.telescoop.fr/" target="_blank">TelesCoop</a></div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "@/components/Map.vue";
import Sidebar from "@/components/Sidebar.vue";
import MapInformations from "@/components/MapInformations.vue";
import Modal from "@/components/Modal.vue";

export default Vue.extend({
  name: "App",
  components: {
    Map,
    Sidebar,
    MapInformations,
    Modal,
  },
  created() {
    if (localStorage.getItem("hasSeenModal")) this.$store.commit("SET_SEEN_MODAL");
  },
  computed: {
    showModal: {
      get(): boolean {
        return this.$store.state.global.showModal;
      },
    },
    hasSeenModal(): boolean {
      return this.$store.state.global.hasSeenModal;
    },
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {},
});
</script>

<style>
.map__wrapper {
  display: flex;
  overflow: hidden;
}
.mapboxgl-ctrl-geocoder {
  margin-top: 1em;
}
.map__footer {
  padding: 20px;
}
.map-holder {
  width: 100%;
  padding: 0 15px;
}
@media only screen and (min-width: 980px) and (max-width: 1199px) {
  .mapboxgl-ctrl-geocoder {
    min-width: 200px !important;
  }
  .mapboxgl-ctrl-geocoder--input {
    padding: 6px 30px;
  }
}
@media only screen and (min-width: 980px) and (max-width: 1199px) {
  .mapboxgl-ctrl-geocoder {
    min-width: 200px !important;
  }
  .mapboxgl-ctrl-geocoder--input {
    padding: 6px 30px;
  }
}
@media only screen and (max-width: 768px) {
  .map__wrapper {
    flex-direction: column;
    padding: 20px;
    align-items: center;
  }
  .map-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    height: 75vh;
  }
}
</style>
