

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById("grid");

    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");

    const images = ["condiments", "ikura", "miso",
                    "nigiri", "sashimi", "temaki"];

    easy.addEventListener("click", makeEasy);
    medium.addEventListener("click", makeMedium);
    hard.addEventListener("click", makeHard);

    function makeEasy() {
        makeGrid(2, 4);
    }
    
    function makeMedium() {
        makeGrid(3, 5);
    }
    
    function makeHard() {
        makeGrid(4, 6);
    }

    function assignCards(matchSize, matches) {

        const cards = document.getElementsByClassName("card");

        let chosenImages = [];

        while (chosenImages.length < matches) {
            let index = Math.floor(Math.random() * images.length);

            if (chosenImages.includes(images[index])) {
                continue;
            } else {
                chosenImages.push(images[index]);
            }
        }

        let countImagesPlaced = [0, 0, 0, 0, 0, 0];

        // adding click stuff ///////////////

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", () => {

                // chose image randomly
                let index = Math.floor(Math.random() * chosenImages.length);

                while (countImagesPlaced[index] >= matchSize) {
                    index = Math.floor(Math.random() * chosenImages.length);
                }

                console.log("index: " + index);
                countImagesPlaced[index]++;

                cards[i].classList.add("card2");

                setTimeout( function() {
                    cards[i].classList.remove("card2");
                    cards[i].classList.add(chosenImages[index]);

                } , 500)

            });
        }

        /////////////////////////////////////
    }

    function makeGrid(rows, cols) {

        // clear grid
        destroyGrid();

        // create rows first
        for (let i = 0; i < rows; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            grid.appendChild(row);
        }

        const selectRows = document.getElementsByClassName("row");
    
        for (let i = 0; i < selectRows.length; i++) {
            for (let j = 0; j < cols; j++) {
    
                const col = document.createElement("div");
                col.classList.add("card");
                selectRows[i].appendChild(col);
            }
        }

        assignCards(rows, cols);
    }

    function destroyGrid() {

        const cards = document.getElementsByClassName("card");
        let numOfCards = cards.length;

        for (let i = 0; i < numOfCards; i++) {
            cards[0].remove();  
        }

        const rows = document.getElementsByClassName("row");
        let numOfRows = rows.length;

        for (let i = 0; i < numOfRows; i++) {
            rows[0].remove();
        }

    }
});



