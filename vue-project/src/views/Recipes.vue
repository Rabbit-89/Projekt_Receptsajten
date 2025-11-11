<script setup>
import { ref, onMounted } from 'vue'

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
    <pre>{{ recipeList }}</pre>
  </h1>

</template>

<style scoped>

</style>