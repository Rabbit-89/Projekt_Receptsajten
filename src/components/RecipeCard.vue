<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
    recipe: {
        type: Object,
        required: true
    }
})

const ingredientsCount = computed(() => props.recipe.ingredients?.length || 0)
const rating = computed(() => {
    if (props.recipe.ratings?.length > 0) {
        const avg = props.recipe.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / props.recipe.ratings.length
        return avg.toFixed(1)
    }
    return '0'
})
</script>

<template>
    <RouterLink :to="`/recipe/${recipe.id}`" class="recipe-card-link">
    <div class="recipe-card">
        <div class="recipe-image">
            <img :src="recipe.imageUrl" :alt="recipe.title"/>
        </div>
        <div class="recipe-content">
            <h2 class="recipe-title">{{ recipe.title }}</h2>
            <div class="recipe-details">
                <span class="recipe-detail-item"> <img src="@/assets/icons/time.svg" alt="Clock" /> {{ recipe.timeInMins }} min</span>
                <span class="recipe-detail-item"> {{ ingredientsCount }} ingredients</span>
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

.recipe-detail-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.recipe-description {
  color: var(--dark-gray-color);
  line-height: 21px;
  margin: 0;
  font-size: 12px;
  flex-grow: 1;
  text-align: center;
  margin-top: 1rem;
}
</style>