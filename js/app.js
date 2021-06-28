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
let nextUp = []
let boardArray = []
let heldBlockObj = []

/*------------------------- Cached Element References --------------------------*/
const board = document.querySelector("#board-container")
const startPauseButton = document.querySelector("#start-pause")
const form = document.querySelector("form")

// DEBUGGER: console.log(JSON.parse(JSON.stringify(boardArray)))
 // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // fill nextUp array
    
    // removeBlockOnBoard(tester.board, tester)
    // console.log(JSON.parse(JSON.stringify(tester.board)))
/*-------------------------------- Functions --------------------------------*/
createDOMBoard()
init()

// On-screen game board set up
function createDOMBoard(){
    for (cell = 0; cell < (20 * 10); cell++) {
      let square = document.createElement("div")
      square.classList.add("square")
      board.appendChild(square)
    }
}

function init(){
    gameOver = false
    collided = false
    gamePaused = true
    holdingBlock = false
    linesCleared = 0
    boardArray = []
    tester.board = []
    nextUp = []
    heldBlock = []
    createBoardArray()
}

function createBoardArray(){
// creates board array used for logic
// standard tetris board is w10 x h20
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
    while (nextUp.length < 4){
        fillNextUpArray()
    }
    setUpNewBlock()
}

function fillNextUpArray(){
// adds a random block type (entire object is added) to the nextUp array
    let randomIndex = Math.floor(Math.random() * 7)
    let randomBlockObj = allBlocks[randomIndex]
   
    nextUp.push(randomBlockObj)
    renderNextUp()
}

function setUpNewBlock(){
// sets the nextUp block as the current block
// adjusts current state accordingly
    currentState.blockObject = nextUp.shift()
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
        fillNextUpArray()
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

function removeBlockOnABoard(arr, obj){
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            if (arr[r + obj.row][c + obj.column] === currentState.block[r][c]){
                arr[r + obj.row][c + obj.column] =0
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
        for (let r = 0; r < 4; r++){
            for (let c = 0; c < 4; c++){
                boardArr[r + state.row][c + state.column] += state.block[r][c]        
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

function checkForFullRow(){
    for (let row = 1; row<21; row++){
    // check for full rows, excluding borders
        let count = 0
        for (let element of boardArray[row]){
            count += element
        }
        if (count === 12){
            linesCleared++
            boardArray.pop(boardArray[row])
            boardArray.splice(1,0, emptyRow.slice())
        }
    }
    renderBoard()
}


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
} 

function startStopInterval(actionStr){
    if (actionStr === "pause") {
      clearInterval(timerIntervalId)
    } else if (actionStr === "start") {
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

function renderBoard(){
    // console.log("you still need to create render board()")
    let index = 0;
    for (let rows = 1; rows <= 20; rows++){
    // exclude the borders
        for (let col = 1; col < 11; col++){
            if (boardArray[rows][col] === 1){
                board.children[index].innerText = "X"
            } else{
                board.children[index].innerText = ""
            }
            index++
        }
    }
}

function renderNextUp(){
    console.log("you still need to create renderNextUp()")
}

function renderGameOver(){
    console.log("GAME IS OVER")
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

startPauseButton.addEventListener("click", startPause)

document.querySelector("#rotate-ccw").addEventListener("click", function(event){
    if (gamePaused === false){
        userMove("CCW")
    }
    console.log("I'M ROTATING COUNTERCLOCKWISE!!!")
})
document.querySelector("#rotate-cw").addEventListener("click", function(event){
    if (gamePaused === false){
        userMove("CW")
    }
    console.log("I'M ROTATING CLOCKWISE!!!")
})
document.querySelector("#move-left").addEventListener("click", function(event){
    if (gamePaused === false){
        userMove("left")
    }
    console.log("I'M MOVING LEFT!!!")
    
})
document.querySelector("#move-right").addEventListener("click", function(event){
    if (gamePaused === false){
        userMove("right")
    }    
    console.log("I'M MOVING RIGHT!!!!!")
})
document.querySelector("#move-down").addEventListener("click", function(event){
    console.log("I'M MOVING DOWN!!!")
    if (gamePaused === false){
        userMove("down")
    }
})
document.querySelector("#hold-button").addEventListener("click", function(event){
    console.log("I'M HOLDING A BLOCK")
    if (gamePaused === false){
        hold()
    }
})
// settings
document.querySelector("#light-dark-mode").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#settings").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#controls-panel").addEventListener("click", function(event){
    console.log(event.target.id)
})
form.addEventListener("reset", init) 