document.addEventListener("DOMContentLoaded", () => {
    const editProfileBtn = document.getElementById("editProfileBtn");
    const themeToggle = document.getElementById("themeToggle");
    const logoutBtn = document.getElementById("logoutBtn");

    // Edit Profile Handler
    editProfileBtn.addEventListener("click", () => {
        const userName = prompt("Update your name:", "John Doe");
        const userBio = prompt("Update your bio:", "Food lover. Recipe creator. Home chef.");
        if (userName) document.getElementById("userName").textContent = userName;
        if (userBio) document.getElementById("userBio").textContent = userBio;
    });

    // Theme Toggle Handler
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("bg-dark");
        document.body.classList.toggle("text-light");
    });

    // Logout Handler
    logoutBtn.addEventListener("click", () => {
        alert("You have been logged out.");
        window.location.href = "login.html";
    });
});