"use strict";

const playerFactory = (choice) => {
    return { choice };
};
const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const insertChoice = (id, currentSign) => {
        board[id] = currentSign
    }
    return { board, insertChoice };
})();
const displayController = (() => {
    const cells = document.querySelectorAll('.cell')

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const { target } = e;
            gameController.playRound(target.id);
        })
    })

    const checkBoard = () => {

    };
    const updateBoard = (id, currentSign) => {
        cells.forEach(cell => {
            if (cell.id == id) {
                cell.innerHTML = currentSign
            }
        })
    };
    const displayWinner = (winner) => {
        const winnerDiv = document.querySelector('.winner')
        winnerDiv.innerHTML = winner + " wins!"
    }

    return { updateBoard, displayWinner }
})();
const gameController = (() => {
    const playerOne = playerFactory('x');
    const playerTwo = playerFactory('o');
    let round = 1;
    let isOver = false;
    const playRound = (id) => {
        const currentSign = getCurrentPlayerSign()
        if (!isOver) {
            gameBoard.insertChoice(id, currentSign)
            displayController.updateBoard(id, currentSign)
            checkWinner()
            round++;
        }
    }
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerOne.choice : playerTwo.choice;
    }
    const checkWinner = () => {
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
        const x_index = [];
        const o_index = [];
        for (let i = 0; i < 9; i++) {
            if (gameBoard.board[i] === 'x') {
                x_index.push(i)
            } else if (gameBoard.board[i] === 'o') {
                o_index.push(i)
            }
        }
        WINNING_COMBINATIONS.forEach(combination => {
            if (combination.every(v => x_index.includes(v))) {
                displayController.displayWinner('X')
                isOver = true
                endGame()
            } else if (combination.every(v => o_index.includes(v))) {
                displayController.displayWinner('O')
                isOver = true
                endGame()
            }
        })
    }
    const endGame = () => {
        
    }
    return { playRound }
})();
// displayController
//   Check for changes in gameBoard
//   Update changes from gameBoard onto screen

// gameController
//   PlayRound
//     Player 1 clicks
//       Check player one choice
//         Record player one choice onto gameBoard
//           Update display
//             Check winner
//               If win, reset board and declare winner
//               else, Switch player and round++
            
//   If 9 rounds have been reached, end game