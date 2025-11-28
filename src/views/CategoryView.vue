<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import RecipeCard from '../components/RecipeCard.vue'
import recipesData from '../data/recipes.json'
import CategoryNav from '@/components/CategoryNav.vue';

const route = useRoute()
const recipes = ref([])

const currentCategorySlug = computed(() => route.params.categoryId)

const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    
    return recipe.categorySlug === currentCategorySlug.value
  })
})

const displayTitle = computed(() => {
  if (!currentCategorySlug.value) return ''
  return currentCategorySlug.value.charAt(0).toUpperCase() + currentCategorySlug.value.slice(1)
})

onMounted(() => {
  recipes.value = recipesData
})
</script>

<template>
  <main class="category-container">
    <CategoryNav />

    <h1 class="page-title">{{ displayTitle }}</h1>

    <div v-if="filteredRecipes.length > 0" class="recipe-grid">
      <RecipeCard 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>

    <div v-else class="no-results">
      <p>Inga recept hittades i kategorin "{{ displayTitle }}".</p>
    </div>
  </main>
</template>

<style scoped>
.category-container {
  padding: 2rem 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--brown-color);
}

.no-results {
  text-align: center;
  padding: 2rem;
  font-family: var(--font-main);
  color: var(--dark-gray-color);
  font-size: 1.2rem;
}


/* Mobil */
.recipe-grid {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 1.5rem;
  padding: 0 1rem;
}

/* Desktop */
@media (min-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr); 
    gap: 2rem;
  }
}
</style>