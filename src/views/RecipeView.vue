<!--
  RecipeView Component
  Displays the full details of a single recipe including ingredients, instructions,
  rating and comments. (TBD: Add comments)
-->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { fetchRecipeById, postRating, postComment, fetchComments } from "../services/api";
import Checklist from "../components/Checklist.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import RecipeHeader from "../components/RecipeHeader.vue";
import Rating from "../components/Rating.vue";
import Comment from '../components/Comment.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ErrorMessage from '../components/ErrorMessage.vue';


const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const error = ref(false);
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
    { label: categoryName.value, to: `/categories/${categoryName.value}` },
    { label: recipe.value.title },
  ];
});

const ingredientsCount = computed(() => recipe.value?.ingredients?.length || 0);

const rating = computed(() => {
  if (!recipe.value) return 0;

  if (recipe.value.ratings?.length > 0) {
    const avg =
      recipe.value.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) /
      recipe.value.ratings.length;

    // Konvertera tillbaka till nummer med Number()
    return Number (avg.toFixed(1));
  }
  return 0;
});

const commentsCount = computed(() => recipe.value?.comments?.length || 0);

onMounted(async () => {
  const recipeId = route.params.id;
  loading.value = true; // Show loading spinner when data is being fetched
  error.value = false; // Reset error state

  try {
    recipe.value = await fetchRecipeById(recipeId);

    // Ensure comments array exists
    const comments = await fetchComments(recipeId);
    recipe.value.comments = comments || [];
   
  } catch (err) {
    console.error("Failed to load recipe or comments", err);
    error.value = true;   // Show error message if something went wrong

    recipe.value = null;  // Clear recipe data if there's an error

  } finally {
    loading.value = false;   // Hide loading spinner when data is loaded
  }
});

const currentRating = ref(0);
const userHasRated = ref(false);

// Ny funktion som hanterar röstning direkt
const handleRating = async (stars) => {
  currentRating.value = stars; // Uppdatera stjärnorna på skärmen
  
  try {
    // Skicka till API direkt via vår service-funktion
    await postRating(route.params.id, stars);
    
    // Visa tack-meddelandet
    userHasRated.value = true;

  } catch (error) {
    console.error(error);
    alert("Kunde inte spara betyget.");
  }
};

// --- COMMENT FORM ---
const newName = ref("");
const newComment = ref("");
const thanks = ref(false);

/*
  NEW: Add comment using API and push the returned comment into recipe.comments.
*/
const addComment = async async () => {
  const name = newName.value.trim();
  const comment = newComment.value.trim();

  if (!name || !comment) {
    alert("Please fill in the required fields: Name and Comment");
    return;
  }

  try {
    // Send the comment to the API
    const savedComment = await postComment(route.params.id, name, comment);

    /*
      The API returns this structure:
      {
        name: "...",
        comment: "...",
        createdAt: "2025-02-01T12:00:00Z"
      }
    */

    // Add the returned comment into the list
    recipe.value.comments.push({
      name: savedComment.name,
      comment: savedComment.comment,
      createdAt: savedComment.createdAt
    });

    // Reset form fields
    newName.value = "";
    newComment.value = "";
        
    console.log(savedComment);  // For debugging
    // Show thank you message
    thanks.value = true;
    setTimeout(() => {
      thanks.value = false;
    }, 3000);

  } catch (error) {
    console.error("Failed to submit comment:", error);
    alert("Could not send your comment. Please try again.");
  }
};

</script>

<template>
  <!-- Show loading spinner while data is being fetched -->
  <LoadingSpinner v-if="loading" message="Loading recipe..." />
  
  <!-- Show error message if something went wrong -->
  <div v-else-if="error" class="error-wrapper">
    <ErrorMessage 
      title="Recipe not found"
      message="We couldn't load this recipe. It may not exist or there was an error."
    />
    <RouterLink to="/" class="back-link">← Back to recipes</RouterLink>
  </div>
  
  <!-- Main recipe view - only shown when recipe data is loaded -->
  <main class="recipe-view" v-else-if="recipe">
    <!-- Navigation breadcrumbs -->
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
        :modelValue="currentRating"
        @update:modelValue="handleRating"
        class="interactive-stars"
      />
      <p v-if="userHasRated" class="thank-you-text">
        Thanks! You have given this recipe a {{ currentRating }} star rating.
      </p>
      <p v-else class="help-text">
        Please click on the stars to set your rating.
      </p>
    </div>

    <!-- Add Comment -->
    <div class="add-comment">
      <h3>Leave a comment</h3>

      <label>Name</label>
      <input v-model="newName" type="text" placeholder="Type your name" />

      <label>Comment</label>
      <textarea v-model="newComment" rows="4" placeholder="Type your comment"></textarea>

      <button @click="addComment">Send Comment</button>

      <p v-if="thanks" class="thanks-text">Thanks for your comment!</p>
    </div>

    <!-- Comments -->
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

.error-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 1rem;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: var(--brown-color);
  color: var(--white-color);
  text-decoration: none;
  border-radius: 8px;
  font-family: var(--font-main);
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-link:hover {
  background-color: var(--gold-color);
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
