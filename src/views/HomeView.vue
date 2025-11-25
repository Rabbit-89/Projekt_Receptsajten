<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import recipesData from '../data/recipes.json'
import CategoryNav from '@/components/CategoryNav.vue';

const recipes = ref([])

onMounted(() => {
  recipes.value = recipesData
})
</script>

<template>
  <main class="home-container">
    <CategoryNav />

    <h1 class="page-title">Alla Recept</h1>

    <div class="recipe-grid"> 
    <RecipeCard 
      v-for="recipe in recipes" 
      :key="recipe.id" 
      :recipe="recipe" 
      />
    </div>
  </main>
</template>


<style scoped>
.home-container {
  padding: 2rem 0;
}

.page-title {
  font-family: var(--font-secondary); 
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--brown-color);
}

/* Grid layout */

/* Mobile - 1 kolumn */
.recipe-grid {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 1.5rem; 
  padding: 0 1rem;
}

/* Desktop - 4 kolumner */
@media (min-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr); 
    gap: 2rem;
  }
}
</style>