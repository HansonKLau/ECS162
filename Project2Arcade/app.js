
document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById("reveal-nav");
    const navBar = document.getElementById("nav-bar");

    navButton.addEventListener("click", () => {

        console.log("hello");

        navBar.classList.toggle("hide");
        navButton.classList.toggle("hide");

    });
});

    