<script setup>
import { computed } from 'vue'

const props = defineProps({
  ingredients: {
    type: Array,
    required: true
  },
  checkedIngredients: {
    type: Set,
    required: true
  }
})

const emit = defineEmits(['update:checkedIngredients'])

const toggleIngredient = (index) => {
  const newSet = new Set(props.checkedIngredients)
  if (newSet.has(index)) {
    newSet.delete(index)
  } else {
    newSet.add(index)
  }
  emit('update:checkedIngredients', newSet)
}
</script>

<template>
  <div class="ingredients-section">
    <h2 class="section-title">Ingredients</h2>
    <ul class="ingredients-list">
      <li 
        v-for="(ingredient, index) in ingredients" 
        :key="index" 
        class="ingredient-item"
        :class="{ 'checked': checkedIngredients.has(index) }"
      >
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            :checked="checkedIngredients.has(index)"
            @change="toggleIngredient(index)"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ ingredient }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.ingredients-section {
    background-color: var(--white-color);
    padding: 16px 8px;
    border: 1px solid var(--dark-gray-color);
    border-radius: 8px;
}
.section-title {
    font-size: 24px;
    font-family: var(--font-secondary);
    color: var(--black-color);
    margin-bottom: 16px 0;
    font-weight: 600;

    padding-bottom: 0.5rem;
}

.ingredients-list {
    list-style: none;
    padding: 0;
    margin: 0;

}

.ingredient-item {
    transition: opacity 0.2s ease;
    padding: 8px 0;
}

.ingredient-item.checked {
    opacity: 0.5;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: var(--brown-color);
    line-height: 1.6;
}

.checkbox-input {
    width: 16px;
    height: 16px;
    min-width: 16px;
    cursor: pointer;
    accent-color: var(--gold-color);
}

.checkbox-text {
    flex: 1;
    transition: text-decoration 0.2s ease;
}

.ingredient-item.checked .checkbox-text {
    text-decoration: line-through;
}
</style>

