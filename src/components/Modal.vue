<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" style="z-index: 999">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div class="is-flex has-h-100 modal-body-content intro-modal" v-if="getStep === 0">
              <div class="is-half bg-marine is-centered is-flex is-columns pa-25 top">
                <div class="modal__title">
                  <h3>Bienvenue sur le portail de la fragilité numérique</h3></div
                >
                <img src="@/assets/modal/map.png" class="img__modal" />
                <img src="@/assets/modal/girl.svg" class="svg__modal" alt="" />
              </div>
              <div class="is-half is-centered is-flex is-columns modal__description">
                <p class="modal__description__text">
                  On vous montre comment prendre en main cette carte interactive en
                  <span class="has-text-orange">30 secondes</span> ?
                </p>

                <div class="is-flex modal__buttons is-columns">
                  <button
                    class="modal__button has-bg-orange has-text-white mb-1 no-border"
                    @click="changeStep('+')"
                    >C'est parti</button
                  >
                  <button
                    class="modal__button has-text-orange has-bg-white has-border-orange"
                    @click="switchModal"
                    >Non merci</button
                  >
                </div>
              </div>
            </div>
            <div class="is-flex has-h-100 modal-body-content" v-if="getStep === 1">
              <div
                class="is-half bg-marine has-text-white is-centered is-flex modal__step__2 intro"
              >
                <p class="has-text-white"
                  >Cette carte interactive vous permet d’identifier facilement
                  <span class="has-text-bold"
                    >les territoires avec un risque d’exclusion numérique important.</span
                  ></p
                >
              </div>
              <div
                class="is-half is-centered has-text-marine is-flex is-columns modal__step__2 bottom"
              >
                <div style="text-align: center">
                  <img
                    src="@/assets/color-palette.png"
                    class="img__indicators"
                    style="width: 237px; height: 20px"
                    alt="Palette de couleurs"
                  />
                </div>
                <p class="has-text-marine has-text-bold mb-1" style="margin-top: 20px">
                  Plus une zone tend vers le
                  <span class="has-text-orange">rouge</span>, plus sa population est susceptible
                  d'être en situation
                  <span class="has-text-orange">d'exclusion numérique.</span>
                </p>
                <div class="is-flex modal__buttons">
                  <button
                    class="modal__button small__button has-bg-orange has-text-white mb-1 no-border"
                    @click="changeStep('+')"
                    >Suivant</button
                  >
                </div>
                <div class="arrows" @click="switchModal" style="cursor: pointer">
                  <div class="arrow-left"></div>
                  <div class="arrow-right"></div>
                </div>
                <div class="steppers"> 1/4 </div>
              </div>
            </div>

            <div class="is-flex has-h-100 modal-body-content" v-if="getStep === 2">
              <div class="is-two-fifths bg-popup bg-marine has-text-white is-centered is-flex">
                <!--                <img src="@/assets/modal/popup.png" class="bg__img__modal" />-->
              </div>
              <div
                class="is-three-fifths is-centered has-text-marine is-flex is-columns modal__step__2"
              >
                <p class="has-text-marine has-text-bold mb-1">
                  <span class="has-text-orange">Cliquez sur un territoire</span>
                  pour voir le détail de son score.
                </p>
                <p class="has-text-marine mb-1"
                  >Chaque indicateur reçoit un score entre -3 et +3 en fonction la position relative
                  de ce territoire par rapport au reste de la France.
                </p>
                <p class="has-text-marine mb-1">
                  Un score plus élevé indique une vulnerabilité plus grande.
                </p>
                <div class="is-flex modal__buttons">
                  <button
                    class="modal__button small__button mr-15 has-bg-white has-text-orange mb-1 has-border-orange"
                    @click="changeStep('-')"
                  >
                    Précédent</button
                  >
                  <button
                    class="modal__button small__button has-bg-orange has-text-white mb-1 no-border"
                    @click="changeStep('+')"
                    >Suivant</button
                  >
                </div>
                <div class="arrows" @click="switchModal">
                  <div class="arrow-left"></div>
                  <div class="arrow-right"></div>
                </div>
                <div class="steppers"> 2/4 </div>
              </div>
            </div>
            <div class="is-flex has-h-100 modal-body-content" v-if="getStep === 3">
              <div class="is-two-fifths bg-filters bg-marine has-text-white is-centered is-flex">
              </div>
              <div
                class="is-three-fifths is-centered has-text-marine is-flex is-columns modal__step__2"
              >
                <p class="has-text-marine has-text-bold mb-1">
                  Vous pouvez
                  <span class="has-text-orange">décocher des indicateurs</span>
                  dans la liste pour les exclure du calcul.
                </p>
                <p class="has-text-marine has-text-bold mb-1">
                  La carte
                  <span class="has-text-orange">se met alors à jour</span> en fonction des
                  indicateurs que vous avez sélectionnés.
                </p>

                <div class="is-flex modal__buttons is-centered mt-30">
                  <button
                    class="modal__button small__button mr-15 has-bg-white has-text-orange mb-1 has-border-orange"
                    @click="changeStep('-')"
                    >Précédent</button
                  >
                  <button
                    class="modal__button small__button has-bg-orange has-text-white mb-1 no-border"
                    @click="changeStep('+')"
                    >Suivant</button
                  >
                </div>
                <div class="arrows" @click="switchModal">
                  <div class="arrow-left"></div>
                  <div class="arrow-right"></div>
                </div>
                <div class="steppers"> 3/4 </div>
              </div>
            </div>
            <div class="is-flex has-h-100 modal-body-content" v-if="getStep === 4">
              <div class="is-one-third bg-marine has-text-white is-flex modal__step__4">
                <div>
                  <p class="has-text-white has-text-bold"
                    >L’Indice de la Fragilité Numérique est un outil en cours de développement.
                  </p>
                  <p class="has-text-white has-text-bold" style="margin-top: 10px"
                    >Pour en savoir plus, consultez la méthodologie.</p
                  >
                </div>
                <img src="@/assets/modal/girl_2.svg" class="svg__modal__2" alt="" />
              </div>
              <div
                class="is-two-third is-centered has-text-marine is-flex is-columns modal__step__4"
              >
                <p class="has-text-marine mb-1">
                  Il convient, dans la mesure du possible, de recouper les informations présentées
                  sur cette carte par une enquête qualitative ou des données d’enquêtes
                  sociologiques.
                </p>
                <p class="has-text-marine mb-1">
                  Si vous avez des suggestions d’améliorations pour que cet outil vous soit plus
                  utile, merci de compléter le formulaire en bas à gauche de cette page.
                </p>

                <div class="is-flex modal__buttons is-centered">
                  <button
                    class="modal__button small__button mr-15 has-bg-white has-text-orange mb-1 has-border-orange"
                    @click="changeStep('-')"
                    >Précédent</button
                  >
                  <button
                    class="modal__button small__button has-bg-orange has-text-white mb-1 no-border"
                    @click="switchModal()"
                    >Prêt.e à l'utiliser</button
                  >
                </div>
                <div class="arrows" @click="switchModal()">
                  <div class="arrow-left"></div>
                  <div class="arrow-right"></div>
                </div>
                <div class="steppers"> 4/4 </div>
              </div>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MapContent",
  components: {},
  computed: {
    getStep: {
      get(): string {
        return this.$store.state.global.step;
      },
    },
  },
  methods: {
    switchModal() {
      this.$store.commit("SET_SEEN_MODAL");
      this.$store.commit("SET_MODAL");
    },
    changeStep(operator: string) {
      this.$store.commit("SET_STEP_NUMBER", { step: operator });
    },
  },
});
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(30, 44, 120, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 300px;
  border-radius: 6px;
}
.modal-body {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.is-flex {
  display: flex;
}
.is-half {
  width: 50%;
}
.is-two-fifths {
  width: 40%;
}
.is-three-fifths {
  width: 60%;
}
.is-one-third {
  width: 33.3333%;
}
.is-two-third {
  width: 66.66666%;
}
.is-columns {
  flex-direction: column;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.bg-marine {
  background-color: #1e2c78;
}
.svg__modal {
  position: absolute;
  bottom: 0;
  left: 10px;
  width: 120px;
}
.svg__modal__2 {
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 100px;
}
.img__modal {
  width: 210px;
  height: 110px;
  border-radius: 5px;
}
.bg__img__modal {
  width: 500px;
  height: 100%;
}
.has-h-100 {
  height: 100%;
}
.pa-25 {
  padding: 25px;
}
.is-centered {
  align-items: center;
  justify-content: center;
}
.modal__title {
  justify-content: center;
  align-items: center;
  display: flex;
}
.modal__title h3 {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: white;
  margin-bottom: 20px;
}
.modal p {
  font-family: Roboto;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: left;
}
.modal__description {
  text-align: center;
  color: #1e2c78;
  padding: 45px;
}
.bg-popup {
  background-image: url("../assets/modal/popup.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}
.bg-filters {
  background-image: url("../assets/modal/filters.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
}
.has-text-orange {
  color: #e4401f;
}
.has-text-marine {
  color: #1e2c78;
}
.has-text-white {
  color: white;
}
.has-text-bold {
  font-weight: bold;
}
.mb-1 {
  margin-bottom: 10px;
}
.modal__description__text {
  height: 45%;
}
.modal__buttons {
  display: flex;
  width: 100%;
  justify-content: center;
}
.has-bg-orange {
  background: #ff3d0d;
}
.has-bg-white {
  background-color: white;
}
.has-border-orange {
  border: 1px solid #e4401f;
}
.no-border {
  border: none;
}
.modal__button {
  border-radius: 20.5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  padding: 5px;
  cursor: pointer;
}
.small__button {
  padding: 5px 20px;
}
.steppers {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: #ff3d0d;
}
.modal__step__2 {
  padding: 80px 40px;
}
.mr-15 {
  margin-right: 15px;
}
.mt-30 {
  margin-top: 30px;
}
.is-one-quarter {
  width: 25%;
}
.is-three-quarter {
  width: 75%;
}
.modal__step__4 {
  padding: 40px;
}
.arrows {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
}
.arrow-left {
  width: 14.9px;
  height: 0px;
  float: left;
  border: 2px solid #1e2c78;
  transform: matrix(-0.71, 0.68, -0.73, -0.71, 0, 0);
}
.arrow-right {
  width: 14.9px;
  height: 0px;
  border: 2px solid #1e2c78;
  transform: matrix(-0.7, -0.69, 0.73, -0.7, 0, 0);
}
@media (max-width: 767px) {
  .is-one-third {
    width: 100%;
  }
  .modal {
    width: 350px;
    height: 450px;
  }
  .modal-body-content {
    flex-direction: column;
  }
  .modal__step__4 {
    padding: 20px;
    width: calc(100% - 40px);
  }
  .svg__modal__2 {
    display: none;
  }
  .modal__step__2 {
    width: calc(100% - 80px);
    height: 100%;
  }
  .modal__step__2.intro {
    width: calc(100% - 40px);
    padding: 20px;
  }
  .modal__step__2.bottom {
    width: calc(100% - 40px);
    padding: 20px;
  }
  .intro-modal .top,
  .intro-modal .modal__description {
    padding: 25px;
    width: calc(100% - 50px);
  }
  .intro-modal .svg__modal {
    display: none;
  }
}
</style>
