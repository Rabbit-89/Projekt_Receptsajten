<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="logobox">
      <img alt="Recipe Website logo" class="logo" src="/src/assets/icon_logo.svg" width="125" height="125" />
      <h2>logo</h2>
    </div>

    <div class="nav-link">
      <RouterLink to="/">Home</RouterLink>

    
    </div>


  </nav>

</template>



<style scoped>
@media screen and (min-width: 576px) {
  /* ... */
}

/* Styles for medium screens (e.g., laptops) */
@media screen and (min-width: 768px) {
  /* ... */
}

/* Styles for large screens */
@media screen and (min-width: 1200px) {
  /* ... */
}

.navbar {
  /* position navbar absolutely inside the header so it overlays the hero image */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.70);
  /* semi-transparent so hero shows through */
  z-index: 4;
  /* on top of image */
}

.logobox {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  color: #ffffff;
}

.logo {
  margin: 0;
  width: 48px;
  height: auto;
}

.nav-link a.router-link-exact-active {
  font-family:var(--font-main);
  font-size: 1.25rem;
  text-decoration: none;
  border-bottom: 4px solid var(--orange-color);
}

.nav-link a.router-link-exact-active:hover {
  background-color: transparent;
}

.nav-link a {

  display: inline-block;
  text-decoration: none;
  font-family: var(--font-main);
  font-size: 1.25rem;
  padding: 0 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.nav-link a:hover {

  display: inline-block;
  text-decoration: none;
  font-family: var(--font-main);
  font-size: 1.25rem;
  padding: 0 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--orange-color);
}

nav a:first-of-type {
  border: 0;
}

</style>