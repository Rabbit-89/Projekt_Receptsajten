<script setup>
defineProps({
  title: {
    type: String,
    default: 'Something went wrong'
  },
  message: {
    type: String,
    default: 'Failed to load data. Please try again later.'
  },
  showRetry: {
    type: Boolean,
    default: false
  }
})

defineEmits(['retry'])
</script>

<template>
  <div class="error-container">
    <h2 class="error-title">{{ title }}</h2>  <!--- Heading elements are not in a sequentially-descending order så byta från <h3> till <h2>-->
    <p class="error-message">{{ message }}</p>
    <button v-if="showRetry" @click="$emit('retry')" class="retry-button">
      Try Again
    </button>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  gap: 1rem;
}

.error-title {
  font-family: var(--font-secondary);
  font-size: 1.8rem;
  color: var(--brown-color);
  margin: 0;
}

.error-message {
  font-family: var(--font-main);
  font-size: 1rem;
  color: var(--gray-color);
  margin: 0;
  max-width: 500px;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background-color: var(--brown-color);
  color: var(--white-color);
  border: none;
  border-radius: 8px;
  font-family: var(--font-main);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: var(--gold-color);
}
</style>

