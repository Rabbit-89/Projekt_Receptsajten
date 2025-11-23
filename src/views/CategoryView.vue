<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import RecipeCard from '@/components/RecipeCard.vue';
import CategoryNav from '@/components/CategoryNav.vue';
import recipesData from '@/data/recipes.json';

const route = useRoute()

const recipes=ref([])
const currentCategory=ref('')

onMounted(()=> {
    const categorySlug = route.params.categoryId

if (!categorySlug){
    //if no category. show all recipes
    recipes.value =recipesData
    currentCategoy.value='All Recipes'
} else{
    //filter recipes by category
    recipes.value =recipesData.filter(recipe=> recipes.categorySlug ===categorySlug)
    currentCategory.value =categorySlug
}
})
</script>

<template>
    <CategoryNav/>
    <h1>{{ formattedCategoryName }} Recipes</h1>
    <p v-if="recipes.length === 0">No recipes found for this category</p>

    <div v-else class="recipe-grid">
        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </div>
    
</template>

<style scoped>
#nav .category-active-link{
    color:var(--color-brown);
}
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin: 2rem 0;
}
</style>