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

startGame();

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
    } else if (isDraw()) {
        endGame(true)
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
            startGame();
        } else {
            oCounter++;
            oCount.innerHTML = oCounter;
            startGame();
        }
    }
}
function swapTurns() {
    circleTurn = !circleTurn
}