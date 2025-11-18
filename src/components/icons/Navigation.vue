<script>
import { RouterLink } from 'vue-router'

    export default {
        name: 'Navigation',
        components: {
            RouterLink
        }  ,
        data() {
            return {
                
            }
        }
    }
</script>

<template>
    <nav class="navbar">
  <div class="logobox">
 <img alt="Recipe Website logo" class="logo" src="/src/assets/icon_logo.svg" width="125" height="125" />
    <h2>logo</h2>
    </div>

<div class="navigation">
    <ul class="nav-links">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/categories">Categories</RouterLink></li>
        <li><RouterLink to="/recipes">Recipes</RouterLink></li>
    </ul>

    <!-- <ul class="burger-items">
<li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/categories">Categories</RouterLink></li>
        <li><RouterLink to="/recipes">Recipes</RouterLink></li>
    </ul> -->
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
  background: rgba(0, 0, 0, 0.70); /* semi-transparent so hero shows through */
  z-index: 4; /* on top of image */
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

.nav-links a.router-link-exact-active {
  color: orangered;
}

.nav-links a.router-link-exact-active:hover {
  background-color: transparent;
}

.nav-links a {
 
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid rgba(255,255,255,0.12);
  color: #ffffff;
}

nav a:first-of-type {
  border: 0;
}
.nav-links{
    list-style: none;
    display:flex;
    flex-direction:row;
}
</style>