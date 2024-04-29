

/*

OBJECTIVE: stack 7 pieces of sushi

*/

let updateTimerId;

document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('keydown', checkKey);

    const canvas = document.getElementById('game-window');
    const context = canvas.getContext('2d');

    // array of image paths
    const sushiImages = [".\\imgs\\albacore.png", ".\\imgs\\salmon.png", 
                         ".\\imgs\\yellowtail.png", ".\\imgs\\tamago.png",
                         ".\\imgs\\tuna.png", ".\\imgs\\shrimp.png"];

    let timerId;
    let numSushiStacked = 0;
    let previousX = 0;
    let previousY = 0;
    let previousImg = ""
    let yspeed = 2;
    let xspeed = 3
    let time = 0.0;

    function updateTime() {
        const currentTime = document.getElementById("seconds-elapsed");
        time = time + 0.1;
        currentTime.textContent = time.toFixed(1);
    }

    function createPiece() {

        console.log("creating piece");

        document.addEventListener('keydown', dropPiece);

        // current sushi piece
        const sushiPiece = new Image();
        sushiPiece.height = 60;
        sushiPiece.width = 120;
        let index = Math.floor(Math.random() * sushiImages.length);
        sushiPiece.src = sushiImages[index];

        let x = 0;
        let y = 20;
        let goingRight = true;

        console.log("starting");

        sushiPiece.onload = () => {
            timerId = setInterval(startingPiece, 10);
        }
        
        function moveCurrentPiece() {
            background(y);
            context.drawImage(sushiPiece, x, y, 120, 60);
            redrawPiece();

        }

        function redrawPiece() {
            if (previousY != 0) {
                const prevSushiPiece = new Image();
                prevSushiPiece.height = 60;
                prevSushiPiece.width = 120;
                prevSushiPiece.src = previousImg;
                context.drawImage(prevSushiPiece, previousX, previousY, 120, 60);
            }
        }

        function dropPiece(e) {

            e.preventDefault();

            if (e.keyCode == 32) {
                clearInterval(timerId);
                dropTimerId = setInterval(dropping, 1);
            }
        }

        function dropping() {

            const borderY = 9 + canvas.clientHeight - sushiPiece.height;

            // move sushi down while it's not on the floor yet
            if (y < borderY) {
                y += yspeed;
                moveCurrentPiece();
            }

            // checking that current sushi reached height of previous sushi
            if (y >= borderY - (numSushiStacked * (sushiPiece.height-23))  ) {
                console.log("num stack: " + numSushiStacked);

                // check if x is in appropriate range of previous x
                if ( ((x > (previousX - sushiPiece.width/2)) && (x < (previousX + sushiPiece.width/2))) || numSushiStacked == 0) {
                    // successful stack
                    numSushiStacked++;
                    clearInterval(dropTimerId);
                    xspeed += 2;

                    // check if player won (this was 7th stack)
                    if (numSushiStacked == 7) {
                        // end game (win)
                        console.log("win");
                        document.removeEventListener('keydown', dropPiece);
                        win();

                    } else {
                        previousX = x;
                        previousY = y;
                        previousImg = sushiImages[index];
                        document.removeEventListener('keydown', dropPiece);
    
                        // recursive ?!?!
                        console.log("recurse?");
                        createPiece();
                    }                    

                } else {
                    // end game (lose)

                    console.log("lose");
                    clearInterval(dropTimerId);
                    document.removeEventListener('keydown', dropPiece);
                    lose();

                }
            }
        }

        function win() {
            clearInterval(updateTimerId);
            const result = document.getElementById("result");
            const resultContainer = document.getElementsByClassName("result-container");
            resultContainer[0].classList.remove("hide");
            if (time == 1) {
                result.textContent = "Woah there, you finished in " + time.toFixed(1) + " second! The sushi chef is impressed";
            } else {
                result.textContent = "Awesome! You took " + time.toFixed(1) + " seconds. The sushi chef is pleased with your work!";
            }
        }

        function lose() {
            clearInterval(updateTimerId);
            const result = document.getElementById("result");
            const resultContainer = document.getElementsByClassName("result-container");
            resultContainer[0].classList.remove("hide");

            result.textContent = "Yikes! The sushi chef's heart is broken. T_T";
        }
  
        function startingPiece() {

            if (timerId) {
                // if timer is active
                // shift block left and right until spacebar is pressed

                if (x <= 0) { // checking edge of sushi is on edge of screen
                   goingRight = true;
                }

                // canvas size is 500
                if (x >= canvas.clientWidth - (sushiPiece.width)) {
                    goingRight = false;
                }

                if (goingRight) {
                    x += xspeed;
                } else {
                    x -= xspeed;
                }
                
                moveCurrentPiece();

            } else {
                // if timer is inactive (block is on floor or below previous block)

            }
        }
    }

    function background(y) {

        // color the background of the canvas
        context.fillStyle = "#aae0fb";
        context.fillRect(0, 0, canvas.width, y + 52.2);

    }

    const startBtn = document.getElementById("start-button");
    startBtn.addEventListener("click", start);

    function start() {

        if (updateTimerId) {

            clearInterval(updateTimerId);
            restart();

        } else {

            createPiece();
            updateTimerId = setInterval(updateTime, 100);
        }

        background(canvas.height);
    }

    function checkKey(e) {
        if (e.keyCode === 82) {
            restart()
        } else if (e.keyCode === 83) {
            start()
        }
    }

    function restart() {
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.add("hide");
        time = 0.0;
        window.location.reload();
    }

});

