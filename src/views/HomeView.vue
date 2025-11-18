<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import recipesData from '../data/recipes.json'

const recipes = ref([])

onMounted(() => {
  recipes.value = recipesData
})
</script>

<template>
  <main>
    <div class="recipe-list">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>
</template>

<style scoped>

</style>
