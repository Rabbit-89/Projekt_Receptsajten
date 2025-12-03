<!--
  Comment Component
  Displays a single user comment inside the recipe page.
-->
<script setup>
//import { computed } from "vue";

// Ta emot en kommentar och totalt antal kommentarer från parent
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  commentsCount: {
    type: Number,
    required: true,
  },
});

// Format datum till läsbart format
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
};
</script>

<template>
  <!--<div class="comments-wrapper">  
      <h3>{{ commentsCount }} Comments</h3>-->
  <hr />

  <div class="comment-card">
    <!-- Avatar: first letter of username -->
    <div class="avatar">
      {{ props.comment.name?.charAt(0)?.toUpperCase() || "?" }}
    </div>
    <div class="comment-box">
      <!-- Comment Author --
       props.comment.name?.charAt(0).toUpperCase() → takes the first letter of the name and converts it to uppercase
       props.comment.name?.substring(1) → takes the rest of the name starting from the second character
       + → combines the capitalized first letter with the rest of the name
       Result: displays the author’s name with the first letter capitalized, even if the original name was all lowercase-->
      <p class="comment-author">
        {{
          props.comment.name?.charAt(0).toUpperCase() +
          props.comment.name?.substring(1)
        }}
      </p>
      <!-- Comment Date -->
      <p class="comment-date">{{ formatDate(props.comment.createdAt) }}</p>
      <!-- Comment Text -->
      <p class="comment-text">{{ props.comment.comment }}</p>
    </div>
  </div>
</template>

<style scoped>
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

.comment-box {
  flex: 1;
  margin-left: 2rem;
}
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
  margin-left: 2rem;
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
