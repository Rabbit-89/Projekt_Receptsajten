<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const formatCategoryName = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <nav class="breadcrumbs">
    <template v-for="(item, index) in items" :key="index">
      <RouterLink 
        v-if="item.to" 
        :to="item.to" 
        class="breadcrumb-link"
      >
        {{ item.label }}
      </RouterLink>
      <span v-else class="breadcrumb-current">{{ item.label }}</span>
      <span 
        v-if="index < items.length - 1" 
        class="breadcrumb-separator"
      >
        >
      </span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-family: var(--font-main);
  font-size: 14px;
}

.breadcrumb-link {
  color: var(--black-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  display: flex;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: underline;
}

.breadcrumb-link:hover {
  text-decoration: none;
}

.breadcrumb-separator {
  color: var(--dark-gray-color);
  margin: 0 0.25rem;
}

.breadcrumb-current {
  color: var(--black-color);
  font-weight: 500;
}
</style>

