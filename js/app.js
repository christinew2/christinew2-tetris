/*-------------------------------- Objects --------------------------------*/
const currentState = {
    block: null,
    rotation: null,  // check if this is necessary
    blockObject: [],
    // starting positions of 4x4 holding current block
    column: null, 
    row: null,
}

const tester = {
    board: [],
    column: null, 
    row: null,
    block: null,
    rotation: null,  // check if this is necessary
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

/*------------------------------- Constants --------------------------------*/
const emptyRow = [1,0,0,0,0,0,0,0,0,0,0,1] // 10 playable squares + 1 border square on each side
const fullRow = [1,1,1,1,1,1,1,1,1,1,1,1] // used for top and bottom borders
const allBlocks = [lBlock, reverseLBlock, square, iBlock, zBlock, reverseZBlock, tBlock]

/*------------------------------- Variables --------------------------------*/
let gameOver, gamePaused, linesCleared, timerIntervalId, holdingBlock
// let nextUpBlock = []
let nextUpList = []
let boardArray = []
let heldBlockObj = []

/*------------------------- Cached Element References --------------------------*/
const board = document.querySelector("#board-container")
const nextUpContainer = document.querySelector("#next-block-container")
const holdContainer = document.querySelector("#hold")
const startPauseButton = document.querySelector("#start-pause")
const linesClearedDisplay = document.querySelector("#number")

// DEBUGGER: console.log(JSON.parse(JSON.stringify(boardArray)))
 // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // fill nextUp array
    
    // removeBlockOnBoard(tester.board, tester)
    // console.log(JSON.parse(JSON.stringify(tester.board)))
/*-------------------------------- Functions --------------------------------*/
setUpDOM()
init()

/* ============================SET UP FUNCTIONS=============================== */
function setUpDOM(){
    createDOMBoard()
    createNextUpSpaces()
    createHoldSpace()
}

// On-screen game board set up
function createDOMBoard(){
    for (let cell = 0; cell < (20 * 10); cell++) {
      let square = document.createElement("div")
      square.classList.add(`square`, `${cell}`)
      board.appendChild(square)
    }
}
function createNextUpSpaces(){
// create 3 nextUp containers that contain 4x4 arrays to store nextUp blocks
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

/* ==============================GAME FUNCTIONS=============================== */
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
    createBoardArray()
}

function createBoardArray(){
// creates board array used for logic (standard tetris board is w10 x h20)
// board array consists of 1 top border and 3 bottom borders used for testing valid moves - borders are not rendered on DOM 
// note: slice is needed so that a new copy of the emptyRow/fullRow arrays is pushed onto the boardArray, rather than just a reference to the same array (this affects accessing elements in the array)
    
    boardArray.push(fullRow.slice())
    for (let i=0; i < 20; i++){
        boardArray.push(emptyRow.slice())
    } 
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
    renderBoard()
    gameStart()
}

function gameStart(){
// function is called by game start listener
    while (nextUpList.length < 3){
        fillNextUpList()
    }
    setUpNewBlock()
}

function fillNextUpList(){
// adds a random block type (entire object is added) to the nextUp array
    let randomIndex = Math.floor(Math.random() * 7)
    let randomBlockObj = allBlocks[randomIndex]
   
    nextUpList.push(randomBlockObj)

    if (nextUpList.length === 3){
        renderNextUp()
    }
}

function setUpNewBlock(){
// sets the nextUp block as the current block
// adjusts current state accordingly
    currentState.blockObject = nextUpList.shift()
    fillNextUpList()
    currentState.rotation = 0
    currentState.block = currentState.blockObject[currentState.rotation] 

    // initialize current block position to start position
    currentState.column = 4
    currentState.row = 0
    
    placeBlockAtTop()    
}

function placeBlockAtTop(){
// checks for valid move: 
// if tested block placement reveals no collision, place block on boardArray
// if tested block placement reveals collision, GAME OVER??
    setUpTester()
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() 
    console.log("collided? ", collided)
    if (collided === false){
        placeBlockOnABoard(boardArray, currentState)
        renderBoard()
    } else {
        startStopInterval("pause")
        gameOver = true
        renderGameOver()
    }    
}

function gravity(){
// block is always moving down
// if block hits the "bottom", check for lines to clear, set new block at top
    let collided = userMove("down")
    if (collided === true){
        checkForFullRow()
        setUpNewBlock()
    }
}

function userMove(moveType){
// tests user input move
// if no collision with move, boardArray is updated accordingly
// if collision occurs with move, no move occurs
    setUpTester()
    removeBlockOnABoard(tester.board, tester)
    whatMove(moveType, tester.board, tester)
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() 
    if (collided === false){
        removeBlockOnABoard(boardArray, currentState)
        whatMove(moveType, boardArray, currentState)
        placeBlockOnABoard(boardArray, currentState)
        renderBoard()
    } 
    return collided 
}

function removeBlockOnABoard(boardArr, state){
    let blktype = determineBlockType(0, currentState.block)
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            if (boardArr[r + state.row][c + state.column] === currentState.block[r][c]){
                if (state.row > 0 && boardArr[r + state.row][c + state.column] === 1){
                    let squareNum = 10*(r+ state.row - 1) + (c + state.column -1)
                    board.children[squareNum].className = (`square`, `${squareNum}`)
                }
                boardArr[r + state.row][c + state.column] =0
            }
        }
    } 
}
/* ===== Functions used for testing and placing blocks ===== */
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
// places a 4x4 holding block 
// could be for either boardArray or testerArray 
let blktype = determineBlockType()
    if (state === currentState){
        for (let r = 0; r < 4; r++){
            for (let c = 0; c < 4; c++){
                boardArr[r + state.row][c + state.column] += state.block[r][c] 
                if (state.row > 0 && boardArr[r + state.row][c + state.column] === 1){
                    let squareNum = 10*(r+ state.row - 1) + (c + state.column -1)
                    board.children.className = (`square`, `${squareNum}`)
                    board.children[squareNum].classList.add(`${blktype}`)

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
/* ========================================================== */

    
    
function whatMove(moveType, board, state){
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
        
function checkForFullRow(){
    for (let row = 1; row<21; row++){
    // check for full rows, excluding borders
        let count = 0
        for (let i = 0; i<boardArray[row].length; i++){
            count += boardArray[row][i]
            console.log(count)
            if (count === 12){
                console.log(boardArray[row])
                linesCleared++
                displayLinesCleared()
                boardArray.pop(boardArray[row])
                boardArray.splice(1,0, emptyRow.slice())
                console.log(linesCleared)
            }
        }
    }
    renderBoard()
}

function hold() {
    if (holdingBlock === false){
    // if no block is being held, assign current block to "hold" 
        heldBlockObj = currentState.blockObject
        removeBlockOnABoard(boardArray, currentState)
        holdingBlock = true 
        renderBoard()
        setUpNewBlock()
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
        placeBlockAtTop()
    }
    renderHold()
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

function displayLinesCleared(){
    if (linesCleared < 10){
        linesClearedDisplay.innerText = `0${linesCleared}`
    } else{
        linesClearedDisplay.innerText = `${linesCleared}`
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

function renderBoard(){
    // console.log("you still need to create render board()")
    let index = 0;
    for (let rows = 1; rows <= 20; rows++){
    // exclude the borders
        for (let col = 1; col < 11; col++){
            if (boardArray[rows][col] === 1){
                board.children[index].innerText = "X"
                // board.children[index].className = `square ${index} color`
            } else{
                board.children[index].innerText = ""
                // board.children[index].className = `square ${index}`
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
        console.log(blktype)
        for (let rows = 0; rows < 4; rows ++){
            for (let col = 0; col < 4; col ++){
                if (nextUpBlock[rows][col] === 1){
                    nextUpBox.children[index].innerText = "X"
                    nextUpBox.children[index].className = "nextUpCell"
                    nextUpBox.children[index].classList.add(`${blktype}`)
                } else{
                    nextUpBox.children[index].innerText = ""
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
                holdBox.children[index].innerText = "X"
                holdBox.children[index].className = "holdCell"
                holdBox.children[index].classList.add(`${blktype}`)
            } else{
                holdBox.children[index].innerText = ""
                holdBox.children[index].className = "holdCell"
            }
            index ++
        }
    }
}

function renderGameOver(){
    console.log("GAME IS OVER")
}

/*------------------------- Day/Night Theme Handlers -----------------------------*/

function setTheme(theme){
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme
}

function toggleTheme(){
    localStorage.getItem("theme") === "light" ?
    setTheme("dark")
    :
        setTheme("light");
}

/*----------------------------- Event Listeners --------------------------------*/
// keyboard input
document.addEventListener("keydown", function(event){
    if(event.defaultPrevented){
        return; // do nothing if event already handled  ******************** check on this??
    }
    switch (event.key) {
    // arrow keys
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            console.log("down arrow - soft drop")
            if (gamePaused === false && gameOver === false){
                userMove("down")
            }
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            console.log("up arrow - CW rotation")
            if (gamePaused === false && gameOver === false){
                userMove("CW")
            }
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            console.log("left arrow - move left")
            if (gamePaused === false && gameOver === false){
                userMove("left")
            }
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            console.log("right arrow - move right")
            if (gamePaused === false && gameOver === false){
                userMove("right")
            }
            break;
    // Z, X, C
        case "z":
            console.log("Z key - CCW rotation")
            if (gamePaused === false && gameOver === false){
                userMove("CCW")
            }
            break;
        case "x":
            console.log("X key - CW rotation")
            if (gamePaused === false && gameOver === false){
                userMove("CW")
            }
            break;
        case "c":
            console.log("C key - hold")
            if (gamePaused === false && gameOver === false){
                hold()
            }
            break;
    // Esc
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("esc button - pause")
            startPause()
            break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
})
// buttons for mobile

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
    console.log("I'M ROTATING COUNTERCLOCKWISE!!!")
})
document.querySelector("#rotate-cw").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("CW")
    }
    console.log("I'M ROTATING CLOCKWISE!!!")
})
document.querySelector("#move-left").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("left")
    }
    console.log("I'M MOVING LEFT!!!")
    
})
document.querySelector("#move-right").addEventListener("click", function(event){
    if (gamePaused === false && gameOver === false){
        userMove("right")
    }    
    console.log("I'M MOVING RIGHT!!!!!")
})
document.querySelector("#move-down").addEventListener("click", function(event){
    console.log("I'M MOVING DOWN!!!")
    if (gamePaused === false && gameOver === false){
        userMove("down")
    }
})
document.querySelector("#hold-button").addEventListener("click", function(event){
    console.log("I'M HOLDING A BLOCK")
    if (gamePaused === false && gameOver === false){
        hold()
    }
})
// settings
document.querySelector("#light-dark-mode").addEventListener("click", toggleTheme)
document.querySelector("#settings").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#controls-panel").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#reset-button").addEventListener("click", function(event){
    startStopInterval("pause")
    gamePaused = true
    init()
    gamePaused = false
    startStopInterval("start")
})