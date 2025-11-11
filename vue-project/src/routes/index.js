import { createRouter, createWebHistory } from 'vue-router'    // createHashWebHistory vissa /# best createWebHistory

/*import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'
import Recipes from '../views/Recipes.vue'
import Category from '../views/Category.vue'
import Categories from '../views/Categories.vue'*/

const Home = () => import('../views/Home.vue');
// const Recipe = () => import('../views/Recipe.vue'); ----skriva i samma line 17 bredvid component för lazzy loading 
// const Recipes = () => import('../views/Recipes.vue');
// const Category = () => import('../views/Category.vue');
// const Categories = () => import('../views/Categories.vue');

const routes = [
    { path: "/", component: Home },
    { path: "/recipe", component: () => import('../views/Recipe.vue') },   // skriva () => import('../views/Recipe.vue') istället Recipe ..the same
    { path: "/recipes", component: () => import('../views/Recipes.vue') }, // Alla Recipe
    { path: "/category", component: () => import('../views/Category.vue') },
    { path: "/categories", component: () => import('../views/Categories.vue') }  // Alla Category
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;