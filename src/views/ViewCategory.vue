<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import recipes from "../data/recipes.json";

// Importera RecipeCard
import RecipeCard from "../components/RecipeCard.vue";
import NavCategory from "@/components/NavCategory.vue";

const route = useRoute();

// Filtrera recept efter kategori
const filteredRecipes = computed(() => {
  return recipes.filter((r) => r.categorySlug === route.params.categoryId);
});

// Hämta kategori-info (bild + namn)
const categoryInfo = computed(() => {
  const first = recipes.find((r) => r.categorySlug === route.params.categoryId);
  return first
    ? {
        name:
          first.categorySlug.charAt(0).toUpperCase() +
          first.categorySlug.slice(1),
        image: first.categoryImage,
      }
    : null;
});
</script>

<template>
  <section class="category-page">
    <!-- Kategori-header -->
    <div class="category-header" v-if="categoryInfo">
      <NavCategory />

      <h1>{{ categoryInfo.name }}</h1>
    </div>

    <!-- Om inga recept hittades -->
    <div v-if="filteredRecipes.length === 0" class="no-recipes">
      <p>No recipes found.</p>
      <button class="back-btn" @click="$router.back()">&larr; Go Back</button>
    </div>

    <!-- Lista av recept med RecipeCard -->
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </section>
</template>

<style scoped>
.category-page {
  padding: 20px;
}

/* Header */
.category-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.category-top-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
  transition: transform 0.5s ease;
}

.category-top-image:hover {
  transform: scale(1.03);
}

.category-header h1 {
  font-size: 3rem;
  font-family: var(--font-secondary);
  margin-top: 10px;
}

/* Recept-lista */
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1400px;
  margin: auto;
  padding: 40px;
  background-color: var(--white-color);
}

/* No recipes */
.no-recipes {
  text-align: center;
  font-size: 1.4rem;
  color: #888;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.back-btn {
  background-color: #f7ce78;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #333;
}

.back-btn:hover {
  background-color: #e0b255;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* Responsiv justeringar */
@media screen and (max-width: 768px) {
  .category-header h1 {
    font-size: 2.2rem;
  }

  .recipe-list {
    gap: 20px;
  }
}

@media screen and (max-width: 480px) {
  .category-header h1 {
    font-size: 1.8rem;
  }

  .recipe-list {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>
