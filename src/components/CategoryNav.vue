<script setup>
import { ref, computed } from 'vue';
import recipesData from '@/data/recipes.json'; //import recipes
import breakfastIcon from '@/assets/icon_breakfast.svg';
import lunchIcon from '@/assets/icon_lunch.svg';
import dinnerIcon from '@/assets/icon_dinner.svg';
import dessertIcon from '@/assets/icon_dessert.svg';


// Simple counting - Method 1
let breakfastCount = 0
let lunchCount = 0  
let dinnerCount = 0
let dessertCount = 0

for (let i = 0; i < recipesData.length; i++) {
  const recipe = recipesData[i]
  
  if (recipe.categorySlug === 'breakfast') {
    breakfastCount++
  } else if (recipe.categorySlug === 'lunch') {
    lunchCount++
  } else if (recipe.categorySlug === 'dinner') {
    dinnerCount++
  } else if (recipe.categorySlug === 'dessert') {
    dessertCount++
  }
}

const categories = ref([
  { id: 1, name: 'Breakfast', categorySlug: 'breakfast', recipeCount: breakfastCount},
  { id: 2, name: 'Lunch', categorySlug: 'lunch', recipeCount: lunchCount },
  { id: 3, name: 'Dinner', categorySlug: 'dinner', recipeCount: dinnerCount },
  { id: 4, name: 'Dessert', categorySlug: 'dessert', recipeCount: dessertCount },
]);

//Simple total - the total number of objects/recipe objects in the recipes array
const totalRecipes = recipesData.length; 

function getCategoryIcon(categorySlug){
  const icons ={
    breakfast: breakfastIcon,
    lunch: lunchIcon,
    dinner: dinnerIcon,
    dessert: dessertIcon
  }
  return icons[categorySlug]
}


</script>

<template>
  <section class="category-box">
 <h1>Categories</h1>
    <div class="category-nav">
      <router-link :to="{ name: 'home'}" :class="{ active: !$route.params.categoryId }">
        <img src="../assets/icon_allRecipes.svg" alt="All Recipes Icon"></img>
        All Recipes
         <div class="numberOfRecipes">{{ totalRecipes }} Recipes</div>
      </router-link>

      <router-link v-for="category in categories" :key="category.id"
        :to="{ name: 'category', params: { categoryId: category.categorySlug } }">
        <div class="category-icon"> 
          <!--Different icons for each category-->
          <img :src="getCategoryIcon(category.categorySlug)" :alt="category.name"></img>
        </div>
        <div class="category-content">{{ category.name }}</div>
        <div class="recipeCount">{{ category.recipeCount }} Recipes</div>
        </router-link>
    </div>

  </section>
</template>

<style scoped>
h1{
  display:flex;
 color: var(--color-black);
font-family: Cormorant;
font-size: 5rem;
font-style: normal;
font-weight: 500;
line-height: normal;
align-items: center;
justify-content: center;
padding: .5rem;
}
.category-box {
  width: 100%;
  height: auto;
  background-color: #f7ce78;
  margin: 20px 0;
  padding:2rem;

}

.numberOfRecipes{
  font-size: 1.5rem;
  color:var(--dark-gray-color);
  font-weight: 400;
}

.recipeCount {
  font-size: 1.5rem;
  color:var(--dark-gray-color);
  font-weight: 400;
}
.category-nav {
  display: grid; /*displays the categories in 2 columns*/ 
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  align-items: center;
  font-family: var(--font-main);
  font-size: 1.5rem;
  height: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-nav a {
  display: grid;
  text-decoration: none;
  color:var(--color-black);
  font-family: 'Inter', sans-serif;
  font-size: 1.2em;
  flex-direction: column;
}

@media screen and (min-width: 576px) {
  /* ... */
  .category-nav{
    display:grid;
    grid-template-columns: repeat(2, 1fr);
  }

  
}

/* Styles for medium screens (e.g., laptops) */
@media screen and (min-width: 768px) {
  /* ... */
  .category-nav{
    display:flex;/*displays the categories in a row*/ 
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Styles for large screens */
@media screen and (min-width: 1200px) {
  /* ... */
   .category-nav{
    display:flex;/*displays the categories in a row*/ 
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
