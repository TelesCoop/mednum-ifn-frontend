<template>
  <header id="header">
    <div class="logo">
      <a class="logo" href="/" title="Portail de la fragilité numérique un outils de la MedNum">
        <img src="../assets/bleu.png" alt="Logo MedNum" style="max-width: 150px" />
      </a>
    </div>
    <nav class="menu">
      <ul class="menu__list">
        <li class="menu__item"> <router-link to="/carte">Cartographie </router-link></li>
        <li class="menu__item"
          ><a title="Clés de lecture" @click="scrollMeTo('reading-keys')">Clés de lecture</a>
        </li>
        <li class="menu__item"
          ><a @click="scrollMeTo('use-cases')" title="Cas d'usage">Cas d'usage</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    scrollMeTo(refName) {
      let element = document.getElementById(refName);
      let top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* HEADER */
#header {
  width: 100%;
  position: relative;
  background: linear-gradient(180deg, #fff6f6 0%, rgba(255, 247, 247, 0) 100%);
  padding: 30px;
  display: flex;
}
.logo {
  width: 20%;
  max-width: 165px;
}
.menu {
  width: 80%;
}
.menu__list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu__item {
  list-style: none;
  padding-right: 40px;
}
.menu a {
  width: auto;
  font-family: "Roboto";
  font-weight: 700;
  color: #1e2c78;
  font-size: 22px;
}
.menu > ul > li.active > a {
  color: #529f44;
}
@media only screen and (max-width: 700px) {
  .menu__list {
    text-align: right;
    flex-direction: column;
    align-items: flex-end;
  }
  .menu__item {
    padding: 5px;
  }
}
</style>
