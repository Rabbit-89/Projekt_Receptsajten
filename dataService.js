import recipesData from './recipesData.json';
import categoriesData from './categoriesData.json';

export function getRecipes() {
    return recipesData;
}

export function getRecipeById(id) {
    const recipeById = parseInt(id, 10);

    if (isNaN(recipeById)) {
        throw new Error(`Inga sökningar angavs av ${id}.`);
    }

    const recipe = recipesData.find(recipe => recipe.id === recipeById);

    if (!recipe) {
        throw new Error(`Recept med id ${recipeById} hittades inte.`);
    }

    return recipe;

}

export function getRecipesByCategory(catId) {
    return recipesData.filter(recipe => recipe.categoryId === catId);
}

export function getCategories() {
    return categoriesData;
}
