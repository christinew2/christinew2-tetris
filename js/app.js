/*---------------------------------------------------------------------------------------------
........................................ CONSTANTS ............................................
----------------------------------------------------------------------------------------------*/
const currentState = {
    block: null,
    rotation: null, 
    blockObject: [], // starting positions of 4x4 holding current block
    column: null, 
    row: null,
}
const tester = {
    board: [],
    column: null, 
    row: null,
    block: null,
    rotation: null, 
}
const lBlock = {
    0: [[0,0,0,0],
        [0,0,1,0],
        [1,1,1,0],
        [0,0,0,0]],
    1: [[0,0,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0]],
    2: [[0,0,0,0],
        [0,0,0,0],
        [1,1,1,0],
        [1,0,0,0]],
    3: [[0,0,0,0],
        [1,1,0,0],
        [0,1,0,0],
        [0,1,0,0]],
}
const reverseLBlock = {
    0: [[0,0,0,0],
        [1,0,0,0],
        [1,1,1,0],
        [0,0,0,0]],
    1: [[0,0,0,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,1,0,0]],
    2: [[0,0,0,0],
        [0,0,0,0],
        [1,1,1,0],
        [0,0,1,0]],
    3: [[0,0,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [1,1,0,0]],
}
const square = {
    0: [[0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]],
    1: [[0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]],
    2: [[0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]],
    3: [[0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]],
}
const iBlock = {
    0: [[0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],
    1: [[0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]],
    2: [[0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]],
    3: [[0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]],
}
const zBlock = {
    0: [[0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]],
    1: [[0,0,0,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,1,0,0]],
    2: [[0,0,0,0],
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0]],
    3: [[0,0,0,0],
        [0,1,0,0],
        [1,1,0,0],
        [1,0,0,0]],
}
const reverseZBlock = {
    0: [[0,0,0,0],
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0]],
    1: [[0,0,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,1,0]],
    2: [[0,0,0,0],
        [0,0,0,0],
        [0,1,1,0],
        [1,1,0,0]],
    3: [[0,0,0,0],
        [1,0,0,0],
        [1,1,0,0],
        [0,1,0,0]],
}
const tBlock = {
    0: [[0,0,0,0],
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0]],
    1: [[0,0,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,1,0,0]],
    2: [[0,0,0,0],
        [0,0,0,0],
        [1,1,1,0],
        [0,1,0,0]],
    3: [[0,0,0,0],
        [0,1,0,0],
        [1,1,0,0],
        [0,1,0,0]],
}
const emptyRow = [1,0,0,0,0,0,0,0,0,0,0,1] // 10 playable squares + 1 border square on each side
const fullRow = [1,1,1,1,1,1,1,1,1,1,1,1] // used for top and bottom borders
const allBlocks = [lBlock, reverseLBlock, square, iBlock, zBlock, reverseZBlock, tBlock]

/*---------------------------------------------------------------------------------------------
........................................ VARIABLES ............................................
----------------------------------------------------------------------------------------------*/
let gameOver, gamePaused, linesCleared, timerIntervalId, holdingBlock
let nextUpList = []
let boardArray = []
let blktypeArray = []
let heldBlockObj = []

/*---------------------------------------------------------------------------------------------
................................. CACHED ELEMENT REFERENCES ....................................
----------------------------------------------------------------------------------------------*/
const board = document.querySelector("#board-container")
const nextUpContainer = document.querySelector("#next-block-container")
const holdContainer = document.querySelector("#hold")
const startPauseButton = document.querySelector("#start-pause")
const linesClearedDisplay = document.querySelector("#number")
const msgOverlay = document.querySelector("#msg-overlay")
const lightDarkBtn = document.querySelector("#light-dark-mode")
const allBtns = document.querySelectorAll(".btn")

/*---------------------------------------------------------------------------------------------
........................................ FUNCTIONS ............................................
----------------------------------------------------------------------------------------------*/
setUpDOM()
init()

/*----------------------------------- SET UP FUNCTIONS --------------------------------------*/
function setUpDOM(){
// on-screen set up: grid, next up spaces, hold space
    createDOMBoard()
    createNextUpSpaces()
    createHoldSpace()
}

function createDOMBoard(){
    for (let cell = 0; cell < (20 * 10); cell++) {
        let square = document.createElement("div")
        square.classList.add(`square`, `${cell}`)
      board.appendChild(square)
    }
}

