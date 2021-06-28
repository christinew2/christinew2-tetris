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
let gameOver, gamePaused, blockInMotion, linesCleared, timerIntervalId
let nextUp = []
let boardArray = []
let heldBlockArray = []

/*------------------------- Cached Element References --------------------------*/
const board = document.querySelector("#board-container")
const startPauseButton = document.querySelector("#start-pause")
const form = document.querySelector("form")



// DEBUGGER: console.log(JSON.parse(JSON.stringify(boardArray)))
/*-------------------------------- Functions --------------------------------*/
createDOMBoard()
init()

function init(){
    gameOver = false
    blockInMotion = false
    collided = false
    gamePaused = false
    linesCleared = 0
    boardArray = []
    timerIntervalId = null
    tester.board = []
    nextUp = []
    heldBlock = []
    createBoard()
}

function createDOMBoard(){
    for (cell = 0; cell < (20 * 10); cell++) {
      let square = document.createElement("div");
    //   square.innerText = cell;
      square.classList.add("square")
      board.appendChild(square)
    }
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

    renderBoard()
}

function gameStart(){
// function is called by game start listener
    while (nextUp.length < 4){
        fillNextUpArray()
    }
    
    setUpNewBlock()
}

function fillNextUpArray(){
    let randomIndex = Math.floor(Math.random() * 7)
    let randomBlockObj = allBlocks[randomIndex]
   
    nextUp.push(randomBlockObj)
    renderNextUp()
}

function setUpNewBlock(){
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

    placeBlock()    
}

function placeBlock(){
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
        fillNextUpArray()
    } 
    if (collided === true){
        console.log("GAME OVER: ", JSON.parse(JSON.stringify(boardArray)))
        gameOver = true
        clearInterval(timerIntervalId)
        renderGameOver()
    }
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // console.log("board array: ", JSON.parse(JSON.stringify(boardArray)))
    // console.log("tester board: ", JSON.parse(JSON.stringify(tester.board)))
    // fill nextUp array
    
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
        setUpNewBlock()
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
 
function hold() {
    console.log("held block array: ",heldBlockArray)
    console.log("heldblockarray length: ", heldBlockArray.length)
    if (heldBlockArray[0] == undefined){
        heldBlockArray = currentBlock.rotationArray
        removeBlockOnABoard(boardArray, currentBlock)
        console.log("held block array (first hold): ", JSON.parse(JSON.stringify(heldBlockArray)))
        console.log(heldBlockArray.length)
        gameStart()

    } else{
        let tempArr = heldBlockArray
        heldBlockArray = currentBlock.rotationArray
        removeBlockOnABoard(boardArray, currentBlock)
        currentBlock.rotationArray = tempArr
        console.log("held block array (consec holds): ", JSON.parse(JSON.stringify(heldBlockArray)))
        console.log("current rotation Array: ", JSON.parse(JSON.stringify(currentBlock.rotationArray)))
        placeBlock()
    }
} 
function startPause(){
    // Ternary operator to swap the Start to Pause and
        // vice versa when it is pressed (so hot!)
        startPauseButton.textContent = (startPauseButton.textContent === "Start") ? "Pause" : "Start"
      
      if (timerIntervalId) {
        // this is your PAUSE ability
        clearInterval(timerIntervalId)
            // We have to clear the timerIntervalId to allow
            // the ability to pause the timer
        timerIntervalId = null
            // you need this for the restart , start?
        console.log("game should be paused")
        gamePaused = true
      } else {
        //   
        gamePaused = false
        gameStart()
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

// function renderBoard() {
//     for(let i = 0; i<boardArray.length; i++){
//         if (boardArray[i] === 1){
//             squares[i].innerHTML = chips
//         } else if (boardArray[i] === -1){
//             squares[i].innerHTML = fries
//         } else {
//             squares[i].innerHTML = ""
//         }
//     }
// }
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
                moveDown()
            }
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            console.log("up arrow - CW rotation")
            if (gamePaused === false && gameOver === false){
                CWRotation()
            }
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            console.log("left arrow - move left")
            if (gamePaused === false && gameOver === false){
                userLeftMovement()
            }
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            console.log("right arrow - move right")
            if (gamePaused === false && gameOver === false){
                userRightMovement()
            }
            break;
    // Z, X, C
        case "z":
            console.log("Z key - CCW rotation")
            if (gamePaused === false && gameOver === false){
                counterCWRotation()
            }
            break;
        case "x":
            console.log("X key - CW rotation")
            if (gamePaused === false && gameOver === false){
                CWRotation()
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
        counterCWRotation()
    }
    console.log("I'M ROTATING COUNTERCLOCKWISE!!!")
})
document.querySelector("#rotate-cw").addEventListener("click", function(event){
    if (gamePaused === false){
        CWRotation()
    }
    console.log("I'M ROTATING CLOCKWISE!!!")
})
document.querySelector("#move-left").addEventListener("click", function(event){
    if (gamePaused === false){
        userLeftMovement()
    }
    console.log("I'M MOVING LEFT!!!")
    
})
document.querySelector("#move-right").addEventListener("click", function(event){
    if (gamePaused === false){
        userRightMovement()
    }    
    console.log("I'M MOVING RIGHT!!!!!")
})
document.querySelector("#move-down").addEventListener("click", function(event){
    console.log("I'M MOVING DOWN!!!")
    // console.log("board array DOWN: ", JSON.parse(JSON.stringify(boardArray)))
    if (gamePaused === false){
        moveDown()
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