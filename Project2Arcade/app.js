
document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById("reveal-nav");
    const navBar = document.getElementById("nav-bar");

    const listGameSelection = document.getElementsByClassName("game-selection-container");
    const gameSelection = listGameSelection[0];

    navButton.addEventListener("click", () => {

        console.log("hello");

        navBar.classList.toggle("hide");
        navButton.classList.toggle("hide");

        gameSelection.classList.toggle("adjust");

    });
});

    