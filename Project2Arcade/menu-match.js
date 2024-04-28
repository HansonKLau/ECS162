

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById("grid");

    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");

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

                // adding click stuff ///////////////


                col.addEventListener("click", () => {

                    col.classList.add("card2");
                    setTimeout( function() {
                        col.classList.remove("card2");
                        col.classList.add("condiments");
                    } , 500)

                });

                /////////////////////////////////////


                selectRows[i].appendChild(col);
            }
        }
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



