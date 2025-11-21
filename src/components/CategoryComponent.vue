<script setup>
defineProps({
  name: String,
  slug: String,
  image: String,
  count: Number
});
</script>

<template>
  <router-link
    :to="{ name: 'category', params: { categoryId: slug } }"
    class="category-item"
  >
    <img :src="image" alt="" class="category-icon" />
    <span class="category-name">{{ name }} ({{ count }})</span>
  </router-link>
</template>

<style scoped>
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  padding: 10px;
}

.category-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}

.category-name {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}
</style>

