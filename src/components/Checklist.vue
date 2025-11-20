<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  checkedItems: {
    type: Set,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  listType: {
    type: String,
    default: 'unordered',
    validator: (value) => ['ordered', 'unordered'].includes(value)
  }
})

const emit = defineEmits(['update:checkedItems'])

const toggleItem = (index) => {
  const newSet = new Set(props.checkedItems)
  if (newSet.has(index)) {
    newSet.delete(index)
  } else {
    newSet.add(index)
  }
  emit('update:checkedItems', newSet)
}
</script>

<template>
  <div class="checklist-section">
    <h2 class="section-title">{{ title }}</h2>
    <component 
      :is="listType === 'ordered' ? 'ol' : 'ul'" 
      class="checklist-list"
    >
      <li 
        v-for="(item, index) in items" 
        :key="index" 
        class="checklist-item"
        :class="{ 'checked': checkedItems.has(index) }"
      >
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            :checked="checkedItems.has(index)"
            @change="toggleItem(index)"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ item }}</span>
        </label>
      </li>
    </component>
  </div>
</template>

<style scoped>
.checklist-section {
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

.checklist-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.checklist-item {
    transition: opacity 0.2s ease;
    padding: 8px 0;
}

.checklist-item.checked {
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

.checklist-item.checked .checkbox-text {
    text-decoration: line-through;
}
</style>

