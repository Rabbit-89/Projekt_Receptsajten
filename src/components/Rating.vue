<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])
const hoverRating = ref(0)

const setRating = (star) => {
  if (props.readonly) return
  emit('update:modelValue', star)
}

const isFilled = (star) => {
  if (props.readonly) return star <= Math.round(props.modelValue)
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