<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import RecipeCard from '../components/RecipeCard.vue'
import { fetchRecipes, fetchCategories } from '@/services/api';
import CategoryNav from '@/components/CategoryNav.vue';
import SearchBar from '@/components/SearchBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const route = useRoute()
const recipes = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(false)
const categoryNotFound = ref(false)

// Get the current category slug from the route parameters
const currentCategorySlug = computed(() => route.params.categoryId)

// Function to check if category exists
const checkCategoryExists = (categorySlug) => {
  if (!categories.value.length || !categorySlug) return false
  // Check if the category slug exists in the categories array
  return categories.value.some(cat => {
    const categoryName = typeof cat === 'string' ? cat : cat.name || cat.slug
    return categoryName === categorySlug || 
           categoryName?.toLowerCase() === categorySlug?.toLowerCase()
  })
}

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
  loading.value = true
  error.value = false
  categoryNotFound.value = false
  
  try {
    // Fetch both recipes and categories from the API service
    const [recipesData, categoriesData] = await Promise.all([
      fetchRecipes(),
      fetchCategories()
    ])
    
    recipes.value = recipesData
    categories.value = categoriesData
    
    // Check if the category exists after fetching
    if (currentCategorySlug.value && !checkCategoryExists(currentCategorySlug.value)) {
      categoryNotFound.value = true
    }
  } catch (err) {
    console.error("Failed to load data:", err)
    error.value = true
  } finally {
    loading.value = false
  }
})

// Watch for route changes to re-check category existence
watch(() => route.params.categoryId, (newCategoryId) => {
  if (categories.value.length) {
    categoryNotFound.value = newCategoryId ? !checkCategoryExists(newCategoryId) : false
  }
})
</script>

<template>
  <main class="category-container">
    <CategoryNav />
    
    <SearchBar />

    <h1 v-if="!loading && !error && !categoryNotFound" class="page-title">{{ displayTitle }}</h1>

    <!-- Show loading spinner while data is being fetched -->
    <LoadingSpinner v-if="loading" message="Loading recipes..." />
    
    <!-- Show error message if something went wrong -->
    <ErrorMessage 
      v-else-if="error" 
      title="Failed to load recipes"
      message="We couldn't load the recipes. Please try again later."
    />
    
    <!-- Show error if category does not exist -->
    <div v-else-if="categoryNotFound" class="category-not-found">
      <p>Oops... Category does not exist.</p>
    </div>
    
    <!-- Recipe cards grid -->
    <div v-else-if="filteredRecipes.length > 0" class="recipe-grid">
      <RecipeCard 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>

    <!-- No results message (category exists but is empty) -->
    <div v-else class="no-results">
      <p>No recipes found in category "{{ displayTitle }}".</p>
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

.category-not-found {
  text-align: center;
  padding: 2rem;
  font-family: var(--font-main);
  color: var(--dark-gray-color);
  font-size: 1.2rem;
  font-weight: 600;
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