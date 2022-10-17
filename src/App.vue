<template>
  <div id="app">
    <div
      v-if="$store.state.global.notification.title"
      class="notification"
      :class="$store.state.global.notification.type"
    >
      <h2>{{ $store.state.global.notification.title }}</h2>
      <p>{{ $store.state.global.notification.text }}</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  components: {},
});
</script>

<style scoped>
.notification {
  position: fixed;
  width: 350px;
  left: calc(50vw - 175px);
  top: 150px;
  padding: 10px;
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 0 10px #424242;
}
.notification.success {
  background: limegreen;
  color: white;
}
.notification.info {
  background: #607de4;
  color: white;
}
</style>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(180deg, #fff6f6 0%, rgba(255, 247, 247, 0) 100%);
}

.mapboxgl-ctrl-geocoder {
  margin-top: 1em;
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
@media only screen and (max-width: 700px) {
  .map__container {
    flex-direction: column;
    padding: 20px;
  }
  .sidebar__container {
    width: 100%;
    padding: 0px;
  }
  .map__container {
    padding: 0;
  }
}
</style>
