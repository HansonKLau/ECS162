

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

        let countImagesPlaced = [];

        for (let i = 0; i < matches; i++) {
            countImagesPlaced.push(0);
        }

        const checking = document.getElementsByClassName("checking");

        for (let i = 0; i < cards.length; i++) {

            // chose image randomly
            let index = Math.floor(Math.random() * chosenImages.length);

            while (countImagesPlaced[index] >= matchSize) {
                index = Math.floor(Math.random() * chosenImages.length);
            }

            countImagesPlaced[index]++;
            cards[i].classList.add(chosenImages[index]);
            cards[i].classList.add("hide-image");

            cards[i].addEventListener("click", () => {

                if (!(cards[i].classList.contains("checking") || 
                      cards[i].classList.contains("matched")  ||
                      checking.length >= matchSize)) {
                    cards[i].classList.add("card2");
                    cards[i].classList.add("checking");

                    setTimeout( function() {
                        cards[i].classList.remove("card2");
                        cards[i].classList.remove("hide-image");
                    } , 500)

                    checkMatch(matchSize, chosenImages[index]);
                }
                    
            });
        }
    }

    function checkMatch(matchSize, image) {

        const checking = document.getElementsByClassName("checking");
        const checkingLength = checking.length;
        console.log("checking length: " + checking.length);
        let matching = true;

        // make sure every card selected has that image
        for (let i = 0; i < checkingLength; i++) {

            if (!checking[i].classList.contains(image)) {
                console.log("image did not match")
                // card doesn't have the same image
                matching = false;
                break;
            }
        }

        if (matching) {

            // check if all have been matched
            if (checkingLength == matchSize) {
                console.log("one set matched");
                // take "checking" class out, add "matched" class
                for (let i = 0; i < checkingLength; i++) {
                    checking[0].classList.add("matched");
                    checking[0].classList.remove("checking");
                    // console.log("length now: " + checking.length);
                }
            }

        } else {

            // flip all cards with "checking" class over
            for (let i = 0; i < checkingLength; i++) {

                console.log("removing card");
                setTimeout( function() {
                    checking[i].classList.add("card2");
                } , 1700);

                setTimeout( function() {
                    checking[i].classList.remove("card2");
                    checking[i].classList.add("hide-image");
                } , 2100);

            }

            for (let i = 0; i < checkingLength; i++) {
                // console.log("length now: " + checking.length);
                setTimeout( function() {
                checking[0].classList.remove("checking");
                } , 2100);
            }
        }
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



