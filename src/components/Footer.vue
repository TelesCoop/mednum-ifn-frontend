<template>
  <footer>
    <div class="footer">
      <div class="wrapper">
        <div class="txt-ftr">
          <ul>
            <li><span> © 2021 MedNum. Tous droits réservés </span> </li>
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
  </footer>
</template>

<script>
export default {
  name: "Footer.vue",
};
</script>

<style>
footer {
  position: absolute;
  bottom: -50px;
  width: 100%;
  padding-top: 50px;
  height: 50px;
}
.footer {
  padding: 0px 0 50px;
  font-size: 22px;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #1e2c78;
}
@media screen and (max-width: 767px) {
  .footer {
    padding: 20px 0;
  }
}
</style>
