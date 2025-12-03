<!-- CommentForm.vue -->
<script setup>
import { ref } from "vue";
import { postComment } from "../services/api";
import ErrorMessageComment from "./ErrorMessageComment.vue";

// - recipeId: ID of the recipe the comment belongs to

const props = defineProps({
  recipeId: {
    type: String,
    required: true,
  },
});

// - comment-added: sent to parent when a new comment is successfully saved

const emit = defineEmits(["comment-added"]);

/* Form fields */
const newName = ref("");
const newComment = ref("");

/* UI State */
const thanks = ref(false);

/* Error modal state */
const errorComment = ref(false);
const errorTitle = ref("");
const errorMessage = ref("");

/*
  sendComment():
  - Validates input
  - Sends comment to backend
  - Displays success message or error modal
*/
const sendComment = async () => {
  const name = newName.value.trim();
  const comment = newComment.value.trim();

  // Validation
  if (!name || !comment) {
    errorTitle.value = "Missing Required Fields";
    errorMessage.value = "Please enter both your name and your comment.";
    errorComment.value = true;
    return;
  }

  try {
    // Save comment in backend
    const saved = await postComment(props.recipeId, name, comment);

    // Notify the parent component
    emit("comment-added", saved);

    // Reset fields
    newName.value = "";
    newComment.value = "";

    // Show thank you text
    thanks.value = true;
    setTimeout(() => (thanks.value = false), 2500);
  } catch (err) {
    console.error("Failed to submit comment:", err);

    // Show error modal
    errorTitle.value = "Failed to Submit Comment";
    errorMessage.value = "Something went wrong while sending your comment. Please try again.";
    errorComment.value = true;
  }
};
</script>

<template>
  <div class="add-comment">
    <h3>Leave a comment</h3>

    <label>Name</label>
    <input v-model="newName" type="text" placeholder="Type your name" />

    <label>Comment</label>
    <textarea
      v-model="newComment"
      rows="4"
      placeholder="Type your comment">
    </textarea>

    <button @click="sendComment">Send Comment</button>

    <p v-if="thanks" class="thanks-text">Thanks for your comment!</p>

    <!-- Modal Error Component -->
    <ErrorMessageComment
      v-if="errorComment"
      :title="errorTitle"
      :message="errorMessage"
      @close="errorComment = false"
    />
  </div>
</template>

<style scoped>
.add-comment {
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
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
  border: none;
  background-color: var(--brown-color);
  color: white;
  padding: 0.6rem 1.8rem;
  border-radius: 30px;
  font-family: var(--font-main);
  cursor: pointer;
  font-size: 1rem;
}

.add-comment button:hover {
  border: 4px solid #f9ae4a;
  background-color: var(--brown-color);
  color: white;
  font-weight: bold;
}

.thanks-text {
  margin-top: 1rem;
  color: var(--gold-color);
  font-weight: bold;
  font-family: var(--font-main);
}
</style>
