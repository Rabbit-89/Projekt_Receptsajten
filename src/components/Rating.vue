<script setup>
import { ref } from 'vue'

// Props & Emits
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

//Håller koll på vilken stjärna musen hovrar över just nu
const hoverRating = ref(0)

// Funktion som körs när man klickar på en stjärna
const setRating = (star) => {
  if (props.readonly) return
  emit('update:modelValue', star)
}

// Hjälpfunktion: Avgör om en stjärna ska vara fylld (guld)
const isFilled = (star) => {
  if (props.readonly) return star <= Math.round(props.modelValue)

  // Röstningsläge: Fyll om vi hovrar över den eller om den är vald sen innan
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

/* Knappstil (tar bort standard-knapp utseende) */
.star-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: inherit; /* 'inherit' gör att vi kan styra storleken utifrån (från RecipeView) */
  color: #e0e0e0; /* Grå tom stjärna */
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, transform 0.1s;
}

/* Fokus-ring för tangentbordsanvändare (tillgänglighet) */
.star-btn:focus-visible {
  outline: 2px solid var(--brown-color); 
  outline-offset: 2px;
  border-radius: 50%;
}

/* Ingen hand-cursor om den är readonly (bara visning) */
.rating-container.is-readonly .star-btn {
  cursor: default;
}

/* Den fyllda stjärnan (Guld) */
.star-btn.filled {
  color: var(--gold-color, #eebb00); 
}
</style>