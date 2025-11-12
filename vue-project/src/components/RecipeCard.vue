
<script setup>
import { computed } from "vue";
import defaultImage from "../assets/images/default-recipe.svg";

const { recipe } = defineProps({ recipe: Object })

const computedImage = computed(() =>
  recipe?.image ?? defaultImage
);

</script>

<template>
  <div class="recipe-card">
    <div class="recipe-image-wrapper">
      <img class="recipe-image" :src="computedImage" :alt="$props.recipe.title" />
    </div><!---
// vi kan byta med den part skriva istallt line20 to line30  för fixa image när image: null-- 
<script setup>
defineProps({
  recipe: Object,
});
</script>

<template>
  <div class="recipe-card">
    <div class="recipe-image-wrapper">
      <img class="recipe-image" :src="recipe.image" :alt="recipe.title" />
    </div>-->
    <div class="recipe-info">
      <h5 class="recipe-title">
        {{ recipe.title }}
      </h5>
      <p class="recipe-description">Ett snabbt och gott recept, perfekt att njuta som <strong>{{ recipe.category }}</strong>.</p>
      <div>
        <span class="recipe-difficulty"><strong>Difficulty: </strong>{{ recipe.difficulty }} </span>
        <span class="recipe-time"><strong> | Tid: </strong>{{ recipe.totalTime }} min</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
    max-width: 20rem;
    background-color: white;
    border-radius: 0.75rem;
    border: 1px sloid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.2s;
}
.recipe-card:hover {
    transform: translateX(3px);
}
.recipe-image-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 0.75rem;
    background-color: rgb(99, 85, 85);
}
.recipe-image {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    width: 100%;
    height: auto;
}
.recipe-info {
    padding: 1.25rem;
}
.recipe-title {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #111827;
}
.recipe-description {
    color: #6b7280;
    margin-bottom: 0.75px;
}
.recipe-meta {
    display: flex;
    gap: 1rem;
    color: #6b7280;
    font-size: 0.875rem;
}
@media (prefers-color-scheme: dark) {
    .recipe-card {
        background: #1f2937;
        border-color: #374151;
    }
    .recipe-title,
    .recipe-description,
    .recipe-meta {
        color: #f9fafb;scm-history-item:c%3A%5CUsers%5CSuzan%5Csource%5Crepos%5CProjekt_Receptsajten?%7B%22repositoryId%22%3A%22scm0%22%2C%22historyItemId%22%3A%22c93f6b7c1a400d320aad5efc6733e29ae40f7279%22%2C%22historyItemParentId%22%3A%220cfdc83bc6cdcdda6dc8d209d6edc0bb36ea549c%22%2C%22historyItemDisplayId%22%3A%22c93f6b7%22%7D
    }
}
</style>
