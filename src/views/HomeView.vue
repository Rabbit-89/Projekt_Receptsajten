<script setup>
import { ref, onMounted, computed } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import { fetchRecipes, fetchCategories } from '../services/api'
import CategoryNav from '@/components/CategoryNav.vue';
import SearchBar from '@/components/SearchBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

/* Det gamla sättet att hämta data
const recipes = ref([])

onMounted(async () => {
  try {
    recipes.value = await fetchRecipes()
  } catch (error) {
    console.error('Failed to load recipes:', error)
    recipes.value = []
  }
}) */


const searchQuery = ref("");

/* Use ref() för att lagra asynkron data */ 
const allRecipes = ref([]);
const allCategories = ref([]);

// Status for loading and error
const loading = ref(true);
const error = ref(false);


// Använda onMounted() för att aynkrona nätverksanrop och att datan hämtas i rätt timing i komponenterna. 
onMounted(async () => {
    loading.value = true;
    error.value = false;

    // Promise.all tar en array av Promises som inmatning. och det är "fetchRecipes()" och "fetchCategories()" i detta fallet.
  try {
    const [recipes, categories] = await Promise.all([
      fetchRecipes(),
      fetchCategories()
    ]);

    /*The value will get uppdated when the data is getting fetch */
    allRecipes.value = recipes;
    allCategories.value = categories;

  } catch (error) {
    console.error("Failed to load data:", error);
    error.value = true;  // sätt felstatus vid misslyckande
  } finally {
    loading.value = false;  // sätt loading till false när hämtningen är klar
  }
});

/* Filtrerings logiken, används computed() för 

*/
const filteredRecipes = computed(() => {

    const query = searchQuery.value.trim().toLowerCase();

    /*Using .value to get access to the recipes data */
    if (!query) {
        return allRecipes.value;
    }

    return allRecipes.value.filter(recipe => {

        // Search in name
        const matchName = recipe.name?.toLowerCase().includes(query) || false;  
        
        // Search in ingredients
        const ingredients = (recipe.ingredients || []).map(ing => ing.toLowerCase()).join("");
        const matchIngredients = ingredients.includes(query);


        // Search in category name
        const getCategoryName = (categoryId) => {
            if (allCategories.value.length === 0) return "";
            const category = allCategories.value.find(cat => String(cat.id) === String(categoryId));
            return category ? category.name : ""; 
        };
        const categoryName = getCategoryName(recipe.categoryId) || "";  
        const matchCategory = categoryName?.toLowerCase().includes(query) || false;

        // Search in description
        const title = recipe.name?.toLowerCase().includes(query); // använda Optional Chaining (?) för att undvika fel om name är undefined, och kontrollera egenskaper existerar innan man anropar metoder på dem.
        const description = recipe.description?.toLowerCase().includes(query) || false;

        return matchName || matchCategory || matchIngredients || title || description;
    });
    
});

const updateSearchBar = (query) => {
    searchQuery.value = query;
}


</script>

<template>
  <main class="home-container">

    <CategoryNav />

    <h1 class="page-title">All Recipes</h1>

    <SearchBar @search-update="updateSearchBar" />
    
    <!-- Show loading spinner while data is being fetched -->
    <LoadingSpinner v-if="loading" message="Loading recipes..." />
    
    <!-- Show error message if something went wrong -->
    <ErrorMessage 
      v-else-if="error" 
      title="Failed to load recipes"
      message="We couldn't load the recipes. Please try again later."
    />
    
    <!-- Show recipe grid when data is loaded successfully -->
    <div v-else class="recipe-grid"> 
      <RecipeCard 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>
  </main>

  

</template>


<style scoped>
.home-container {
  padding: 2rem 0;
}

.page-title {
  font-family: var(--font-secondary); 
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--brown-color);
}

/* Grid layout */

/* Mobile - 1 kolumn */
.recipe-grid {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 1.5rem; 
  padding: 0 1rem;
}

/* Desktop - 4 kolumner */
@media (min-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr); 
    gap: 2rem;
  }
}
</style>