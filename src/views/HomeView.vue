<script setup>
import {ref, computed, watch} from 'vue';
import CategoryNav from '@/components/CategoryNav.vue';
import CategoryView from './CategoryView.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <main>
    <CategoryNav/>
    <CategoryView/>
  </main>

 
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  }
</style>