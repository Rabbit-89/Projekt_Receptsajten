import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'
import Recipes from '../views/Recipes.vue'
import Category from '../views/Category.vue'
import Categories from '../views/Categories.vue'

const routes = [
    { path: "/", component: Home },
    { path: "/recipe", component: Recipe },
    { path: "/recipes", component: Recipes }, // Alla Recipe
    { path: "/category", component: Category },
    { path: "/categories", component: Categories }  // Alla Category
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;