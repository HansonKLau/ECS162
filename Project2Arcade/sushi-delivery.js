
let gridLength = 5;
let numberOfLanes = 9;
let currentIndex;
let time = 0;
let timerId;

let carsCurrentIndicies = [];

// getting all cells of the grid
const cells = document.getElementsByClassName("cell");

document.addEventListener('DOMContentLoaded', () => {

    // getting the DOM elements to set up grid
    // const all_cells = document.querySelector('.grid div');

    // creating board
    createGrid();

    // setting starting positions
    initializeGrid();

    //to start and pause the game
    const startBtn = document.getElementById("start-button");

    startBtn.addEventListener('click', () => {
        console.log("clicked");

        if (timerId) {
            stopGame();

        }   else {
            // setting starting positions
            initializeGrid();

            console.log("starting timer");
            time = 0;
            document.addEventListener('keydown', movePlayer);
            timerId = setInterval(updateTime, 1000);


            // let rand = Math.floor(Math.random() * (501)) + 200;
            // console.log("Interval: " + rand);

            lane1 = setInterval(moveCars, 1000);
            // lane2
            // lane3

            // lane4
            // lane5
            // lane6
            
        }
    });

});

function moveCars() {

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("red-car-right")) {
            cells[i].classList.remove("red-car-right");

            if (i % gridLength == gridLength - 1) {
                // checking if at right edge
                console.log(i)
                cells[i - (gridLength - 1)].classList.add("red-car-right");                
                console.log("at edge");
            } else {
                cells[i + 1].classList.add("red-car-right");
                console.log("not at edge");
                i++;
            }

        }
    }
    lose();
}

function updateTime() {
    
    currentTime = document.getElementById("seconds-elapsed");
    time = time + 1;
    currentTime.textContent = time;

}

function initializeGrid() {

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("up");
        cells[i].classList.remove("red-car-right");
    }

    // setting player up
    let middleOfGrid = Math.floor(gridLength/2);
    let startPos = gridLength * (numberOfLanes - 1) + middleOfGrid;
    cells[startPos].classList.add("up");
    currentIndex = startPos;

    /*
    0 1 2 .............. gridlength - 1
    gridlength
    2 * gridlength
    .
    .
    .
    8 * gridlength
    */

    for (let i = 1; i <= 7; i++) {
        if (i == 4) {
            // skip safe lane
            continue;
        }
        carsCurrentIndicies[i] = i * gridLength;
        // setting cars up
        cells[carsCurrentIndicies[i]].classList.add("red-car-right");
    }


}

// adding functionality to move player's car
function movePlayer(e) {
    let checkIndex = currentIndex;
    switch(e.keyCode) {
        case 37: // left arrow
            if (currentIndex % gridLength !== 0) {
                currentIndex -=1;
            }
            break;
        case 38: // up arrow
            if (currentIndex - gridLength >=0) {
                currentIndex -= gridLength;
            }
            break;
        case 39: // right arrow
            if (currentIndex % gridLength < gridLength - 1) {
                currentIndex +=1;
            }
            break;
        case 40: // down arrow
            if (currentIndex + gridLength < gridLength * numberOfLanes) {
                currentIndex += gridLength;
            }
            break;
    }
    cells[checkIndex].classList.remove("up");
    cells[currentIndex].classList.add("up")

    // check win
    win();

    // check lose (collision)
    lose();
}   

function win() {

    let won = false;

    for (let i = 0; i < gridLength; i++) {
        if (cells[i].classList.contains("up")) {
            won = true;
            break;
        }
    }

    if (won) {
        stopGame();
    }

}

function lose() {

    let lost = false;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("red-car-right") && cells[i].classList.contains("up")) {
            lost = true;
            break;
        }
    }

    if (lost) {
        stopGame();
    }
}

function stopGame() {
    console.log("stopped");
    clearInterval(timerId);
    document.removeEventListener('keydown', movePlayer);
    timerId = undefined;

    clearInterval(lane1);
}

