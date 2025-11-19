<script setup>
import { ref } from 'vue';

const categories = ref([
  { id: 1, name: 'Breakfast', categorySlug: 'breakfast' },
  { id: 2, name: 'Lunch', categorySlug: 'lunch' },
  { id: 3, name: 'Dinner', categorySlug: 'dinner' },
  { id: 4, name: 'Dessert', categorySlug: 'dessert' },
]);
</script>

<template>
  <section class="category-box">
 <h1>Categories</h1>
    <div class="category-nav">
      <router-link :to="{ name: 'home'}" :class="{ active: !$route.params.categoryId }">All Recipes</router-link>

      <router-link v-for="category in categories" :key="category.id"
        :to="{ name: 'category', params: { categoryId: category.categorySlug } }">
        <div class="category-icon"></div>
        <div class="category-content">{{ category.name }}{{ category.categorySlug.length }}</div>
        </router-link>
    </div>

    <!-- <ul class="list">
        <li>Breakfast</li>
        <li>Lunch</li>
        <li>Dinner</li>
        <li>Dessert</li>
    </ul> -->


  </section>
</template>

<style scoped>
h1{
 color: var(--color-black);
font-family: Cormorant;
font-size: 5rem;
font-style: normal;
font-weight: 500;
line-height: normal;
align-items: center;
justify-content: center;
}
.category-box {
  width: 100%;
  height: auto;
  background-color: #f7ce78;
  margin: 20px 0;
}

.category-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: var(--font-primary);
  height: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-nav a {
  display: flex;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 1.2em;
  flex-direction: column;
}

@media screen and (min-width: 576px) {
  /* ... */
  .category-nav{
    display:grid;
    flex-direction: column;
    grid-template-columns: repeat(2, 1fr);
  }

  
}

/* Styles for medium screens (e.g., laptops) */
@media screen and (min-width: 768px) {
  /* ... */
}

/* Styles for large screens */
@media screen and (min-width: 1200px) {
  /* ... */
}
</style>
