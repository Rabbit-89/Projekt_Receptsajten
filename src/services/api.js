const API_BASE_URL = 'https://recipes.bocs.se/api/v1'
const TEAM_ID = import.meta.env.VITE_TEAM_ID

if (!TEAM_ID) {
  console.error('VITE_TEAM_ID is not defined in environment variables')
}

export async function fetchRecipes() {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  return response.json()
}

export async function fetchRecipeById(id) {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/recipes/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }
  return response.json()
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/categories`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

