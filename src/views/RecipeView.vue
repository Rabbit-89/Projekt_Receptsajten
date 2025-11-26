<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { fetchRecipeById } from '../services/api'
import Checklist from '../components/Checklist.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import RecipeHeader from '../components/RecipeHeader.vue'
import Rating from '../components/Rating.vue'

const route = useRoute()
const recipe = ref(null)
const checkedIngredients = ref(new Set())
const checkedSteps = ref(new Set())

const categoryName = computed(() => {
  if (!recipe.value || !recipe.value.categories?.length) return ''
  return recipe.value.categories[0]
})

const categorySlug = computed(() => {
  if (!recipe.value || !recipe.value.categories?.length) return ''
  return recipe.value.categories[0].toLowerCase()
})

const breadcrumbs = computed(() => {
  if (!recipe.value) return []
  return [
    { label: 'Home', to: '/' },
    { label: categoryName.value, to: `/category/${categorySlug.value}` },
    { label: recipe.value.title }
  ]
})

const ingredientsCount = computed(() => recipe.value?.ingredients?.length || 0)
const rating = computed(() => {
  if (!recipe.value) return '0'
  if (recipe.value.ratings?.length > 0) {
    const avg = recipe.value.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / recipe.value.ratings.length
    return avg.toFixed(1)
  }
  return '0'
})
const commentsCount = computed(() => recipe.value?.comments?.length || 0)

onMounted(async () => {
  const recipeId = route.params.id
  try {
    recipe.value = await fetchRecipeById(recipeId)
  } catch (error) {
    console.error('Failed to load recipe:', error)
    recipe.value = null
  }
})
</script>

<template>
  <main class="recipe-view" v-if="recipe">
    <Breadcrumbs :items="breadcrumbs" />

    <RecipeHeader
      :name="recipe.title"
      :image="recipe.imageUrl"
      :cooking-time="recipe.timeInMins"
      :ingredients-count="ingredientsCount"
      :rating="rating"
      :comments-count="commentsCount"
      :description="recipe.description"
    />

    <div class="recipe-content">
      <Checklist 
        :items="recipe.ingredients || []"
        :checked-items="checkedIngredients"
        title="Ingredients"
        list-type="unordered"
        @update:checked-items="checkedIngredients = $event"
      />

      <Checklist 
        :items="recipe.instructions || []"
        :checked-items="checkedSteps"
        title="Instructions"
        list-type="ordered"
        @update:checked-items="checkedSteps = $event"
      />
    </div>

<div class="rating-section">
      <h3>Did you enjoy cooking this meal?</h3>
      
      <Rating 
        v-model="currentRating" 
        @update:modelValue="userHasRated = true"
        class="interactive-stars"
      />

      <p v-if="userHasRated" class="thank-you-text">
        Thanks! You have given this recipe a {{ currentRating }} star rating.
      </p>
      <p v-else class="help-text">
        Please click on the stars to set your rating.
      </p>
    </div>
  </main>

  <div v-else class="recipe-not-found">
    <h2>Recipe not found</h2>
    <RouterLink to="/" class="breadcrumb-link">← Back to recipes</RouterLink>
  </div>
</template>

<style scoped>
.recipe-view {
  font-family: var(--font-main);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--light-yellow-color);
}

.recipe-content {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 1rem;
  gap: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.recipe-not-found {
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-main);
  color: var(--black-color);
}

.recipe-not-found h2 {
  color: var(--black-color);
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: var(--black-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  text-decoration: underline;
}

.breadcrumb-link:hover {
  text-decoration: none;
}

.rating-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--grey-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.rating-section h3 {
  font-family: var(--font-secondary); 
  font-size: 1.8rem;
  color: var(--black-color);
  margin: 0;
}

.interactive-stars {
  font-size: 2.5rem; 
}

.thank-you-text {
  color: var(--gold-color); 
  font-weight: bold;
  font-family: var(--font-main);
}

.help-text {
  color: var(--dark-gray-color);
  font-style: italic;
  font-size: 0.9rem;
}

/* Mobilanpassning av stjärnorna för rating */
@media (max-width: 600px) {
  .interactive-stars {
    font-size: 2rem; 
  }
}

/* Mobilanpassning av texterna över & under rating stjärnorna */
.rating-section h3 {
    font-size: 1.4rem; 
    padding: 0 10px;   
  }

  .thank-you-text, 
  .help-text {
    font-size: 0.9rem; 
    padding: 0 1rem;   
    line-height: 1.4;  
  }

  .rating-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

</style>

