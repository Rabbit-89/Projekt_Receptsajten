<!-- CommentForm.vue -->
<script setup>
import { ref } from "vue";
import { postComment } from "../services/api";

const props = defineProps({
  recipeId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["comment-added"]);

const newName = ref("");
const newComment = ref("");
const thanks = ref(false);

const sendComment = async () => {
  const name = newName.value.trim();
  const comment = newComment.value.trim();

  if (!name || !comment) {
    alert("Please fill in the required fields: Name and Comment");
    return;
  }

  try {
    const saved = await postComment(props.recipeId, name, comment);

    emit("comment-added", saved);

    newName.value = "";
    newComment.value = "";

    thanks.value = true;
    setTimeout(() => (thanks.value = false), 3000);
  } catch (err) {
    console.error("Failed to submit comment:", err);
    alert("Could not send your comment. Please try again.");
  }
};
</script>

<template>
  <div class="add-comment">
    <h3>Leave a comment</h3>

    <label>Name</label>
    <input v-model="newName" type="text" placeholder="Type your name" />

    <label>Comment</label>
    <textarea v-model="newComment" rows="4" placeholder="Type your comment"></textarea>

    <button @click="sendComment">Send Comment</button>

    <p v-if="thanks" class="thanks-text">Thanks for your comment!</p>
  </div>
</template>

<style scoped>
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

.thanks-text {
  color: var(--gold-color);
  font-weight: bold;
}
</style>
