<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import recipes from '../data/recipes.json';
import Navigation from './Navigation.vue';
import HeadImage from '@/assets/HeroImage2.png'

const route = useRoute();

// Hitta kategori-info och bild
const categoryHeaderImage = computed(() => {
  const slug = route.params.categoryId;

  if (!slug) {
    return null; // inte i kategori → använd default image
  }

  const recipe = recipes.find(r => r.categorySlug === slug);
  return recipe ? recipe.categoryImage : null;
});
</script>

<template>
  <header class="hero">
    
    <!-- Dynamiskt vald bild -->
    <img
      class="hero-image"
      :src="categoryHeaderImage || HeadImage"
      alt="Header image"
    />

    <Navigation />

    <div class="hero-content">
      <h1 v-if="!route.params.categoryId">Quick Recipes</h1>
      <h1 v-else>{{ route.params.categoryId.toUpperCase() }}</h1>

      <p v-if="!route.params.categoryId">Where fast meets flavorful</p>
      <p v-else>Delicious {{ route.params.categoryId }} recipes</p>
    </div>
  </header>
</template>

<style scoped>
h1 {
    font-family: var(--font-secondary);
    font-size: 5rem;
}

p {
    font-family: var(--font-main);
    font-size: 1.5rem;
    font-style: normal;
    line-height: 2rem;
    /* 160% */
    letter-spacing: 0.075rem;
}

.hero {
    /* margin: 2rem 0rem; */
    position: relative;
    text-align: center;
    background-color: #ececec;
    overflow: hidden;
    /* give the hero an explicit height so the absolutely positioned image fills it */
    min-height: 420px;
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Ensure the image covers the area without distortion */
    z-index: 1;
    /* Place the image behind content */
    /* border-radius: 8px; */
}

.hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3;
    /* Place the text above the image and the nav */
    color: #ffffff;
    padding: 2rem;
    height: 100%;
    margin-top: 10%;
}
</style>