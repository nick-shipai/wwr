const API_KEY = "bf85aa8b4930407eba7394b915ced153";
const RECIPE_DETAIL_URL = "https://api.spoonacular.com/recipes/";

const recipeDetailsSection = document.getElementById("recipe-details");

async function fetchRecipeDetails(id) {
  try {
    const url = `${RECIPE_DETAIL_URL}${id}/information?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      updateRecipeDetails(data);
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    recipeDetailsSection.innerHTML = "<p>Failed to load recipe details. Please try again later.</p>";
  }
}

function updateRecipeDetails(recipe) {
  recipeDetailsSection.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <h2>${recipe.title}</h2>
    <p>${recipe.summary}</p>
    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
      </ul>
    </div>
    <div class="instructions">
      <h3>Instructions</h3>
      <ul>
        ${recipe.instructions ? recipe.instructions.split('\n').map(instruction => `<li>${instruction}</li>`).join('') : "<li>No instructions available</li>"}
      </ul>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  if (recipeId) {
    fetchRecipeDetails(recipeId);
  } else {
    recipeDetailsSection.innerHTML = "<p>Recipe not found!</p>";
  }
});