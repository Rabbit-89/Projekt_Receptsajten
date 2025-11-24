<script setup>
import RecipeMeta from './RecipeMeta.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  ingredientsCount: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  commentsCount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="recipe-header">
    <h1 class="recipe-name">{{ name }}</h1>
    <div class="recipe-image-container">
      <img :src="image" :alt="name" class="recipe-image" />
    </div>
    <RecipeMeta
      :cooking-time="cookingTime"
      :ingredients-count="ingredientsCount"
      :rating="rating"
      :comments-count="commentsCount"
    />
    <p class="recipe-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.recipe-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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

.recipe-description {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--font-main);
  font-size: 14px;
  color: var(--black-color);
  line-height: 22px;
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
}
</style>

