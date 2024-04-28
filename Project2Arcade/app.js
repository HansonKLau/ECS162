
document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById("reveal-nav");
    const navBar = document.getElementById("nav-bar");

    navButton.addEventListener("click", () => {

        navBar.classList.toggle("hide");
        navButton.classList.toggle("hide");

    });
});

    