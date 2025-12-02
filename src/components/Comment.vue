<!--
  Comment Component
  Displays a single user comment inside the recipe page.
-->

<script setup>
// Receive comment object from parent
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
});

// Format a human-readable date string
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  };
  return date.toLocaleDateString("en-US", options);
};
</script>

<template>
  <div class="comment-card">

    <!-- Avatar: first letter of username -->
    <div class="avatar">
      {{ props.comment.name?.charAt(0)?.toUpperCase() || "?" }}
    </div>

    <div class="comment-box">
      <!-- Comment Author -->
      <p class="comment-author">{{ props.comment.name }}</p>

      <!-- Comment Date -->
      <p class="comment-date">{{ formatDate(props.comment.createdAt) }}</p>

      <!-- Comment Text -->
      <p class="comment-text">
        {{ props.comment.comment }}
      </p>
    </div>

  </div>
</template>

<style scoped>
.comment-card {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--gold-color);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.comment-author {
  font-weight: bold;
  margin: 0;
}

.comment-date {
  color: gray;
  font-size: 0.8rem;
  margin: 0.2rem 0;
}

.comment-text {
  margin-top: 0.3rem;
}
</style>

