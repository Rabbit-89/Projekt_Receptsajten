<!--
  RecipeCard Component
  Displays a preview card for a recipe with image, title, description, and key details.
  Clicking the card navigates to the full recipe view.
-->
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
// import Rating from './Rating.vue';

// Props: recipe object containing all recipe information
const props = defineProps({
    recipe: {
        type: Object,
        required: true
    }
})

// Calculate the number of ingredients in the recipe
const ingredientsCount = computed(() => props.recipe.ingredients?.length || 0);

// En smart variabel. Varje gång ny data kommer in (t.ex. någon röstar), räknas den här koden om automatiskt så att snittbetyget alltid är uppdaterat.
const rating = computed(() => {
    if (props.recipe.ratings?.length > 0) { // Här görs en säkerhetskoll: "Finns det några betyg alls?"
        // Detta är en loop som går igenom alla betyg för att räkna ut en totalsumma
        const avg = props.recipe.ratings.reduce((sum, r) => {
            // Kolla om det är en siffra eller ett objekt 
            const ratingValue = typeof r === 'number' ? r : (r.rating || 0)
            return sum + ratingValue
        }, 0) / props.recipe.ratings.length
        return Number(avg.toFixed(1))
    }
    return '0'
})
</script>

<template>
  <!-- Clickable card that navigates to the full recipe view -->
  <RouterLink :to="`/recipe/${recipe.id}`" class="recipe-card-link">
    <div class="recipe-card">
        <div class="recipe-image">
            <img :src="recipe.imageUrl" :alt="recipe.title"/>
            <!-- Suzan Code: Fix category title display on image -
            <span class="recipe-category-title"> {{ recipe.categories[0] }}</span>-->
        </div>
        <div class="recipe-content">
            <h2 class="recipe-title">{{ recipe.title }}</h2>
            <div class="recipe-details">
                <span class="recipe-detail-item"> <img src="@/assets/icons/time.svg" alt="Clock" /> {{ recipe.timeInMins }} min</span>
                <span class="recipe-detail-item"> {{ ingredientsCount }} ingredients</span>
                
                <!-- Suzan Code: Use pipe as separator instead of ingredients count samma i Figma Design -
                <span class="pipe-tecknet-item">|</span> -->
                <span class="recipe-detail-item"> <img src="@/assets/icons/star.svg" alt="Star" /> {{ rating }}</span>
            </div>
            <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </div>
  </RouterLink>
</template>

<style scoped>
.recipe-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.recipe-card {
  font-family: var(--font-main);
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.recipe-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;  /* Suzan code: For positioning category title overlay */
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.recipe-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.recipe-content h2 {
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
}

.recipe-title {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}

.recipe-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--brown-color);
  text-align: center;
}

.pipe-tecknet-item {
  color: var(--gold-color);
  font-weight: bold;
}
.recipe-detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.recipe-description {
  color: var(--gray-color); /* changed from dark-gray-color to gray-color for better contrast */
  line-height: 21px;
  margin: 0;
  font-size: 12px;
  flex-grow: 1;
  text-align: center;
  margin-top: 1rem;
}


/* Suzan Code: fix category title on -image
.recipe-category-title {
  position: absolute;      
  bottom: 2px;             
  right: 2px;            
  background-color: var(--light-yellow-color); 
  color: var(--brown-color);     
  padding: 4px 8px;         
  border-radius: 2px;       
  font-size: 12px;          
  font-weight: 500;
  text-transform: uppercase; 
  box-shadow: 0 2px 6px rgba(0,0,0,0.3); 
  pointer-events: none;  
}*/
</style>