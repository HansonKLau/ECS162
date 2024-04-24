let gridLength = 5;
let numberOfLanes = 9;
let currentIndex;
let time = 0.0;
let timerId;

// getting all cells of the grid
const cells = document.getElementsByClassName("cell");

function restart(e) {
    if (e.keyCode === 82) {
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.add("hide");
        stopGame();
        destroyGrid();
        createGrid();
        initializeGrid();
        const currentTime = document.getElementById("seconds-elapsed");
        currentTime.textContent = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('keydown', restart);

    // creating board
    createGrid();

    // setting starting positions
    initializeGrid();

    const small = document.getElementById("grid5");
    const medium = document.getElementById("grid10");
    const large = document.getElementById("grid15");

    small.addEventListener('click', () => {

        if (timerId) {
            stopGame();
        }
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.add("hide");
        gridLength = 5;
        destroyGrid();
        createGrid();
        initializeGrid();

    });

    medium.addEventListener('click', () => {

        if (timerId) {
            stopGame();
        }
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.add("hide");
        gridLength = 10;
        destroyGrid();
        createGrid();
        initializeGrid();

    });

    large.addEventListener('click', () => {

        if (timerId) {
            stopGame();
        }
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.add("hide");
        gridLength = 15;
        destroyGrid();
        createGrid();
        initializeGrid();

    });

    // hide results
    const resultContainer = document.getElementsByClassName("result-container");
    resultContainer[0].classList.add("hide");

    //to start and pause the game
    const startBtn = document.getElementById("start-button");
    startBtn.addEventListener('click', () => {
        console.log("clicked");

        if (timerId) {
            stopGame();

        }   else {
            // setting starting positions
            initializeGrid();

            const resultContainer = document.getElementsByClassName("result-container");
            resultContainer[0].classList.add("hide");

            const timeButton = document.getElementById("start-button");
            timeButton.textContent = "stop";

            time = 0;

            console.log("starting timer");
            const currentTime = document.getElementById("seconds-elapsed");
            currentTime.textContent = time;

            document.addEventListener('keydown', movePlayer);
            timerId = setInterval(updateTime, 100);

            // the longer the grid, the faster the speed
            let speedMultiplier = 1/gridLength

            // lane1 = setInterval(moveLane1, Math.floor(Math.random() * (501 * speedMultiplier)) + 200);
            lane1 = setInterval(moveLane1, Math.floor(Math.random() * (501 * speedMultiplier)) + 900*speedMultiplier);
            lane2 = setInterval(moveLane2, Math.floor(Math.random() * (501 * speedMultiplier)) + 900*speedMultiplier);
            lane3 = setInterval(moveLane3, Math.floor(Math.random() * (501 * speedMultiplier)) + 900*speedMultiplier);

            lane5 = setInterval(moveLane5, Math.floor(Math.random() * (501 * speedMultiplier)) + 900*speedMultiplier);
            lane6 = setInterval(moveLane6, Math.floor(Math.random() * (501 * speedMultiplier)) + 900*speedMultiplier);
            lane7 = setInterval(moveLane7, Math.floor(Math.random() * (501 * speedMultiplier)) + 900*speedMultiplier);
            
        }
    });

});

function moveLane1() {
    moveCars(1);
}

function moveLane2() {
    moveCars(2);
}

function moveLane3() {
    moveCars(3);
}

function moveLane5() {
    moveCars(5);
}

function moveLane6() {
    moveCars(6);
}

function moveLane7() {
    moveCars(7);
}

function moveCars(laneNum) {

    for (let i = laneNum * gridLength; i < (laneNum * gridLength) + gridLength; i++) {
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
    
    const currentTime = document.getElementById("seconds-elapsed");
    time = time + 0.1;
    currentTime.textContent = time.toFixed(1);

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
        beginningOfLane = i * gridLength;
        // setting cars up

        // every grid length/width of 5 add a car
        let sub5gridLength = gridLength - 5;
        // let count = 0;
        while (sub5gridLength >= 0) {
            // count++;
            let offset = Math.floor(Math.random() * (gridLength));
            if (cells[beginningOfLane + offset].classList.contains("red-car-right")) {
                offset = Math.floor(Math.random() * (gridLength));
            }
            cells[beginningOfLane + offset].classList.add("red-car-right");
            sub5gridLength = sub5gridLength - 5;
        }
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
        const result = document.getElementById("result");
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.remove("hide");
        if (time == 1) {
            result.textContent = "Nice! You delivered the sushi in " + time.toFixed(1) + " second!";
        } else {
            result.textContent = "Nice! You delivered the sushi in " + time.toFixed(1) + " seconds!";
        }
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
        const result = document.getElementById("result");
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.remove("hide");

        result.textContent = "Darn, I hope the sushi is still okay...";

        stopGame();
    }
}

function stopGame() {
    console.log("stopped");

    clearInterval(timerId);
    document.removeEventListener('keydown', movePlayer);
    timerId = undefined;

    const timeButton = document.getElementById("start-button");
    timeButton.textContent = "start";

    clearInterval(lane1);
    clearInterval(lane2);
    clearInterval(lane3);

    clearInterval(lane5);
    clearInterval(lane6);
    clearInterval(lane7);


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

function destroyGrid() {
    const cellLength = cells.length;

    for (let i = 0; i < cellLength; i++) {
        cells[0].remove();  
    }
    // const lanes = document.getElementsByClassName("lane");

    // console.log("cells: " + cellLength);
    // console.log("lanes: " + lanes.length);


    // let j = 0;
    // for (let i = 0; i < cellLength; i++) {

    //     if (i != 0 && i % cellLength/9 == 0) {
    //         console.log("lane" + i)
    //         j++;
    //     }

    //     if (j == 9) {
    //         break;
    //     }

    //     lanes[j].remove(cells[i]);

    // }
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
