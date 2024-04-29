let gridLength = 5;
let numberOfLanes = 9;
let currentIndex;
let time = 0.0;
let timerId;

// getting all cells of the grid
const cells = document.getElementsByClassName("cell");

function checkKey(e) {
    if (e.keyCode === 82) {
        const resultContainer = document.getElementsByClassName("result-container");
        resultContainer[0].classList.add("hide");
        stopGame();
        destroyGrid();
        createGrid();
        initializeGrid();
        const currentTime = document.getElementById("seconds-elapsed");
        currentTime.textContent = 0;
    } else if (e.keyCode === 83) {
        start();
    }
}

document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('keydown', checkKey);

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
    startBtn.addEventListener('click', start);
});

function start() {
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
        let baseSpeed;

        if (gridLength == 5) {
            baseSpeed = 500;

        } else if (gridLength == 10) {
            baseSpeed = 250;

        } else {
            baseSpeed = 200;
        }

        // lane1 = setInterval(moveLane1, Math.floor(Math.random() * (501 * speedMultiplier)) + 200);
        lane1 = setInterval(moveLane1, baseSpeed - Math.floor(Math.random() * 51));
        lane2 = setInterval(moveLane2, baseSpeed - Math.floor(Math.random() * 51));
        lane3 = setInterval(moveLane3, baseSpeed - Math.floor(Math.random() * 51));

        lane5 = setInterval(moveLane5, baseSpeed - Math.floor(Math.random() * 51));
        lane6 = setInterval(moveLane6, baseSpeed - Math.floor(Math.random() * 51));
        lane7 = setInterval(moveLane7, baseSpeed - Math.floor(Math.random() * 51));
        
    }
}

function moveLane1() {
    moveWoman(1);
}

function moveLane2() {
    moveMan(2);
}

function moveLane3() {
    moveWoman(3);
}

function moveLane5() {
    moveMan(5);
}

function moveLane6() {
    moveWoman(6);
}

function moveLane7() {
    moveMan(7);
}

function moveMan(laneNum) {
    let onTop = false;
    for (let i = laneNum * gridLength; i < (laneNum * gridLength) + gridLength; i++) {
        if (cells[i].classList.contains("man-right")) {

            if (!onTop) {
                cells[i].classList.remove("man-right");
            } else {
                onTop = false;
            }
            
            if (i % gridLength == gridLength - 1) {
                // checking if at right edge
                console.log(i)
                cells[i - (gridLength - 1)].classList.add("man-right");  
                if (cells[i - (gridLength - 1)].classList.contains("man-right")) {
                    onTop = true;
                }
                
                console.log("at edge");
            } else {

                if (cells[i + 1].classList.contains("man-right")) {
                    onTop = true;
                }

                cells[i + 1].classList.add("man-right");
                console.log("not at edge");
                i++;
            }
        }
    }
    lose();
}

function moveWoman(laneNum) {   
    for (let i = (laneNum * gridLength) + (gridLength + 1); i >= (laneNum * gridLength); i--) {
        if (cells[i].classList.contains("woman-left")) {
            cells[i].classList.remove("woman-left");

            if (i % gridLength == 0) {
                cells[i + (gridLength - 1)].classList.add("woman-left");        
            } else {
                cells[i-1].classList.add("woman-left");
                i--;
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

    for (let i = 0; i < gridLength; i++) {
        cells[i].classList.remove("table");
        cells[i].classList.remove("up");
    }

    for (let i = gridLength; i < cells.length; i++) {
        cells[i].classList.remove("up");
        cells[i].classList.remove("man-right");
        cells[i].classList.remove("woman-left");
    }

    // setting goal
    const randomIndex = Math.floor(Math.random() * gridLength);
    cells[randomIndex].classList.add("table");

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

        // setting people up

        let pic;
        if (i == 2 || i == 5 || i == 7) {
            pic = "man-right";
        } else {
            pic = "woman-left";
        }

        // every grid length/width of 5 add a car
        let sub5gridLength = gridLength - 3;

        while (sub5gridLength >= 0) {
            let offset = Math.floor(Math.random() * (gridLength));
            while (cells[beginningOfLane + offset].classList.contains(pic)) {
                offset = Math.floor(Math.random() * (gridLength));
            }
            cells[beginningOfLane + offset].classList.add(pic);
            sub5gridLength = sub5gridLength - 3;
        }
    }
}

// adding functionality to move player
function movePlayer(e) {
    let checkIndex = currentIndex;
    switch(e.keyCode) {

        case 37: // left arrow
            e.preventDefault();
            if (currentIndex % gridLength !== 0) {
                currentIndex -=1;
            }
            break;
        case 38: // up arrow
            e.preventDefault();
            if (currentIndex - gridLength >=0) {
                currentIndex -= gridLength;
            }
            break;
        case 39: // right arrow
            e.preventDefault();
            if (currentIndex % gridLength < gridLength - 1) {
                currentIndex +=1;
            }
            break;
        case 40: // down arrow
            e.preventDefault();
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
        if (cells[i].classList.contains("up") &&  cells[i].classList.contains("table")) {
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
        if (cells[i].classList.contains("man-right") && cells[i].classList.contains("up")) {
            lost = true;
            break;
        }
        if (cells[i].classList.contains("woman-left") && cells[i].classList.contains("up")) {
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

function destroyGrid() {
    const cellLength = cells.length;

    for (let i = 0; i < cellLength; i++) {
        cells[0].remove();  
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
