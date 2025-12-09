<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchRecipes, fetchCategories } from '@/services/api';
import { useRoute } from 'vue-router';
import breakfastIcon from '@/assets/icon_breakfast.svg';
import lunchIcon from '@/assets/icon_lunch.svg';
import dinnerIcon from '@/assets/icon_dinner.svg';
import dessertIcon from '@/assets/icon_dessert.svg';


const recipes = ref([])
const categoriesData = ref([])
const route = useRoute();


//Defining main categories for counting
const mainCategories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts'];

// Compute recipe counts for each main category
const categoryCounts = computed(() => {
  const counts = {
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Desserts: 0
  };

  recipes.value.forEach(recipe => {
    recipe.categories.forEach(category => {
      //this loop runs through each category of the recipe
      if (mainCategories.includes(category)) {
        counts[category]++;
      }
    });

  });
  return counts;
});

console.log('Category Counts:', categoryCounts.value);

//use computed to create categories array with recipe counts
const categories = computed(() => [
  { id: 1, name: 'Breakfast', categoriesData: 'Breakfast', recipeCount: categoryCounts.value.Breakfast, icon: breakfastIcon },
  { id: 2, name: 'Lunch', categoriesData: 'Lunch', recipeCount: categoryCounts.value.Lunch, icon: lunchIcon },
  { id: 3, name: 'Dinner', categoriesData: 'Dinner', recipeCount: categoryCounts.value.Dinner, icon: dinnerIcon },
  { id: 4, name: 'Desserts', categoriesData: 'Desserts', recipeCount: categoryCounts.value.Desserts, icon: dessertIcon },
])

//Simple total - the total number of objects/recipe objects in the recipes array
const totalRecipes = computed(() => recipes.value.length);

//Icon function based on category slug
function getCategoryIcon(categoriesData) {
  const icons = {
    Breakfast: breakfastIcon,
    Lunch: lunchIcon,
    Dinner: dinnerIcon,
    Desserts: dessertIcon
  }
  return icons[categoriesData] || breakfastIcon; //default icon, if there is a new category added without an icon
}

const loadRecipes = async () => {
  try {
    recipes.value = await fetchRecipes()
    categoriesData.value = await fetchCategories()

    console.log('Fetched recipes:', recipes.value)
    console.log('Fetched categories:', categoriesData.value)
  } catch (error) {
    console.error('Failed to load data:', error)
    recipes.value = []
    categoriesData.value = []
  }
}


onMounted(() => {
  loadRecipes();
});


</script>

<template>
  <section class="category-box">
    <h1>Categories</h1>
    <div class="category-nav">
      <router-link :to="{ name: 'home' }" :class="{ active: !route.params.categoryId }" :aria-current="route.name === 'home' ? 'page':undefined ">
        <div class="allRecipes-svg-container">
          <img src="../assets/icon_allRecipes.svg" alt="All Recipes Icon" class="allRecipes-svg"></img>
        </div>
        All Recipes
        <div class="numberOfRecipes">{{ totalRecipes }} Recipes</div>
      </router-link>

      <router-link v-for="category in categories" :key="category.id"
        :to="{ name: 'category', params: { categoryId: category.categoriesData } }" :aria-current="route.params.categoryId === category.categoriesData ? 'page':undefined ">
        <div class="category-icon">
          <!--Different icons for each category-->
          <img :src="getCategoryIcon(category.categoriesData)" :alt="category.name" class="category-svg"></img>
        </div>
        <div class="category-content">{{ category.name }}</div>
        <div class="recipeCount">{{ category.recipeCount }} Recipes</div>
      </router-link>
    </div>

  </section>
</template>

<style scoped>
h1 {
  display: flex;
  color: var(--color-black);
  font-family: Cormorant;
  font-size: 3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  justify-content: center;
  padding: .5rem;
}

/* For the All Recipes icon */
/* .allRecipes-svg-container {
  width: 10rem;
  height: auto; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
} */
.category-svg, .allRecipes-svg {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}
.category-box {
  width: 100%;
  height: auto;
  background-color: var(--light-yellow-color);
  margin: 20px 0;
  padding: 2rem;

}

.numberOfRecipes,
.recipeCount {
  font-size: 1.25rem;
  color: var(--dark-gray-color);
  font-weight: 400;
  margin-top: 0.5rem;
}

.category-nav {
  display: grid;
  /*displays the categories in 2 columns*/
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  /*Add spacing between category cards*/
  justify-content: center;
  align-items: center;
  font-family: var(--font-main);
  font-size: 1.25rem;
  height: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-nav a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: var(--color-black);
  font-family: 'Inter', sans-serif;
  font-size: 1.2em;
  padding: 1.5rem;
  transition: transform 0.2s ease;
  min-width: 150px;
}


.category-nav a:hover {
  transform: translateY(-4px);
  /* Lift effect on hover */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 5rem;
}

.category-nav a.router-link-exact-active{
    transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  border-radius: 5rem;
 }
 
@media screen and (min-width: 576px) {

h1 {
  display: flex;
  color: var(--color-black);
  font-family: Cormorant;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  justify-content: center;
  padding: .5rem;
}

  /* ... */
  .category-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
.category-nav a.router-link-exact-active{
    transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  border-radius: 5rem;
 }

}

/* Styles for medium screens (e.g.tablet, laptops) */
@media screen and (min-width: 768px) {

  /* ... */
  .category-nav {
    display: grid;
    /*displays the categories in a row*/
    grid-template-columns: repeat(3, 1fr);
  }
.category-nav a.router-link-exact-active{
    transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  border-radius: 5rem;
 }
 
}


/* Styles for large screens */
@media screen and (min-width: 1200px) {

  h1 {
  display: flex;
  color: var(--color-black);
  font-family: Cormorant;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  justify-content: center;
  padding: .5rem;
}
  /* ... */
  .category-nav {
    display: flex;
    /*displays the categories in a row*/
    grid-template-columns: repeat(2, 1fr);
  }
.category-nav a.router-link-exact-active{
    transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  border-radius: 5rem;
 }

}
</style>