function createNextUpSpaces(){
    for (let b = 0; b < 3; b ++){
        let box = document.createElement("div")
        box.classList.add(`next-box-${b}`, "block-holder")
        nextUpContainer.appendChild(box)
        let nextUpBox = document.querySelector(`.next-box-${b}`)
        for (let c = 0; c < (4*4); c++) {
          let cell = document.createElement("div")
          cell.classList.add("nextUpCell")
          nextUpBox.appendChild(cell)
        }
    }
}

function createHoldSpace(){
    for (let c = 0; c < (4*4); c++) {
        let cell = document.createElement("div")
        cell.classList.add("holdCell")
        holdContainer.appendChild(cell)
    }
}

/*----------------------------------- GAME FUNCTIONS --------------------------------------*/
function init(){
    gameOver = false
    collided = false
    gamePaused = true
    holdingBlock = false
    linesCleared = 0
    boardArray = []
    tester.board = []
    nextUpBlock = []
    nextUpList = []
    heldBlock = []

    startPauseButton.innerText = "Start"
    linesClearedDisplay.innerText = "0"
    msgOverlay.style.visibility = "hidden"
    createBoardArray()
}

function createBoardArray(){
// creates board array used for logic (standard tetris board is w10 x h20)
// includes 1 top border and 3 bottom borders used for testing valid moves - borders are not rendered on DOM 
    
    boardArray.push(fullRow.slice())
    for (let i=0; i < 20; i++){
        boardArray.push(emptyRow.slice())
    } 
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
    
    boardArray.forEach(row => {
        blktypeArray.push(row.slice())
    })
    renderBoard()
    gameStart()
}

function gameStart(){
    while (nextUpList.length < 3){
        fillNextUpList()
    }
    setUpNewBlockState()
}

function fillNextUpList(){
// adds a randomized block type to the nextUp array
    let randomIndex = Math.floor(Math.random() * 7)
    let randomBlockObj = allBlocks[randomIndex]
    nextUpList.push(randomBlockObj)

    if (nextUpList.length === 3){
        renderNextUp()
    }
}

function setUpNewBlockState(){
// first block in next up becomes current block; current state adjusted to match
    currentState.blockObject = nextUpList.shift()
    currentState.rotation = 0
    currentState.block = currentState.blockObject[currentState.rotation] 
    fillNextUpList()

    // initialize current block position to start position
    currentState.column = 4
    currentState.row = 0
    
    placeNewBlock()    
}

function placeNewBlock(){
// checks for valid placement with test block: 
// if tested block placement reveals no collision, place block on boardArray
// if tested block placement reveals collision, game over!
    setUpTester()
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() 
    if (collided === false){
        placeBlockOnABoard(boardArray, currentState)
        renderBoard()
    } else {
        startStopInterval("pause")
        gameOver = true
        msgOverlay.style.visibility = "visible"
    }    
}

function setUpTester(){
    // set up tester board and state to imitate current
        tester.board = []
        boardArray.forEach(row => {
            tester.board.push(row.slice())
        })
        tester.row = currentState.row
        tester.column = currentState.column
        tester.block = currentState.block
        tester.rotation = currentState.rotation
    }
        
function placeBlockOnABoard(boardArr, state){
// for current state or tester state
    if (state === currentState){
    // if current state: also adjust blktype 
        let blktype = determineBlockType(0, currentState.blockObject[0])
        for (let r = 0; r < 4; r++){
            for (let c = 0; c < 4; c++){
                if (state.block[r][c] === 1){
                    boardArr[r + state.row][c + state.column] = state.block[r][c]
                    blktypeArray[r + state.row][c + state.column] = blktype
                }
            }
        }
    } else{
        for (let r = 0; r < 4; r++){
            for (let c = 0; c < 4; c++){
                boardArr[r + state.row][c + state.column] += state.block[r][c]        
            }
        } 
    }
}
        
function checkForCollision(){
// checks for a 2 on the tester board, which indicates collision
    for (let rowArr of tester.board){
        if (rowArr.includes(2)){
            return true
        } 
    } 
    return false
}

function gravity(){
// block is always moving down
// if block hits the "bottom", check for lines to clear, set new block at top
    let collided = userMove("down")
    if (collided === true){
        checkForFullRow()
        setUpNewBlockState()
    }
}

