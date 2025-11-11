<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue';

const recipeList = ref([]);

onMounted(() => {
      fetch('http://localhost:3000/recipes')
      .then((response) => response.json())
      .then(apiRecipes => {
        recipeList.value = apiRecipes
      })
      .catch(err => console.error('Fetch error:', err));
})
</script>

<template>
  <h1>
   <!--- <pre>{{ recipeList }}</pre>-->
   Recipes
  </h1>
  <div>
    <RecipeCard v-for="recipe in recipeList" :key="recipe.id" :recipe="recipe"/>
  </div>

</template>

<style scoped>

</style>