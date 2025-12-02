import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: () => import('@/views/RecipeView.vue'),
    },
    {
      path: '/categories/:categoryId',
      name: 'category',
      component: CategoryView,
    }

  ],
  linkActiveClass: 'category-active-link',
  // Ensure we scroll to top when navigating, especially to RecipeView
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Browser back/forward button: restore previous position
      return savedPosition
    }
    // Always scroll to top on route change
    return { top: 0 }
  },
})

export default router
