<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import recipesData from '../data/recipes.json'

const recipes = ref([])

import CategoryNav from '@/components/CategoryNav.vue';
import CategoryView from './CategoryView.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(() => {
  recipes.value = recipesData
})
</script>

<template>
  <main>
    <CategoryNav/>
    <CategoryView/>
    <div class="recipe-list">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>

 
</template>

<style scoped>

</style>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  }
</style>