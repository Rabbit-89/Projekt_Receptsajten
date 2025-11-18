<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import recipesData from '../data/recipes.json'
import IngredientsComponent from '../components/IngredientsComponent.vue'

const route = useRoute()
const recipe = ref(null)
const checkedIngredients = ref(new Set())
const checkedSteps = ref(new Set())

const formatCategoryName = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const categoryName = computed(() => {
  if (!recipe.value) return ''
  return formatCategoryName(recipe.value.categorySlug)
})

const toggleStep = (index) => {
  const newSet = new Set(checkedSteps.value)
  if (newSet.has(index)) {
    newSet.delete(index)
  } else {
    newSet.add(index)
  }
  checkedSteps.value = newSet
}

onMounted(() => {
  const recipeId = parseInt(route.params.id)
  recipe.value = recipesData.find(r => r.id === recipeId)
})
</script>

<template>
  <main class="recipe-view" v-if="recipe">
    <nav class="breadcrumbs">
      <RouterLink to="/" class="breadcrumb-link">Home</RouterLink>
      <span class="breadcrumb-separator">></span>
      <RouterLink :to="`/category/${recipe.categorySlug}`" class="breadcrumb-link">{{ categoryName }}</RouterLink>
      <span class="breadcrumb-separator">></span>
      <span class="breadcrumb-current">{{ recipe.name }}</span>
    </nav>
    

    <div class="recipe-header">
        <h1 class="recipe-name">{{ recipe.name }}</h1>
        <div class="recipe-image-container">
            <img :src="recipe.image" :alt="recipe.name" class="recipe-image" />
        </div>
        <div class="recipe-meta">
            <div class="meta-item">
                <img src="@/assets/icons/time.svg" alt="Clock" class="meta-icon" />
                <span>{{ recipe.cookingTime }} min</span>
            </div>
            <div class="meta-item">
                <span>{{ recipe.ingredientsCount }} ingredients</span>
            </div>
            <div class="meta-item">
                <img src="@/assets/icons/star.svg" alt="Star" class="meta-icon" />
                <span>{{ recipe.rating }}</span>
            </div>
            <div class="meta-item">
                <img src="@/assets/icons/comment.svg" alt="Comment" class="meta-icon" />
                <span> 10 </span> 
                <!-- add dynamic comment count above!! -->
            </div>
        </div>
        <p class="recipe-description">{{ recipe.description }}</p>
    </div>

    <div class="recipe-content">
      <IngredientsComponent 
        :ingredients="recipe.ingredients"
        :checked-ingredients="checkedIngredients"
        @update:checked-ingredients="checkedIngredients = $event"
      />

      <div class="steps-section">
        <h2 class="section-title">Instructions</h2>
        <ol class="steps-list">
          <li 
            v-for="(step, index) in recipe.steps" 
            :key="index" 
            class="step-item"
            :class="{ 'checked': checkedSteps.has(index) }"
          >
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                :checked="checkedSteps.has(index)"
                @change="toggleStep(index)"
                class="checkbox-input"
              />
              <span class="checkbox-text">{{ step }}</span>
            </label>
          </li>
        </ol>
      </div>
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

.breadcrumbs {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-main);
  font-size: 14px;
}

.breadcrumb-link {
  color: var(--black-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  display: flex;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: underline;
}

.breadcrumb-link:hover {
  text-decoration: none;
}

.breadcrumb-separator {
  color: var(--dark-gray-color);
  margin: 0 0.25rem;
}

.breadcrumb-current {
  color: var(--black-color);
  font-weight: 500;

}

.recipe-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
}

.recipe-name {
  font-size: 36px;
  line-height: normal;
  color: var(--black-color);
  margin: 0;
  font-weight: 600;
  font-family: var(--font-secondary);
  margin-bottom: 7px;
}
.recipe-image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.recipe-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    display: block;
}

.recipe-meta {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--brown-color);
    font-size: 1rem;
}

.meta-icon {
    width: 16px;
    height: 16px;
}

.recipe-description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: var(--font-main);
    font-size: 14px;
    color: var(--black-color);
    line-height: 22px;
}


.recipe-content {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 2rem;
}

.section-title {
    font-size: 24px;
    font-family: var(--font-secondary);
    color: var(--black-color);
    margin-bottom: 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid var(--light-yellow-color);
    padding-bottom: 0.5rem;
}

.steps-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.step-item {
    transition: opacity 0.2s ease;
}

.step-item.checked {
    opacity: 0.5;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    color: var(--brown-color);
    line-height: 1.6;
}

.checkbox-input {
    width: 16px;
    height: 16px;
    min-width: 16px;
    cursor: pointer;
    accent-color: var(--gold-color);
}

.checkbox-text {
    flex: 1;
    transition: text-decoration 0.2s ease;
}

.step-item.checked .checkbox-text {
    text-decoration: line-through;
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

@media (min-width: 768px) {
    .recipe-image-container {
        height: 400px;
        order: 4;
        margin-top: 1rem;
        
    }
    .recipe-image {
        height: 400px;
        object-position: bottom;
    }

    .recipe-meta {
        margin-top: 1rem;
    }
}

@media (min-width: 1024px) {

}
</style>