function userMove(moveType){
// tests user input move
// if no collision with move, boardArray is updated accordingly
// if collision occurs with move, no move occurs
    if (gamePaused === false && gameOver === false){
        setUpTester()
        removeBlockOnABoard(tester.board, tester)
        whatMove(moveType, tester)
        placeBlockOnABoard(tester.board, tester)
        let collided = checkForCollision() 
        if (collided === false){
            removeBlockOnABoard(boardArray, currentState)
            whatMove(moveType, currentState)
            placeBlockOnABoard(boardArray, currentState)
            renderBoard()
        } 
        return collided 
    }
}

function removeBlockOnABoard(boardArr, state){
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            if (currentState.block[r][c] === 1 && boardArr[r + state.row][c + state.column] === currentState.block[r][c]){
                boardArr[r + state.row][c + state.column] = 0
                blktypeArray[r + state.row][c + state.column] = 0
            }
        }
    } 
}
  
function whatMove(moveType, state){
// adds offset according to moveType
    switch (moveType){
        case "down":
            state.row += 1
            break
        case "left":
            state.column -= 1
            break
        case "right":
            state.column += 1
            break
        case "CW":
            if (state.rotation < 3){
                state.rotation += 1
            } else{
                state.rotation = 0
            }
            state.block = currentState.blockObject[state.rotation]
            break
        case "CCW":
            if (state.rotation > 0){
                state.rotation -= 1
            } else{
                state.rotation = 3
            }
            state.block = currentState.blockObject[state.rotation]
            break
        default:
            return      
    }
}
        
function determineBlockType(rotation, block){
    if (lBlock[rotation] === block){
        return "lblock"
    } else if (reverseLBlock[rotation] === block){
        return "reverselblock"
    } else if (square[rotation] === block){
        return "squareblock"
    } else if (iBlock[rotation] === block){
        return "iblock"
    } else if (zBlock[rotation] === block){
        return "zblock"
    } else if (reverseZBlock[rotation] === block){
        return "reversezblock"
    } else if (tBlock[rotation] === block){
        return "tblock"
    }
}
/*---------------------------------- LINE CLEARING FUNCTIONS --------------------------------------*/
function checkForFullRow(){
    for (let row = 1; row<21; row++){
    // check for full rows, excluding borders
        let count = 0
        for (let i = 0; i < boardArray[row].length; i++){
            count += boardArray[row][i]
            if (count === 12){
                linesCleared++
                boardArray.splice(row, 1)
                boardArray.splice(1,0,emptyRow.slice())
                blktypeArray.splice(row, 1)
                blktypeArray.splice(1,0,emptyRow.slice())
                displayLinesCleared()
            }
        }
    }
    renderBoard()
}

function displayLinesCleared(){
    if (linesCleared < 10){
        linesClearedDisplay.innerText = `0${linesCleared}`
    } else{
        linesClearedDisplay.innerText = `${linesCleared}`
    }
}

/*----------------------------------- START/PAUSE FUNCTIONS --------------------------------------*/
function startPause(){
    if (gamePaused === false && gameOver === false){
    // if game was not paused and game is still going: pause on click
        startStopInterval("pause")
        gamePaused = true
    } else if (gamePaused === true && gameOver === false){
    // if game was already paused and game is still going: unpause
        gamePaused = false
        startStopInterval("start")
    }
}

function startStopInterval(actionStr){
    if (actionStr === "pause") {
        startPauseButton.innerText = "Start"
        clearInterval(timerIntervalId)
    } else if (actionStr === "start") {
        startPauseButton.innerText = "Pause"
        timerIntervalId = setInterval(gravity, 1000)
    }
}

/*--------------------------------------- HOLD FUNCTION -----------------------------------------*/
function hold() {
    if (holdingBlock === false){
    // if no block is being held, assign current block to "hold" 
        heldBlockObj = currentState.blockObject
        removeBlockOnABoard(boardArray, currentState)
        holdingBlock = true 
        renderBoard()
        setUpNewBlockState()
    } else{
    // if a block is being held, switch current and "hold" block
        let temp = heldBlockObj
        heldBlockObj = currentState.blockObject
        removeBlockOnABoard(boardArray, currentState)
        currentState.blockObject = temp
        currentState.block = currentState.blockObject[0]
        currentState.column = 4
        currentState.row = 0
        renderBoard()
        placeNewBlock()
    }
    renderHold()
} 

