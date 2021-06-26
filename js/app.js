/*-------------------------------- Objects --------------------------------*/
const currentBlock = {
    block: null,
    rotation: null,

    // starting positions of 4x4 holding current block
    xPos: null, 
    yPos: null,
}

const lBlock = {
    0: [0,0,0,0,
        0,0,1,0,
        1,1,1,0,
        0,0,0,0],
    1: [0,0,0,0,
        0,1,0,0,
        0,1,0,0,
        0,1,1,0],
    2: [0,0,0,0,
        0,0,0,0,
        1,1,1,0,
        1,0,0,0],
    3: [0,0,0,0,
        1,1,0,0,
        0,1,0,0,
        0,1,0,0],
}
const reverseLBlock = {
    0: [0,0,0,0,
        1,0,0,0,
        1,1,1,0,
        0,0,0,0],
    1: [0,0,0,0,
        0,1,1,0,
        0,1,0,0,
        0,1,0,0],
    2: [0,0,0,0,
        0,0,0,0,
        1,1,1,0,
        0,0,1,0],
    3: [0,0,0,0,
        0,1,0,0,
        0,1,0,0,
        1,1,0,0],
}
const square = {
    0: [0,0,0,0,
        0,1,1,0,
        0,1,1,0,
        0,0,0,0],
    1: [0,0,0,0,
        0,1,1,0,
        0,1,1,0,
        0,0,0,0],
    2: [0,0,0,0,
        0,1,1,0,
        0,1,1,0,
        0,0,0,0],
    3: [0,0,0,0,
        0,1,1,0,
        0,1,1,0,
        0,0,0,0],
}
const iBlock = {
    0: [0,0,0,0,
        1,1,1,1,
        0,0,0,0,
        0,0,0,0],
    1: [0,0,1,0,
        0,0,1,0,
        0,0,1,0,
        0,0,1,0],
    2: [0,0,0,0,
        0,0,0,0,
        1,1,1,1,
        0,0,0,0],
    3: [0,1,0,0,
        0,1,0,0,
        0,1,0,0,
        0,1,0,0],
}
const zBlock = {
    0: [0,0,0,0,
        1,1,0,0,
        0,1,1,0,
        0,0,0,0],
    1: [0,0,0,0,
        0,0,1,0,
        0,1,1,0,
        0,1,0,0],
    2: [0,0,0,0,
        0,0,0,0,
        1,1,0,0,
        0,1,1,0],
    3: [0,0,0,0,
        0,1,0,0,
        1,1,0,0,
        1,0,0,0],
}
const reverseZBlock = {
    0: [0,0,0,0,
        0,1,1,0,
        1,1,0,0,
        0,0,0,0],
    1: [0,0,0,0,
        0,1,0,0,
        0,1,1,0,
        0,0,1,0],
    2: [0,0,0,0,
        0,0,0,0,
        0,1,1,0,
        1,1,0,0],
    3: [0,0,0,0,
        1,0,0,0,
        1,1,0,0,
        0,1,0,0],
}
const tBlock = {
    0: [0,0,0,0,
        0,1,0,0,
        1,1,1,0,
        0,0,0,0],
    1: [0,0,0,0,
        0,1,0,0,
        0,1,1,0,
        0,1,0,0],
    2: [0,0,0,0,
        0,0,0,0,
        1,1,1,0,
        0,1,0,0],
    3: [0,0,0,0,
        0,1,0,0,
        1,1,0,0,
        0,1,0,0],
}


/*------------------------------- Constants --------------------------------*/
const emptyRow = [1,0,0,0,0,0,0,0,0,0,0,1] // 10 playable squares + 1 border square on each side
const fullRow = [1,1,1,1,1,1,1,1,1,1,1,1] // used for top and bottom borders
const allBlocks = [lBlock[0], reverseLBlock[0], square[0], iBlock[0], zBlock[0], reverseZBlock[0], tBlock[0]]

/*------------------------------- Variables --------------------------------*/
let gameStart, gamePause, gameOver, blockInMotion, linesCleared
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
document.querySelector("#start").addEventListener("click", function(event){
    console.log(event.target.id)
})
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


/*-------------------------------- Functions --------------------------------*/
init()
function init(){
    gameStart, gameOver, blockInMotion = false
    linesCleared = 0
    boardArray, nextUp = []
    createBoard()
}

function createBoard(){
    boardArray.push(fullRow) // top border
    for (let i=0; i < 20; i++){
    // height of 20
        boardArray.push(emptyRow)
    } 
    boardArray.push(fullRow) // bottom border
}