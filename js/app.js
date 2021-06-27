/*-------------------------------- Objects --------------------------------*/
const currentBlock = {
    block: null,
    rotation: null,  // check if this is necessary
    rotationArray: [],
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
let gameOver, blockInMotion, linesCleared, timerIntervalId
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
    counterCWRotation()
    console.log("I'M ROTATING COUNTERCLOCKWISE!!!")
})
document.querySelector("#rotate-cw").addEventListener("click", function(event){
    CWRotation()
    console.log("I'M ROTATING CLOCKWISE!!!")
})
document.querySelector("#move-left").addEventListener("click", function(event){
    userLeftMovement()
    console.log("I'M MOVING LEFT!!!")
    
})
document.querySelector("#move-right").addEventListener("click", function(event){
    userRightMovement()
    console.log("I'M MOVING RIGHT!!!!!")
})
document.querySelector("#move-down").addEventListener("click", function(event){
    console.log("I'M MOVING DOWN!!!")
    // console.log("board array DOWN: ", JSON.parse(JSON.stringify(boardArray)))
    moveDown()
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
    timerIntervalId = null
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

    // bottom border requires three layers for testing
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
    boardArray.push(fullRow.slice()) 
}

function gameStart(){
// function is called by game start listener
    while (nextUp.length < 4){
        fillNextUpArray()
    }
    
    placeNewBlock()
}

function fillNextUpArray(){
    let randomIndex = Math.floor(Math.random() * 7)
    let randomBlockObj = allBlocks[randomIndex]
   
    nextUp.push(randomBlockObj)
    renderNextUp()
}

function placeNewBlock(){
    // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    // blockInMotion = true
    currentBlock.rotationArray = nextUp.shift()
    currentBlock.block = currentBlock.rotationArray[0] // input new block in play, should auto be in 0 rotation
    currentBlock.rotation = 0


    // initialize current block position to start position
    currentBlock.column = 4
    currentBlock.row = 0
    // tester.column = currentBlock.column
    // tester.row = currentBlock.row

    buildTestBoard()
    placeBlockOnABoard(tester.board, tester)
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    let collided = checkForCollision() // if collided, return true
    console.log(collided)
    if (collided === false){
    // new block does not hit anything, so OK to place
        placeBlockOnABoard(boardArray, currentBlock)
        // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
        renderBoard()
        blockInPlay()
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
    tester.row = currentBlock.row
    tester.column = currentBlock.column
    tester.block = currentBlock.block
    tester.rotation = currentBlock.rotation
}

function placeBlockOnABoard(arr, obj){
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            // console.log("obj.row: ",obj.row)
            // console.log("obj.column: ",obj.column)
            // console.log("current block value: ", currentBlock.block[r][c])
            arr[r + obj.row][c + obj.column] += obj.block[r][c]        
        }
    } 
    // console.log("i finished the function")  
}

function checkForCollision(){
    for (let rowArr of tester.board){

        if (rowArr.includes(2)){
            
            return true
        }
    }

    return false
}

function blockInPlay(){
    timerIntervalId = setInterval(gravity, 1000)
   
    // while (gameOver === false){
    //     console.log("hello")
    //     console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    //     // gameOver= true
    //     placeNewBlock()
    //     blockInPlay()
    // }
}

function gravity(){
    console.log("entered gravity")
    let collided = moveDown()
    if (collided === true){
        // blockInMotion = false // block stops moving
        clearInterval(timerIntervalId)
        timerIntervalId = null
        console.log("END OF gravity")
        checkForFullRow()
        // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
        placeNewBlock()
    }
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
}

function moveDown(){
    buildTestBoard()

    removeBlockOnABoard(tester.board, tester)
    // console.log("tester board RM: ", JSON.parse(JSON.stringify(tester.board)))
    tester.row += 1
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() // if collided, return true
    if (collided === false){
    // new block does not hit anything, so OK to place
        removeBlockOnABoard(boardArray, currentBlock)
        currentBlock.row += 1
        placeBlockOnABoard(boardArray, currentBlock)
        renderBoard()
    } 
    return collided 
}

function removeBlockOnABoard(arr, obj){
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

function userLeftMovement(event){
    buildTestBoard()

    removeBlockOnABoard(tester.board, tester)
    // console.log("tester board RM: ", JSON.parse(JSON.stringify(tester.board)))
    // console.log("current row and column: ", currentBlock.row,  currentBlock.column)
    // console.log("tester row and column: ", tester.row,  tester.column)
    tester.column -= 1
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() // if collided, return true
    console.log("collided: ", collided)
    if (collided === false){
    // new block does not hit anything, so OK to place
        removeBlockOnABoard(boardArray, currentBlock)
        currentBlock.column -= 1
        placeBlockOnABoard(boardArray, currentBlock)
        renderBoard()
    } 
}
function userRightMovement(event){
    buildTestBoard()

    removeBlockOnABoard(tester.board, tester)
    // console.log("tester board RM: ", JSON.parse(JSON.stringify(tester.board)))
    // console.log("current row and column: ", currentBlock.row,  currentBlock.column)
    // console.log("tester row and column: ", tester.row,  tester.column)
    tester.column += 1
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() // if collided, return true
    console.log("collided: ", collided)
    if (collided === false){
    // new block does not hit anything, so OK to place
        removeBlockOnABoard(boardArray, currentBlock)
        currentBlock.column += 1
        placeBlockOnABoard(boardArray, currentBlock)
        renderBoard()
    } else{
        // console.log("board array RIGHT: ", JSON.parse(JSON.stringify(boardArray)))
    }
    
}

function CWRotation (){
    buildTestBoard()
    removeBlockOnABoard(tester.board, tester)

    if (tester.rotation < 3){
        tester.rotation += 1
    } else{
        tester.rotation = 0
    }
    tester.block = currentBlock.rotationArray[tester.rotation]
    
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() // if collided, return true
    console.log("collided: ", collided)
    if (collided === false){
    // new block does not hit anything, so OK to place
        removeBlockOnABoard(boardArray, currentBlock)
        currentBlock.rotation = tester.rotation
        currentBlock.block = currentBlock.rotationArray[currentBlock.rotation]
        placeBlockOnABoard(boardArray, currentBlock)
        renderBoard()
    } else{
        console.log("board array ROTATION: ", JSON.parse(JSON.stringify(boardArray)))
    }
    
}
function counterCWRotation (){
    buildTestBoard()
    removeBlockOnABoard(tester.board, tester)

    if (tester.rotation > 0){
        tester.rotation -= 1
    } else{
        tester.rotation = 3
    }
    tester.block = currentBlock.rotationArray[tester.rotation]
    
    placeBlockOnABoard(tester.board, tester)
    let collided = checkForCollision() // if collided, return true
    console.log("collided: ", collided)
    if (collided === false){
    // new block does not hit anything, so OK to place
        removeBlockOnABoard(boardArray, currentBlock)
        currentBlock.rotation = tester.rotation
        currentBlock.block = currentBlock.rotationArray[currentBlock.rotation]
        placeBlockOnABoard(boardArray, currentBlock)
        renderBoard()
    } else{
        console.log("board array CCW ROTATION: ", JSON.parse(JSON.stringify(boardArray)))
    }
    
}
 
function renderBoard(){
    // console.log("you still need to create render board()")
    console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))

}

function renderNextUp(){
    console.log("you still need to create renderNextUp()")
}