/*

moving car to right
*/

function moveCar1() {

}


// moving obstacle cars left
function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function createGrid() {

    const lanes = document.getElementsByClassName("lane");

    // styling goal lane
    for (let i = 0; i < gridLength; i++) {
        const goalCell = document.createElement("div");
        goalCell.classList.add("goal-cell", "cell");
        lanes[0].appendChild(goalCell);
    }

    // styling car lanes
    for (let i = 1; i <= 7; i++) {
        if (i == 4) {
            // skipping safe lane
            continue;
        }
        for (let j = 0; j < gridLength; j++) {
            const carLaneCell = document.createElement("div");
            carLaneCell.classList.add("car-lane-cell", "cell");
            lanes[i].appendChild(carLaneCell);
        }
    }

    // styling safe lane
    for (let i = 0; i < gridLength; i++) {
        const safeCell = document.createElement("div");
        safeCell.classList.add("safe-cell", "cell");
        lanes[4].appendChild(safeCell);
    }

    // styling start lane
    for (let i = 0; i < gridLength; i++) {
        const startCell = document.createElement("div");
        startCell.classList.add("start-cell", "cell");
        lanes[8].appendChild(startCell);
    }
}


// function testing() {

//     const test = document.getElementsByClassName("test");

//     for (let i = 0; i < test.length; i++) {
//         for (let j = 0; j < gridLength; j++) {
//             const testCell = document.createElement("div");
//             testCell.classList.add("test-cell");
//             test[i].appendChild(testCell);
//         }
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const squares = document.querySelectorAll('.grid div')
//     const timeLeft = document.querySelector('#time-passed')
//     const result = document.querySelector('#result')
//     const startBtn = document.querySelector('#button')
//     const carsLeft = document.querySelectorAll('.car-left')
//     const carsRight = document.querySelectorAll('.car-right')
//     const logsLeft = document.querySelectorAll('.log-left')
//     const logsRight = document.querySelectorAll('.log-right')
//     const width = 9
//     let currentIndex = 76
//     let currentTime = 20
//     let timerId


//     //render frog on starting block
//     squares[currentIndex].classList.add('frog')

//     //write a function that will move the frog
//     function moveFrog(e) {
//         squares[currentIndex].classList.remove('frog')
//         switch(e.keyCode) {
//             case 37:
//                 if(currentIndex % width !== 0) currentIndex -=1
//                 break
//             case 38:
//                 if(currentIndex - width >=0) currentIndex -= width
//                 break
//             case 39: 
//                 if(currentIndex % width < width -1) currentIndex +=1
//                 break
//             case 40:
//                 if(currentIndex + width < width * width) currentIndex += width
//                 break
//         }
//         squares[currentIndex].classList.add('frog')
//         lose()
//         win()
//     }   

//     //move cars
//     function autoMoveCars() {
//         carsLeft.forEach(carLeft => moveCarLeft(carLeft))
//         carsRight.forEach(carRight => moveCarRight(carRight))
//     }

//     //move the car left on a time loop
//     function moveCarLeft(carLeft) {
//         switch (true) {
//             case carLeft.classList.contains('c1'):
//                 carLeft.classList.remove('c1')
//                 carLeft.classList.add('c2')
//                 break
//             case carLeft.classList.contains('c2'):
//                 carLeft.classList.remove('c2')
//                 carLeft.classList.add('c3')
//                 break
//             case carLeft.classList.contains('c3'):
//                 carLeft.classList.remove('c3')
//                 carLeft.classList.add('c1')
//                 break
//         }
//     }

//     //move the car right on a time loop
//     function moveCarRight(carRight) {
//         switch (true) {
//             case carRight.classList.contains('c1'):
//                 carRight.classList.remove('c1')
//                 carRight.classList.add('c3')
//                 break
//             case carRight.classList.contains('c2'):
//                 carRight.classList.remove('c2')
//                 carRight.classList.add('c1')
//                 break
//             case carRight.classList.contains('c3'):
//                 carRight.classList.remove('c3')
//                 carRight.classList.add('c2')
//                 break
//         }
//     }


