<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import { fetchRecipes } from '../services/api'
import CategoryNav from '@/components/CategoryNav.vue';

const recipes = ref([])

onMounted(async () => {
  try {
    recipes.value = await fetchRecipes()
  } catch (error) {
    console.error('Failed to load recipes:', error)
    recipes.value = []
  }
})
</script>

<template>
  <main>
    <CategoryNav/>
    <div class="recipe-list">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>

 
</template>


<style scoped>

</style>