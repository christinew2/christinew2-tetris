/* 
General Pseudocode: 
1. HTML: Create basic elements based on wireframe
2. JS: Create objects, variables, constants 
3. JS: Store cached elements
4. JS: Add event listeners
5. JS: Create functions
6. CSS: Styling (including light/dark mode)
7. Deploy!


================ OBJECTS / VARIABLES / CONSTANTS ================ 
- OBJECTS
    a. objects that hold the different rotations for each type of tetris block
    b. currentBlock: holds current block in play + position of block in play

- VARIABLES
    a. gameStart: true/false ****check if necessary
    b. gamePause: true/false ****check if necessary
    c. gameOver: true/false
    d. blockInMotion: true/false (if block in play is at rest or not)
    e. linesCleared:initialize to 0
    (move to constants) f. shapes array: array of unique blocks - next-up array will randomize from this array
    g. nextUp array: array of block to be played
    h. hold: shape being held
    i. board array: array of row arrays
        example: 
        [   [0,0,0,0,0], 
            [0,1,1,0,0], 
            [0,0,1,0,0], 
            [0,0,1,0,0], 
            [0,0,0,0,0], 
            [0,0,0,0,0] ]
        - width: 10 + 2 (10 playable squares, 2 border squares filled with "1"s)
        - height: 20 + 2 (20 playable squares, 2 border squares filled with "1"s)
        - initialize to all 0s ("1"s indicate border or filled spot)
- CONSTANTS
    a. empty row array 

========================== EVENT LISTENERS ============================
    a. all keys in controls panel (arrows, Z, X, C, esc)
    b. all buttons for mobile
    c. "open control panel" button
    d. "settings" button
    e. reset button

============================= FUNCTIONS ================================== 
init(){
    clear/reset all variables 
    clear board
    create board
}

gameStart() { --> called by game start listener
    while (next-up array length = 4){
        --> while the next up array is not full
        fillNextUpArray()
    }
   
    placeNewBlock()
    blockInPlay()
}

fillNextUpArray(){
    push in randomized block to next-up array
    renderNextUp()
}

blockInPlay(){
    while (blockInMotion = true){
        moveBlockDown()
    }
    while (gameOver = false){
        placeNewBlock()
        blockInPlay()
    }   
}

placeNewBlock(){
    blockInMotion = true
    grab block from next-up array (shift) & add to board
    fillNextUpArray()
}

moveBlockDown(){
    ** Will need a timer for block to move down every interval
    checkForVerticalCollision()
    renderBoard()

    checkForFullRow()
}

checkForVerticalCollision(){
    --> block meets "bottom" (could be board bottom or other rested blocks)
    if yes:
        - blockInMotion = false
        - don't place shifted block
        - stop further movement down
        - checkForGameOver()
    if no: 
        - place downward-shifted block
        - return back to while (blockInMotion = true)moveBlockDown loop
}

checkForGameOver(){
    --> checks if block hits top border 
    if yes:
        - gameOver = true
        - renderGameOver()
}

checkForFullRow(){
    --> will check each row array for a 12 count (10 filled spots on board + 2 borders)
    if full row:
        - pop the full row from board array
        - unshift in an empty row to board array
        - increment "lines cleared" count
    if not full: 
        - return back into moveBlockDown
}

userMovement(){ --> called by user input (left, right, down)
    --> for "left/right" input: checkForHorizontalCollision()
    --> for "down" input: checkForVerticalCollision()

    renderBoard() (do I need this here?)
}

checkForHorizontalCollision(){
    if yes:
        - no block movement
        - something to counter edge case where user keeps pressing side arrows to keep game in play (some sort of timer?)
    if no: 
        - place sideways-shifted block according to right/left input
}

rotation(){ --> called by user input (up arrow, Z, X)
    depending on block in play:
        rotateL()
        rotateReverseL()
        rotateSquare()
        rotateI()
        rotateZ()
        rotateReverseZ()
        rotateT()
    checkForVerticalCollision()
}



gamePause(){ --> called by "game pause" button listener
    --> hold game state
    --> stop downward movement
    --> prohibit user input movement
}

hold(){ --> called by "hold" button listener
    if (hold = empty){
        hold = block in play
        gameStart() --> this will grab new block + fill next-up array
    } else {
        --> switch held block and block in play
        --> make sure both go back to spawn position 
        blockInPlay()
    }
}


========= RENDER FUNCTIONS
renderBoard(){
    --> renders board on DOM
}

renderNextUp(){
    --> renders the blocks in the Next Up section on the DOM
}

renderGameOver(){
    --> stops game 
    --> some sort of "Game Over" message
}

========================== BLOCK ROTATION FUNCTIONS ========================= 

- each block will have specific point as "center" of rotation
- tentative position names (will be declared in object)
    - 0: no rotation/spawn block
    - 1: block rotated clockwise (right) once from spawn
    - 2: block rotated twice from spawn (can be from either direction)
    - 3: block rotated counter-clockwise (left) once from spawn
- conditional statements for each kind of rotation and their respective offsets
    - 0 <--> 1
    - 1 <--> 2
    - 2 <--> 3
    - 3 <--> 1
- should call checkForHorizontalCollision: will prevent rotation if collision
    - for future additions: can add special offsets per Super Rotation System (SRS) to allow for "wall kicks"

*/

