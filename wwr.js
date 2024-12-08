function switchTab(page) {
  // Update iframe content
  const iframe = document.getElementById('content-frame');
  iframe.src = page;

  // Update active tab style
  updateActiveTab(page);
}

function updateActiveTab(page) {
  // Get all navigation buttons
  const buttons = document.querySelectorAll('.nav-btn');
  
  // Remove 'active' class from all buttons
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Add 'active' class to the correct button based on the page
  const activeButton = [...buttons].find(btn => {
    const btnPage = btn.textContent.toLowerCase(); // Get the button's text (home, recipes, etc.)
    return page.includes(btnPage); // Match the page with the button text
  });
  
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Set initial active tab based on iframe's src
window.addEventListener('load', () => {
  const iframe = document.getElementById('content-frame');
  const currentPage = iframe.src.split('/').pop(); // Get the file name from the iframe src
  
  // Update the active tab based on the iframe src
  updateActiveTab(currentPage);
});

// Listen for changes in the iframe src and update the active tab
document.getElementById('content-frame').addEventListener('load', () => {
  const iframe = document.getElementById('content-frame');
  const currentPage = iframe.src.split('/').pop(); // Get the file name from the src
  updateActiveTab(currentPage);
});