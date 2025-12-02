<!--
  RecipeView Component
  Displays the full details of a single recipe including ingredients, instructions,
  rating and comments. (TBD: Add comments)
-->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { fetchRecipeById } from "../services/api";
import Checklist from "../components/Checklist.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import RecipeHeader from "../components/RecipeHeader.vue";
import Rating from "../components/Rating.vue";
import Comment from '../components/Comment.vue'

// --- EXISTING LOGIC ---
const route = useRoute();
const recipe = ref(null);
const checkedIngredients = ref(new Set());
const checkedSteps = ref(new Set());

const categoryName = computed(() => {
  if (!recipe.value || !recipe.value.categories?.length) return "";
  return recipe.value.categories[0];
});

const categorySlug = computed(() => {
  if (!recipe.value || !recipe.value.categories?.length) return "";
  return recipe.value.categories[0].toLowerCase();
});

const breadcrumbs = computed(() => {
  if (!recipe.value) return [];
  return [
    { label: "Home", to: "/" },
    { label: categoryName.value, to: `/categories/${categorySlug.value}` },
    { label: recipe.value.title },
  ];
});

const ingredientsCount = computed(() => recipe.value?.ingredients?.length || 0);

const rating = computed(() => {
  if (!recipe.value) return "0";
  if (recipe.value.ratings?.length > 0) {
    const avg =
      recipe.value.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) /
      recipe.value.ratings.length;
    return avg.toFixed(1);
  }
  return "0";
});

const commentsCount = computed(() => recipe.value?.comments?.length || 0);

onMounted(async () => {
  const recipeId = route.params.id;
  try {
    recipe.value = await fetchRecipeById(recipeId);
    if (!recipe.value.comments) recipe.value.comments = [];
  } catch (error) {
    console.error("Failed to load recipe:", error);
    recipe.value = null;
  }
});

const currentRating = ref(0);
const userHasRated = ref(false);

// --- COMMENT FORM ---
const newName = ref("");
const newText = ref("");
const thanks = ref(false);

const addComment = () => {
  const name = newName.value.trim();
  const text = newText.value.trim();

  if (!name || !text) {
    alert("Please fill in the required fields: Name and Comment");
    return;
  }

  const newComment = {
    author: name,
    text: text,
    date: new Date().toISOString(),
    replies: []
  };

  if (!recipe.value.comments) recipe.value.comments = [];
  recipe.value.comments.push(newComment);

  // Reset form fields
  newName.value = "";
  newText.value = "";

  // Show thank you message
  thanks.value = true;
  setTimeout(() => {
    thanks.value = false;
  }, 3000);
};
</script>

<template>
  <main class="recipe-view" v-if="recipe">
    <!-- Breadcrumbs -->
    <Breadcrumbs :items="breadcrumbs" />

    <!-- Recipe header -->
    <RecipeHeader
      :name="recipe.title"
      :image="recipe.imageUrl"
      :cooking-time="recipe.timeInMins"
      :ingredients-count="ingredientsCount"
      :rating="rating"
      :comments-count="commentsCount"
      :description="recipe.description"
    />

    <!-- Recipe content -->
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

    <!-- Rating section -->
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

    <!-- Comment form -->
    <div class="add-comment">
      <h3>Leave a comment</h3>
      <label>
        Name 
      </label>
      <input v-model="newName" type="text" placeholder="Type your name" />

      <label>
        Comment
      </label>
      <textarea v-model="newText" rows="4" placeholder="Type your comment"></textarea>

      <button @click="addComment">Send Comment</button>

      <p v-if="thanks" class="thanks-text">Thanks for your comment!</p>
    </div>

    <!-- Comments list -->
    <div class="comments-wrapper">
      <h3>{{ commentsCount }} Comments</h3>
      <hr />
      <Comment
        v-for="(c, index) in recipe.comments"
        :key="index"
        :comment="c"
      />
    </div>
  </main>

  <div v-else class="recipe-not-found">
    <h2>Recipe not found</h2>
    <RouterLink to="/" class="back-link">← Back to recipes</RouterLink>
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

.back-link {
  color: var(--black-color);
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
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

.thank-you-text,
.thanks-text {
  color: var(--gold-color);
  font-weight: bold;
  font-family: var(--font-main);
}

.help-text {
  color: var(--dark-gray-color);
  font-style: italic;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .interactive-stars {
    font-size: 2rem;
  }
}

.rating-section h3 {
  font-size: 1.4rem;
  padding: 0 10px;
}

.thank-you-text,
.help-text,
.thanks-text {
  font-size: 0.9rem;
  padding: 0 1rem;
  line-height: 1.4;
}

.rating-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
}
.add-comment h3,
.comments-wrapper h3 {
  font-family: var(--font-secondary);
  font-size: 1.8rem;
  color: var(--black-color);
  margin: 0;
}
.comments-wrapper {
  margin-top: 3rem;
  padding-top: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff; /* ljus bakgrund */
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
}

.add-comment {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.add-comment label {
  font-family: var(--font-secondary);
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

.add-comment input,
.add-comment textarea {
  margin-top: 0.3rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: var(--font-main);
}

.add-comment button {
  align-self: flex-start;
  padding: 7px 24px;
  background: #573311;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.add-comment button:hover {
  border: 2px solid #f9ae4a;
  background-color: var(--brown-color);
  color: white;
}
</style>
