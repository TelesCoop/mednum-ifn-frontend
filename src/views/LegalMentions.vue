<template>
  <div id="wrapper">
    <Header></Header>
    <main id="homepage">
      <div class="footer-container">
        <h3 class="footer-title">Mentions légales</h3>
        <h4>Informations sur l’éditeur du site :</h4>
        <ul class="mt-2">
          <li>Dénomination ou raison sociale : SCIC SA La MedNum</li>
          <li>Adresse du siège social : 9 rue d'Alexandrie, 75002 Paris </li>
          <li>N° RCS : 831 673</li>
          <li>N° SIREN : 831 673 892</li>
          <li>N° APE : 6202A</li>
          <li>Capital social : 62,900 euros</li>
          <li
            >Nom du directeur ou du codirecteur de la publication (au sens de l’article 93-2 de la
            loi n° 82-652 du 29 juillet 1982) : Emmanuel VANDAMME, Président du Conseil
            d’administration</li
          >
        </ul>
        <h4>Informations sur le prestataire de l'hébergement :</h4>
        <ul>
          <li>Dénomination ou raison sociale : OVHCloud</li>
          <li>Adresse du siège social : 2 rue Kellermann, 59100 Roubaix</li>
        </ul>
      </div>
    </main>
    <footer>
      <div class="footer">
        <div class="wrapper">
          <div class="txt-ftr">
            <ul>
              <li><span> © 2021 MedNum. Tous droits réservés </span> </li>
              <li>
                <router-link to="/mentions-legales">Mentions légales </router-link>
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
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
// import { MapMutations } from "@/store/map/mutations";
export default Vue.extend({
  name: "LegalMentions",
  components: {
    Header,
  },
});
</script>
<style>
.footer-container {
  text-align: left;
  margin: auto;
  max-width: 800px;
  padding: 10px;
  color: #1e2c78;
}
.footer-title {
  margin-bottom: 50px;
  font-size: 34px;
}
.footer-container ul {
  line-height: 40px;
}
.mt-2 {
  margin-bottom: 20px;
}
</style>
