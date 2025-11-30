<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import RecipeCard from '../components/RecipeCard.vue'
import { fetchRecipes } from '@/services/api';
import CategoryNav from '@/components/CategoryNav.vue';
import SearchBar from '@/components/SearchBar.vue';

const route = useRoute()
const recipes = ref([])

// Get the current category slug from the route parameters
const currentCategorySlug = computed(() => route.params.categoryId)

const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    // Check if the recipe's categories include the current category slug
    return recipe.categories.includes(currentCategorySlug.value)
  })
})

// Capitalize the first letter of the category for display
const displayTitle = computed(() => {
  if (!currentCategorySlug.value) return ''
  // Capitalize first letter
  return currentCategorySlug.value.charAt(0).toUpperCase() + currentCategorySlug.value.slice(1)
})


onMounted(async () => {
  // Fetch recipes from the API service
  recipes.value = await fetchRecipes()
})
</script>

<template>
  <main class="category-container">
    <CategoryNav />

    <h1 class="page-title">{{ displayTitle }}</h1>

    <!-- Recipe cards grid -->
    <div v-if="filteredRecipes.length > 0" class="recipe-grid">
      <RecipeCard 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>

<!-- No results message -->
    <div v-else class="no-results">
      <p>No recipes found in category "{{ displayTitle }}".</p>
    </div>
  </main>
  <SearchBar />
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

/* Styles for medium screens (e.g., laptops) */
@media screen and (min-width: 768px) {

  /* ... */
  .recipe-grid {
    grid-template-columns: repeat(2, 1fr); 
    gap: 2rem;
  }
}
/* Desktop */
@media (min-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr); 
    gap: 2rem;
  }
}
</style>