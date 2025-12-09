<script setup>
import { ref } from 'vue'

/**
 * Rating Component
 * A reusable component that displays 1-5 stars.
 * Can be used in 'read-only' mode (for lists) or 'interactive' mode (for voting).
 */

const props = defineProps({
  // The current rating value (v-model binding)
  modelValue: { type: Number, default: 0 },

  // If true, the user cannot interact/vote (used in RecipeCard)
  readonly: { type: Boolean, default: false }
})

// Emits 'update:modelValue' to support v-model in the parent
const emit = defineEmits(['update:modelValue'])

// Local state for hover effect (UX improvement)
// This allows stars to light up when hovering, without changing the actual saved rating.
const hoverRating = ref(0)

/**
 * Handles the click event on a star.
 * Only emits the update event if the component is NOT in read-only mode.
 */

const setRating = (star) => {
  if (props.readonly) return // Guard clause: Stop if readonly
  emit('update:modelValue', star)
}

/**
 * Determines if a star should be filled (yellow) or empty (grey).
 * Logic:
 * 1. If readonly: Check against the actual saved rating (modelValue).
 * 2. If interactive: Check against hoverRating (if hovering) OR modelValue.
 */

const isFilled = (star) => {
  if (props.readonly) return star <= Math.round(props.modelValue)

  // Use hoverRating for immediate visual feedback, fallback to actual value
  return star <= (hoverRating.value || props.modelValue)
}
</script>

<template>
  <div 
    class="rating-container" 
    @mouseleave="hoverRating = 0"
    :class="{ 'is-readonly': readonly }"
    role="img" 
    :aria-label="`Betyg: ${modelValue} av 5 stjärnor`"
  >
    <button 
      v-for="star in 5" 
      :key="star" 
      type="button"
      class="star-btn" 
      :class="{ 'filled': isFilled(star) }"
      :disabled="readonly"
      :aria-label="`Sätt betyg ${star} av 5`"
      @mouseover="!readonly ? hoverRating = star : null"
      @click="setRating(star)"
      @focus="!readonly ? hoverRating = star : null" 
    >
      ★
    </button>
  </div>
</template>

<style scoped>
.rating-container {
  display: inline-flex;
  gap: 2px;
}

.star-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: inherit; 
  color: #e0e0e0;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, transform 0.1s;
}

.star-btn:focus-visible {
  outline: 2px solid var(--brown-color); 
  outline-offset: 2px;
  border-radius: 50%;
}

.rating-container.is-readonly .star-btn {
  cursor: default;
}

.star-btn.filled {
  color: var(--gold-color, #eebb00); 
}
</style>