//     //move the logs
//     function autoMoveLogs() {
//         logsLeft.forEach(logLeft => moveLogLeft(logLeft))
//         logsRight.forEach(logRight => moveLogRight(logRight))
//     }

//     //move the log left on a time loop
//     function moveLogLeft(logLeft) {
//         switch (true) {
//             case logLeft.classList.contains('l1'):
//                 logLeft.classList.remove('l1')
//                 logLeft.classList.add('l2')
//                 break
//             case logLeft.classList.contains('l2'):
//                 logLeft.classList.remove('l2')
//                 logLeft.classList.add('l3')
//                 break
//             case logLeft.classList.contains('l3'):
//                 logLeft.classList.remove('l3')
//                 logLeft.classList.add('l4')
//                 break
//             case logLeft.classList.contains('l4'):
//                 logLeft.classList.remove('l4')
//                 logLeft.classList.add('l5')
//                 break
//             case logLeft.classList.contains('l5'):
//                 logLeft.classList.remove('l5')
//                 logLeft.classList.add('l1')
//                 break
//         }
//     }

//      //move the log left on a time loop
//      function moveLogRight(logRight) {
//         switch (true) {
//             case logRight.classList.contains('l1'):
//                 logRight.classList.remove('l1')
//                 logRight.classList.add('l5')
//                 break
//             case logRight.classList.contains('l2'):
//                 logRight.classList.remove('l2')
//                 logRight.classList.add('l1')
//                 break
//             case logRight.classList.contains('l3'):
//                 logRight.classList.remove('l3')
//                 logRight.classList.add('l2')
//                 break
//             case logRight.classList.contains('l4'):
//                 logRight.classList.remove('l4')
//                 logRight.classList.add('l3')
//                 break
//             case logRight.classList.contains('l5'):
//                 logRight.classList.remove('l5')
//                 logRight.classList.add('l4')
//                 break
//         }
//     }

//     //rules to win Frogger
//     function win() {
//         if (squares[4].classList.contains('frog')) {
//             result.innerHTML = 'YOU WON'
//             squares[currentIndex].classList.remove('frog')
//             clearInterval(timerId)
//             document.removeEventListener('keyup', moveFrog)
//         }
//     }

//     //rules to lose Frogger 
//     function lose () {
//         if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
//         || (squares[currentIndex].classList.contains('l5'))
//         || (squares[currentIndex].classList.contains('l4'))) {
//             result.innerHTML = 'YOU LOSE'
//             squares[currentIndex].classList.remove('frog')
//             clearInterval(timerId)
//             document.removeEventListener('keyup', moveFrog)
//         }
//     }

//     //move the frog when its on the log moving left
//     function moveWithLogLeft() {
//         if (currentIndex >= 27 && currentIndex < 35) {
//             squares[currentIndex].classList.remove('frog')
//             currentIndex += 1
//             squares[currentIndex].classList.add('frog')
//         }
//     }

//     //move the frog when its on the log moving right
//     function moveWithLogRight() {
//         if (currentIndex > 18 && currentIndex <= 26) {
//             squares[currentIndex].classList.remove('frog')
//             currentIndex -= 1
//             squares[currentIndex].classList.add('frog')
//         }
//     }

//     //all the function that move pieces
//     function movePieces() {
//         currentTime--
//         timeLeft.textContent = currentTime
//         autoMoveCars()
//         autoMoveLogs()
//         moveWithLogLeft()
//         moveWithLogRight()
//         lose()
//     }

//     //to start and pause the game
//     startBtn.addEventListener('click', () => {
//         if(timerId) {
//             clearInterval(timerId)
//         }   else {
//             timerId = setInterval(movePieces, 1000)
//             document.addEventListener('keyup', moveFrog)
//         }
//     })

// })