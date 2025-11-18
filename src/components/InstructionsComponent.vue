<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true
  },
  checkedSteps: {
    type: Set,
    required: true
  }
})

const emit = defineEmits(['update:checkedSteps'])

const toggleStep = (index) => {
  const newSet = new Set(props.checkedSteps)
  if (newSet.has(index)) {
    newSet.delete(index)
  } else {
    newSet.add(index)
  }
  emit('update:checkedSteps', newSet)
}
</script>

<template>
  <div class="instructions-section">
    <h2 class="section-title">Instructions</h2>
    <ol class="instructions-list">
      <li 
        v-for="(step, index) in steps" 
        :key="index" 
        class="step-item"
        :class="{ 'checked': checkedSteps.has(index) }"
      >
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            :checked="checkedSteps.has(index)"
            @change="toggleStep(index)"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ step }}</span>
        </label>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.instructions-section {
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

.instructions-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.step-item {
    transition: opacity 0.2s ease;
    padding: 8px 0;
}

.step-item.checked {
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

.step-item.checked .checkbox-text {
    text-decoration: line-through;
}
</style>

