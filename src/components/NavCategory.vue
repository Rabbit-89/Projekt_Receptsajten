<script setup>
import { computed } from 'vue';
import recipes from '../data/recipes.json';
import CategoryComponent from './CategoryComponent.vue'

// Skapa unika kategorier med count
const categories = computed(() => {
  const map = new Map();

  recipes.forEach(r => {
    if (!map.has(r.categorySlug)) {
      map.set(r.categorySlug, {
        id: r.categoryId,
        name: r.categorySlug.charAt(0).toUpperCase() + r.categorySlug.slice(1),
        slug: r.categorySlug,
        image: r.categoryImage,
        count: 1
      });
    } else {
      map.get(r.categorySlug).count++;
    }
  });

  return [...map.values()];
});
</script>

<template>
  <section class="category-box">
    <h1>Categories</h1>

    <div class="category-nav">
      <CategoryComponent
        v-for="cat in categories"
        :key="cat.slug"
        :name="cat.name"
        :slug="cat.slug"
        :image="cat.image"
        :count="cat.count"
      />
    </div>
  </section>
</template>

<style scoped>
.category-box {
  background-color: var(--light-yellow-color);
  padding: 20px;
  width: 100%;
}

.category-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

/* Responsiv justeringar */
@media screen and (max-width: 768px) {
  .category-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
}

@media screen and (max-width: 480px) {
  .category-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
}
</style>
