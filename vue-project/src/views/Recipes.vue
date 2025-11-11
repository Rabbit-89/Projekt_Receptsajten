<script setup>
import { ref, onMounted } from "vue";
import RecipeCard from "../components/RecipeCard.vue";

const recipeList = ref([]);

onMounted(() => {
  fetch("http://localhost:3000/recipes")
    .then((response) => response.json())
    .then((apiRecipes) => {
      recipeList.value = apiRecipes;
    })
    .catch((err) => console.error("Fetch error:", err));
});
</script>

<template>
  <h1>
    <!--- <pre>{{ recipeList }}</pre>-->
    Recipes
  </h1>
  <div class="recipe-list">
    <RecipeCard
      v-for="recipe in recipeList"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
</template>

<style scoped>
.recipe-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1rem;
}
@media (min-width: 640px) {
  .recipe-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .recipe-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
