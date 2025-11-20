<script setup>
const props = defineProps({
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
  }
})
</script>

<template>
  <div class="recipe-meta">
    <div class="meta-item">
      <img src="@/assets/icons/time.svg" alt="Clock" class="meta-icon" />
      <span>{{ cookingTime }} min</span>
    </div>
    <div class="meta-item">
      <span>{{ ingredientsCount }} ingredients</span>
    </div>
    <div class="meta-item">
      <img src="@/assets/icons/star.svg" alt="Star" class="meta-icon" />
      <span>{{ rating }}</span>
    </div>
    <div class="meta-item">
      <img src="@/assets/icons/comment.svg" alt="Comment" class="meta-icon" />
      <span>{{ commentsCount }}</span>
    </div>
  </div>
</template>

<style scoped>
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

@media (min-width: 768px) {
  .recipe-meta {
    margin-top: 1rem;
  }
}
</style>

