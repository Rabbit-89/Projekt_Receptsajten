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

/**
 * Fetches all available recipe Ratings
 * returns Array of rating objects
 * throws Error If the API request fails
 */
export async function fetchRatings(recipeId) {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes/${recipeId}/ratings`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch ratings')
  }
  
  return response.json()
}

/**
 * Posts a rating for a specific recipe
 * param recipeId - The ID of the recipe
 * param rating - The rating value (number)
 * throws Error If the API request fails
 */
export async function postRating(recipeId, rating) {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes/${recipeId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rating)
  })

  if (!response.ok) {
    throw new Error('Failed to post rating')
  }
  
  // Om servern svarar 204 (No Content), försök inte läsa JSON
  if (response.status === 204) {
    return null
  }
  
  return response.json()
}

 /** Fetches all available recipe comments
 * returns Array of comment objects
 * throws Error If the API request fails
 */
export async function fetchComments(recipeId) {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes/${recipeId}/comments`)
  if (!response.ok) {
    throw new Error('Failed to fetch comments')
  }
  return response.json()
}

/**
 * Posts a comment for a specific recipe
 *
 * - recipeId: ID of the recipe
 * - name: comment author's name
 * - comment: text of the comment
 *
 * Backend expects:  { "name": "...", "comment": "..." }
 * Returns: the saved comment object from server
 */
export async function postComment(recipeId, name, comment) {
  const response = await fetch(
    `${API_BASE_URL}/${TEAM_ID}/recipes/${recipeId}/comments`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        comment
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to post comment');
  }

  // Server returns the created comment object
  return response.json();
}

