/*-------------------------------- Objects --------------------------------*/
const currentBlock = {
    block: null,
    rotation: null,  // check if this is necessary

    // starting positions of 4x4 holding current block
    column: null, 
    row: null,
}

const tester = {
    board: [],
    column: null, 
    row: null,
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
const allBlocks = [lBlock[0], reverseLBlock[0], square[0], iBlock[0], zBlock[0], reverseZBlock[0], tBlock[0]]

/*------------------------------- Variables --------------------------------*/
let gameOver, blockInMotion, linesCleared, collided
let nextUp = []
let boardArray = []

/*------------------------- Cached Element References --------------------------*/
const board = document.querySelector(".board-container")


const form = document.querySelector("form")

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
          break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            console.log("up arrow - CW rotation")
          break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            console.log("left arrow - move left")
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            console.log("right arrow - move right")
            break;
    // Z, X, C
        case "z":
            console.log("Z key - CCW rotation")
            break;
        case "x":
            console.log("X key - CW rotation")
            break;
        case "c":
            console.log("C key - hold")
            break;
    // Esc
        case "Esc": // IE/Edge specific value
        case "Escape":
            console.log("esc button - pause")
            break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
})
// buttons for mobile
document.querySelector("#start").addEventListener("click", gameStart)
document.querySelector("#rotate-ccw").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#rotate-cw").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#move-left").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#move-right").addEventListener("click", function(event){
    console.log(event.target.id)
})
document.querySelector("#move-down").addEventListener("click", function(event){
    console.log(event.target.id)
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

// DEBUGGER: console.log(JSON.parse(JSON.stringify(boardArray)))
/*-------------------------------- Functions --------------------------------*/
init()

function init(){
    gameOver = false
    blockInMotion = false
    collided = false
    linesCleared = 0
    boardArray = []
    tester.board = []
    nextUp = []
    createBoard()
}

function createBoard(){
// note: slice is needed so that a new copy of the emptyRow/fullRow arrays is pushed onto the boardArray, rather than just a reference to the same array (this affects accessing elements in the array)
    boardArray.push(fullRow.slice()) // top border
    for (let i=0; i < 20; i++){
        boardArray.push(emptyRow.slice()) // board height of 20
    } 

    // bottom border requires two layers for testing
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
}

function gameStart(){
// function is called by game start listener
    while (nextUp.length < 4){
        fillNextUpArray()
    }
    placeNewBlock()
    blockInPlay()
}

function fillNextUpArray(){
    let randomIndex = Math.floor(Math.random() * 7)
    let randomBlock = allBlocks[randomIndex]
   
    nextUp.push(randomBlock)
    renderNextUp()
}
// init()
// fillNextUpArray()
// placeNewBlock()
function placeNewBlock(){
    console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    blockInMotion = true
    currentBlock.block = nextUp.shift() // input new block in play, should auto be in 0 rotation

    // initialize current block position to start position
    currentBlock.column = 4
    currentBlock.row = 0
    tester.column = currentBlock.column
    tester.row = currentBlock.row

    // test if placement hits anything
    // tester.board = boardArray.slice()
    
    buildTestBoard()
    placeBlockOnABoard(tester.board, tester)
    console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    checkForVerticalCollision() // if collided, return true
    console.log(collided)
    if (collided === false){
    // new block does not hit anything, so OK to place
        placeBlockOnABoard(boardArray, currentBlock)
        console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
        renderBoard()
    } else {
        console.log("GAME OVER: ", JSON.parse(JSON.stringify(boardArray)))
        gameOver = true
    }
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // fill nextUp array
    fillNextUpArray()
    // removeBlockOnBoard(tester.board, tester)
    // console.log(JSON.parse(JSON.stringify(tester.board)))

    
}
function buildTestBoard(){
    tester.board = []
    boardArray.forEach(row => {
        tester.board.push(row.slice())
    })
}

function placeBlockOnABoard(arr, obj){
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            arr[r + obj.row][c + obj.column] += currentBlock.block[r][c]        
        }
    } 
    // console.log("i finished the function")  
}

function checkForVerticalCollision(){
    for (let rowArr of tester.board){
        if (rowArr.includes(2)){
            collided = true
            return 
        }
    }
    collided = false
    return 
 }

function blockInPlay(){
    while (blockInMotion === true){
        console.log("entered blockinplay")
        // add timer with moveBlockDown
        moveBlockDown()  
        console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))      
    }
    while (gameOver === false){
        console.log("hello")
        console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
        // gameOver= true
        placeNewBlock()
        blockInPlay()
    }
}

function moveBlockDown(){
    // blockInMotion = false //GET RID OF THIS

    removeBlockOnBoard(tester.board, tester)
    // console.log("tester board RM: ", JSON.parse(JSON.stringify(tester.board)))
    tester.row += 1
    placeBlockOnABoard(tester.board, tester)
    checkForVerticalCollision() // if collided, return true
    if (collided === false){
    // new block does not hit anything, so OK to place
        removeBlockOnBoard(boardArray, currentBlock)
        currentBlock.row += 1
        placeBlockOnABoard(boardArray, currentBlock)
        renderBoard()
    } else{
        blockInMotion = false // block stops moving
        console.log("END OF MOVEBLOCKDOWN")
        renderBoard()
        checkForFullRow()
    }
    
    // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
}

function removeBlockOnBoard(arr, obj){
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            if (arr[r + obj.row][c + obj.column] === currentBlock.block[r][c]){
                arr[r + obj.row][c + obj.column] =0
            }
        }
    } 
}

function checkForFullRow(){
    for (let row = 1; row<21; row++){
    // check for full rows, excluding borders
        let count = 0
        for (let element of boardArray[row]){
            count += element
        }
        if (count === 12){
            linesCleared++
        }
    }
}

function renderBoard(){
    console.log("you still need to create render board()")
}

function renderNextUp(){
    console.log("you still need to create renderNextUp()")
}