// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwKsNlw7wUDyQ_yEUhpYZdHIEnWFqQVyc",
  authDomain: "gyfp-48c48.firebaseapp.com",
  projectId: "gyfp-48c48",
  storageBucket: "gyfp-48c48.appspot.com",
  messagingSenderId: "1098492817072",
  appId: "1:1098492817072:web:19ffb2510028ad75bf1575",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get the search input element
const searchInput = document.getElementById("search-input");

// Function to fetch recipe titles and update the placeholder
function updatePlaceholderWithRecipeTitles() {
  const recipesRef = ref(db, "recipes");

  // Fetch the recipes data
  onValue(recipesRef, (snapshot) => {
    if (snapshot.exists()) {
      const recipes = snapshot.val();
      const recipeTitles = [];

      // Collect all the recipe titles
      for (let recipeId in recipes) {
        const recipeTitle = recipes[recipeId].recipeTitle; // Assuming each recipe has a 'title' field
        if (recipeTitle) {
          recipeTitles.push(recipeTitle);
        }
      }

      // Update the placeholder every 5 seconds with a random recipe title
      setInterval(() => {
        if (recipeTitles.length > 0) {
          const randomIndex = Math.floor(Math.random() * recipeTitles.length); // Random index
          searchInput.placeholder = recipeTitles[randomIndex]; // Set random title
        }
      }, 5000); // Change every 5 seconds
    } else {
      console.error("No recipes found!");
    }
  });
}

// Call the function to start updating the placeholder
updatePlaceholderWithRecipeTitles();