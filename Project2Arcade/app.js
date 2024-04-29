"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById("reveal-nav");
    const navBar = document.getElementById("nav-bar");

    navButton.addEventListener("click", () => {

        navBar.classList.toggle("hide");
        navButton.classList.toggle("hide");

    });


    const diffButtons = document.getElementsByClassName("diff-btn");

    for (let i = 0; i < diffButtons.length; i++) {

        diffButtons[i].addEventListener("click", () => {

            for (let j = 0; j < diffButtons.length; j++) {
                diffButtons[j].classList.remove("diff-clicked");
            }

            diffButtons[i].classList.add("diff-clicked");

        });

    }
});

    