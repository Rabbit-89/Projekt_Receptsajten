<script setup>
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import recipesData from '../data/recipes.json'
import NavCategory from '@/components/NavCategory.vue';

const recipes = ref([])

onMounted(() => {
  recipes.value = recipesData
})
</script>

<template>
  <main>
    <NavCategory/>
    
    <div class="recipe-list">
      <RecipeCard 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  padding: 40px;
  background-color: var(--white-color);
}

/* Optional: add some padding to RecipeCard for mobile */
@media screen and (max-width: 600px) {
  .recipe-list {
    grid-template-columns: 1fr; /* single column on small screens */
    gap: 15px;
  }
}

@media screen and (min-width: 601px) and (max-width: 1024px) {
  .recipe-list {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
    gap: 20px;
  }
}

@media screen and (min-width: 1025px) {
  .recipe-list {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for large screens */
    gap: 25px;
  }
}
</style>
