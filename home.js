// Define the Spoonacular API details
const SPOONACULAR_API_KEY = "bf85aa8b4930407eba7394b915ced153";
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

// Function to fetch categories (using the API)
async function fetchRecipeCategories() {
    const categories = ['pizza', 'sushi', 'tacos', 'burger']; // Categories to fetch from the API
    const categoryData = [];

    for (let category of categories) {
        const response = await fetch(`${SPOONACULAR_BASE_URL}?query=${category}&number=1&apiKey=${SPOONACULAR_API_KEY}`);
        const data = await response.json();
        
        if (data.results.length > 0) {
            const recipe = data.results[0]; // Get the first recipe for the category
            categoryData.push({
                name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize the first letter
                imageUrl: recipe.image,
                title: recipe.title
            });
        }
    }

    // Call function to render categories on the page
    renderCategories(categoryData);
}

// Function to render the recipe categories on the page
function renderCategories(categories) {
    const categoriesGrid = document.getElementById('categories-grid');
    categoriesGrid.innerHTML = ''; // Clear the existing content

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        
        const categoryImage = document.createElement('img');
        categoryImage.src = category.imageUrl;
        categoryImage.alt = category.name;
        
        const categoryName = document.createElement('p');
        categoryName.textContent = category.title;

        // Add a click event to redirect to recipes.html with the category name
        categoryElement.onclick = () => {
            window.location.href = `recipes.html?category=${category.name}`;
        };

        categoryElement.appendChild(categoryImage);
        categoryElement.appendChild(categoryName);

        categoriesGrid.appendChild(categoryElement);
    });
}

// Fetch the categories when the page loads
window.addEventListener('load', fetchRecipeCategories);