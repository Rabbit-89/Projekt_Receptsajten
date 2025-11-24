<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

</script>

<template>
  <header>
    <Header />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
body {
  margin: 2rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: #2c3e50;
  line-height: 1.6;
}

/*
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

 
} */
</style>
