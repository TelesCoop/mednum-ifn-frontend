<template>
  <div class="map__informations__wrapper">
    <div class="map__informations__scoring">
      <template v-if="currentCity">
        <div class="city-name">
          <p style="font-size: 20px; color: #1e2c78; font-weight: bold">
            {{ currentCity }}
          </p>
          <p style="font-size: 18px; min-width: 110px"> {{ cityPopulation }} hab. </p>
        </div>
        <div class="vertical-divider"></div>
        <div style="flex-grow: 3; display: flex">
          <p style="font-weight: bold; color: #1e2c78; font-size: 18px"> Fragilité numérique </p>
          <div style="padding: 0 10px; position: relative; flex-grow: 1">
            <img
              id="palette-image"
              src="../assets/color-palette.png"
              alt="couleurs de fragilité numérique"
              style="width: 100%; height: 20px"
            />
            <div>
              <img
                src="../assets/arrow-up.svg"
                :alt="'score : ' + this.$store.state.map.score.total"
                style="position: absolute"
                :title="'score : ' + this.$store.state.map.score.total"
                :style="{
                  left: arrowPositionLeft(),
                }"
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="display: flex; align-items: center; justify-content: center; flex-grow: 2">
          <p style="font-size: 22px; color: darkgrey; user-select: none"
            >Cliquez sur la carte pour afficher les détails</p
          >
        </div>
      </template>
      <div class="vertical-divider"></div>
      <div class="scoring__informations">
        <div class="instructions__container">
          <span class="has-text-orange" style="font-weight: bold; font-size: 18px"
            >Comment fonctionne cette carte ?</span
          >
          <button
            class="has-text-orange has-bg-white has-border-orange instruction__button"
            @click="switchModal"
            style="font-size: 18px; border-radius: 10px; margin-left: 10px; cursor: pointer"
            >Découvrir</button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MapContent",
  components: {},
  computed: {
    currentCity: {
      get(): string {
        return this.$store.state.map.currentCity;
      },
    },
    cityPopulation(): string {
      return Intl.NumberFormat().format(this.$store.state.map.population);
    },
    informationsAccess: {
      get(): number {
        return Math.round(this.$store.state.map.score.informationsAccess);
      },
    },
    globalIndicator: {
      get(): number {
        return Math.round(this.$store.state.map.score.total);
      },
    },
    numericAccess: {
      get(): number {
        return Math.round(this.$store.state.map.score.numericAccess);
      },
    },
    numericSkills: {
      get(): number {
        return Math.round(this.$store.state.map.score.numericSkills);
      },
    },
    administrativeSkills: {
      get(): number {
        return Math.round(this.$store.state.map.score.administrativeSkills);
      },
    },
    population: {
      get(): number {
        return Math.round(this.$store.state.map.score.population);
      },
    },
  },
  methods: {
    arrowPositionLeft() {
      const imageWidth = (document.getElementById("palette-image") || {}).clientWidth || 0;
      if (!imageWidth) {
        // if the image has not yet been loaded, re-render component some time later,
        //   so that this method will be called again
        setTimeout(() => this.$forceUpdate(), 200);
      }
      const toReturn = 3 + ((this.$store.state.map.score.total + 10) / 20) * imageWidth + "px";
      return toReturn;
    },
    switchModal() {
      this.$store.commit("SET_SEEN_MODAL");
      this.$store.commit("SET_MODAL");
      this.$store.commit("SET_CHANGE_STEP_NUMBER", { step: 1 });
    },
  },
});
</script>

<style scoped>
.map__informations__wrapper {
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: white;
  margin-right: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.07);
  border-radius: 11px;
  text-align: left;
  padding: 25px;
  font-size: 12px;
}

.map__informations__localization h3 {
  text-align: left;
}
.map__informations__scoring {
  display: flex;
  align-items: center;
  width: 100%;
}

.vertical-divider {
  width: 2px;
  display: block;
  background-color: #e5e5e5;
  margin: 0 15px 0 15px;
  height: 100%;
}

.scoring__informations {
  min-width: 375px;
}
.city-name {
  min-width: 180px;
}

[data-tooltip]:not([data-tooltip-persistent]):before {
  pointer-events: none;
}
@media only screen and (max-width: 768px) {
  .map__informations__wrapper {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 1100px) {
  .scoring__informations {
    flex-grow: 2;
    min-width: 200px;
  }

  .map__informations__wrapper {
    padding: 12.5px;
  }
  .vertical-divider {
    margin: 10px;
  }
}
</style>
