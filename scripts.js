"use strict";

const playerFactory = (choice) => {
    return { choice };
};
const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const insertChoice = (id, currentSign) => {
        board[id] = currentSign
    }
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }
    return { board, insertChoice, reset };
})();
const displayController = (() => {
    const cells = document.querySelectorAll('.cell')
    const winnerDiv = document.querySelector('.winner')
    let restartBtn = document.querySelector('.restart')

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const { target } = e;
            gameController.playRound(target.id);
        })
    })
    
    restartBtn.addEventListener('click', () => {
        gameBoard.reset()
        reset()
        gameController.reset()
    })

    const reset = () => {
        cells.forEach(cell => {
            cell.innerHTML = ""
        })
        winnerDiv.innerHTML = ""
    };
    const updateBoard = (id, currentSign) => {
        cells.forEach(cell => {
            if (cell.id == id) {
                cell.innerHTML = currentSign
            }
        })
    };
    const displayWinner = (winner) => {
        if (winner === '') {
            winnerDiv.innerHTML = "It's a draw!"
        } else {
            winnerDiv.innerHTML = winner + " wins!"
        }
    }

    return { updateBoard, displayWinner, reset }
})();
const gameController = (() => {
    const playerOne = playerFactory('x');
    const playerTwo = playerFactory('o');
    let round = 1;
    let isOver = false;
    const playRound = (id) => {
        const currentSign = getCurrentPlayerSign()
        if (!isOver && gameBoard.board[id] === '') {
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
            } else if (combination.every(v => o_index.includes(v))) {
                displayController.displayWinner('O')
                isOver = true
            }
        })
        if (round === 9 && !isOver) {
            displayController.displayWinner('')
            isOver = true
        }
    }
    const reset = () => {
        isOver = false;
        round = 1;
    }
    return { playRound, reset }
})();