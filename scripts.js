const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

const cellElements = document.querySelectorAll('.cell');
let circleTurn;
let xCounter = 0;
let oCounter = 0;
let xCount = document.querySelector("#xCounter");
let oCount = document.querySelector("#oCounter");
let restartBtn = document.querySelector("#restart");
let aiBtn = document.querySelector("#aiBtn");

function handleAI() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerHTML = ""
        cell.removeEventListener("click", handleClickAI)
        cell.addEventListener("click", handleClickAI, { once: true })
    });
}
function handleClickAI(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false, currentClass)
        handleAI();
    } else if (isDraw()) {
        endGame(true)
        handleAI();
    }
    swapTurns();
    aiTurn();
}

function aiTurn() {
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    for (let i = 0; i < cellElements.length; i++) {
        if (cellElements[i].innerHTML == "") {
            cellElements[i].classList.add(currentClass);
            cellElements[i].innerHTML = currentClass;
            if(checkWin(currentClass)) {
                endGame(false, currentClass)
                handleAI();
                swapTurns();
            } else if (isDraw()) {
                endGame(true)
                handleAI();
                swapTurns();
            }
            swapTurns();
            return;
        }
        
    }
}
// function emptySquares() {
//     return [...cellElements].filter(cell => cell.innerHTML == "");
// }
// function bestSpot() {
//     return minimax([...cellElements], O_CLASS).index;
// }
// function minimax(newBoard, player) {
//     var availSpots = emptySquares();
  
//     if (checkWin(newBoard, X_CLASS)) {
//       return {
//         score: -10
//       };
//     } else if (checkWin(newBoard, O_CLASS)) {
//       return {
//         score: 10
//       };
//     } else if (availSpots.length === 0) {
//       return {
//         score: 0
//       };
//     }
//     var moves = [];
//     for (var i = 0; i < availSpots.length; i++) {
//       var move = {};
//       move.index = newBoard[availSpots[i]];
//       newBoard[availSpots[i]] = player;
  
//       if (player == O_CLASS) {
//         var result = minimax(newBoard, X_CLASS);
//         move.score = result.score;
//       } else {
//         var result = minimax(newBoard, O_CLASS);
//         move.score = result.score;
//       }
  
//       newBoard[availSpots[i]] = move.index;
  
//       moves.push(move);
//     }
  
//     var bestMove;
//     if (player === O_CLASS) {
//       var bestScore = -10000;
//       for (var i = 0; i < moves.length; i++) {
//         if (moves[i].score > bestScore) {
//           bestScore = moves[i].score;
//           bestMove = i;
//         }
//       }
//     } else {
//       var bestScore = 10000;
//       for (var i = 0; i < moves.length; i++) {
//         if (moves[i].score < bestScore) {
//           bestScore = moves[i].score;
//           bestMove = i;
//         }
//       }
//     }
  
//     return moves[bestMove];
// }
  
restartBtn.addEventListener("click", startGame);
aiBtn.addEventListener("click", handleAI);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerHTML = ""
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    });
    
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false, currentClass)
        startGame();
    } else if (isDraw()) {
        endGame(true)
        startGame();
    }
    swapTurns();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerHTML = currentClass;
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}
function endGame(draw, currentClass) {
    if (draw) {
        startGame();
    } else {
        if (currentClass == X_CLASS) {
            xCounter++;
            xCount.innerHTML = xCounter;
            
        } else {
            oCounter++;
            oCount.innerHTML = oCounter;
            
        }
    }
}
function swapTurns() {
    circleTurn = !circleTurn;
}