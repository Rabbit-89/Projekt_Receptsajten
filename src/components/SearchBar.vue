<script setup >
import { ref, computed, onMounted, watch } from "vue";
import { fetchCategories, fetchRecipes } from "../services/api";
import RecipeCard from "./RecipeCard.vue";


const searchQuery = ref("");

/* Use ref() för att lagra asynkron data */ 
const allRecipes = ref([]);
const allCategories = ref([]);

/* Status for loading and error */
const loading = ref(true);
const error = ref(false);

/*using emit to export the recipecard 
const emit = defineEmits(['update:filteredRecipes']);*/

/*Fel hantering och uploading data */
onMounted(async () => {
    loading.value = true;
    error.value = false;

  try {
    const [recipes, categories] = await Promise.all([
      fetchRecipes(),
      fetchCategories()
    ]);

    /*The value will get uppdated when the data is getting fetch */
    allRecipes.value = recipes;
    allCategories.value = categories;

  } catch (error) {
    console.error("Fel vid hämtning av datan", error);
    error.value = true;  // sätt felstatus vid misslyckande
  } finally {
    loading.value = false;  // sätt loading till false när hämtningen är klar
  }
});

/*using watch to send out the list everytime it changed 
watch(filteredRecipes, (newValue) => {
    emit('update:filteredRecipes', newValue);
},
    { immediate: true } // skicka den initiala värdet vid början
); */



const getCategoryName = (categoryId) => {
    const category = allCategories.value.find((cat) => {
        return String(cat.id) === String(categoryId);
    });
    return category ? category.name : "Okänd kategori";
}


/*Sök logiken */
const filteredRecipes = computed(() => {

    if (loading.value || error.value) {
        return [];
    }

    const query = searchQuery.value.trim().toLowerCase();

    /*Using .value to get access to the recipes data */
    if (!query) {
        return allRecipes.value;
    }

    return allRecipes.value.filter(recipe => {
        const matchName = recipe.name?.toLowerCase().includes(query) || false;
        const categoryName = getCategoryName(recipe.categoryId) || "";

        const matchCategory = categoryName?.toLowerCase().includes(query) || false;

        /*Ingredients searching */
        const title = recipe.name?.toLowerCase().includes(query);
        const ingredients = recipe.ingredients?.map(ing => ing.toLowerCase()).join("");
        const matchIngredients = ingredients.includes(query);
        const description = recipe.description?.toLowerCase().includes(query) || false;

        return matchName || matchCategory || matchIngredients || title || description;
    });
    
});

const executeSearch = () => {
    // This function is a method to handle the searchbar when the User uses the search button
    console.log("Searching for:", searchQuery.value);
};

</script >

<template>

    <form class="search-bar" @submit.prevent="executeSearch">
        
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search our recipes" class="search-input"/>
            <button type="button" class="search-icon" @click="searchQuery =''" v-if="searchQuery.length > 0" >
            &times;
            </button> 
            <span v-else class="search-icon-static">🔍</span> 
        </div>

        <button type="submit" class="search-button">
        Search
        </button>
    </form>

<div v-if="loading" class="status-message loading">Laddar recept och kategorier...</div>

  <div v-else-if="error" class="status-message error">
    ⚠️ Ett fel uppstod vid hämtning av data. Försök igen senare.
  </div>

  <!-- <RecipeCard :recipe="filteredRecipes" :loading="loading" :error="error"/> -->

</template>


<style scoped>
/* 1. Flex container för att arrangera fält och knapp */
.search-bar {
  display: flex;
  gap: 10px; 
  padding: 20px;
  max-width: 800px; 
  margin: 0 auto;
}

/* 2. Wrapper för input och ikon */
.search-container {
  flex-grow: 1; 
  position: relative;
  background-color: var(--white-color); 
  border: 1px solid var(--brown-color); 
  border-radius: 8px; 
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 3. Själva inmatningsfältet */
.search-input {
  width: 100%;
  padding: 12px 15px 12px 15px; 
  border: none;
  background-color: transparent; 
  font-size: 1rem;
  color: var(--black-color);
  box-sizing: border-box; 
}

.search-icon-static {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    pointer-events: none;
}

.search-input:focus {
  outline: none; /* Ta bort standard-focus-ramen */

}

/* 4. Sökikonen (Förstoringsglaset) */
.search-icon {
  position: absolute ;
  left: 5px; 
  top: 50%;
  transform: translateY(-50%); 
  pointer-events: none; /* Gör att klick passerar igenom till input */
  background: none;
  border: none;
  cursor: pointer;
  color: var(--white-color); 
  line-height: 1;
  padding: 0;
}

/* 5. Sökknappen */
.search-button {
  background-color: var(--gold-color); 
  color: var(--white-color);
  padding: 10px 25px;
  border: none;
  border-radius: 8px; 
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 50px; 
}

.search-button:hover {
  background-color: var(--brown-color); 
}
</style>