/*------------------------------------- RENDER FUNCTIONS --------------------------------------*/
function renderBoard(){
    let index = 0;
    for (let rows = 1; rows <= 20; rows++){
    // exclude the borders
        for (let col = 1; col < 11; col++){
            if (boardArray[rows][col] === 1){
                let blktype = blktypeArray[rows][col]
                board.children[index].classList.add(`${blktype}`)
            } else{
                board.children[index].className = (`square ${index}`)
            }
            index++
        }
    }
}

function renderNextUp(){
    for (let box = 0; box < 3; box ++){
        let index = 0;
        let nextUpBlock = nextUpList[box][0]
        let nextUpBox = document.querySelector(`.next-box-${box}`)
        let blktype = determineBlockType(0, nextUpBlock)
        for (let rows = 0; rows < 4; rows ++){
            for (let col = 0; col < 4; col ++){
                if (nextUpBlock[rows][col] === 1){
                    nextUpBox.children[index].className = "nextUpCell"
                    nextUpBox.children[index].classList.add(`${blktype}`)
                } else{
                    nextUpBox.children[index].className = "nextUpCell"
                }
                index ++
            }
        }
    }
}

function renderHold(){
    let index = 0;
    let heldBlock = heldBlockObj[0]
    let holdBox = document.querySelector("#hold")
    let blktype = determineBlockType(0, heldBlock)
    for (let rows = 0; rows < 4; rows ++){
        for (let col = 0; col < 4; col ++){
            if (heldBlock[rows][col] === 1){
                holdBox.children[index].className = "holdCell"
                holdBox.children[index].classList.add(`${blktype}`)
            } else{
                holdBox.children[index].className = "holdCell"
            }
            index ++
        }
    }
}

/*----------------------------------- DAY/NIGHT HANDLERS --------------------------------------*/
function setTheme(theme){
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme
    changeButtons()
}

function toggleTheme(){
    localStorage.getItem("theme") === "light" ?
    setTheme("dark")
    :
        setTheme("light");
}

function changeButtons(){
    if(localStorage.getItem("theme") === "light"){
        lightDarkBtn.innerHTML = "Dark Mode"
        for (let button of allBtns){
            button.className = "btn btn-outline-secondary buttons"
        }
    }
    if(localStorage.getItem("theme") === "dark"){
        lightDarkBtn.innerHTML = "Light Mode"
        for (let button of allBtns){
            button.className = "btn btn-outline-light buttons"
        }
    }
}

/*---------------------------------------------------------------------------------------------
..................................... EVENT LISTENERS ..........................................
----------------------------------------------------------------------------------------------*/

/*----------------------------------- KEYBOARD INPUTS --------------------------------------*/
document.addEventListener("keydown", function(event){
    if(event.defaultPrevented){
        return; 
    }
    switch (event.key) {
    // arrow keys
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            userMove("down")
            break
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            userMove("CW")
            break
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            userMove("left")
            break
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            userMove("right")
            break
    // Z, X, C
        case "z":
            userMove("CCW")
            break
        case "x":
            userMove("CW")
            break
        case "c":
            if (gamePaused === false && gameOver === false){
                hold()
            }
            break
    // Esc
        case "Esc": // IE/Edge specific value
        case "Escape":
            startPause()
            break
        default:
          return // Quit when this doesn't handle the key event.
      }
})

/*-------------------------------- BUTTONS FOR MOBILE --------------------------------------*/
startPauseButton.addEventListener("click", function(event){
    if (gameOver === false){
        startPause()
    } else {
        startStopInterval("pause")
        gamePaused = true
        init()
        gamePaused = false
        startStopInterval("start")
    }
})

document.querySelector("#rotate-ccw").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("CCW")
    }
})

document.querySelector("#rotate-cw").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("CW")
    }
})

document.querySelector("#move-left").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("left")
    }    
})

document.querySelector("#move-right").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("right")
    }    
})

document.querySelector("#move-down").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("down")
    }
})

document.querySelector("#hold-button").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        hold()
    }
})

/*-------------------------------- SETTINGS BUTTONS --------------------------------------*/
document.querySelector("#light-dark-mode").addEventListener("click", toggleTheme)
document.querySelector("#reset-button").addEventListener("click", function(event){
    startStopInterval("pause")
    gamePaused = true
    init()
    gamePaused = false
    startStopInterval("start")
})