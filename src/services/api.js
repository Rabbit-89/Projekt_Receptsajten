/**
 * API Service
 * Handles all API calls to the recipes backend service.
 * Requires VITE_TEAM_ID to be set in environment variables.
 */

const API_BASE_URL = 'https://recipes.bocs.se/api/v1'
const TEAM_ID = import.meta.env.VITE_TEAM_ID

// Validate that team ID is configured
if (!TEAM_ID) {
  console.error('VITE_TEAM_ID is not defined in environment variables')
}

/**
 * Fetches all recipes from the API
 * returns Array of recipe objects as promise
 * throws Error If the API request fails
 */
export async function fetchRecipes() {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  return response.json()
}

/**
 * Fetches a single recipe by its ID
 * param id - The recipe ID
 * returns Recipe object with full details
 * throws Error If the API request fails or recipe is not found
 */
export async function fetchRecipeById(id) {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }
  return response.json()
}

/**
 * Fetches all available recipe categories
 * returns Array of category objects
 * throws Error If the API request fails
 */
export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/categories`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

