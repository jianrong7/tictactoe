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
const gameController = (() => {
    const playerOne = playerFactory('x');
    const playerTwo = playerFactory('o');
    let round = 1;
    let isOver = false;
    let ai = false;

    let scores = {
        'X': 10,
        'O': -10,
        'tie': 0
    }; 
    const aiMode = () => {
        ai = true;
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (gameBoard.board[i] === '') {
                gameBoard.board[i] = 'x'
                let score = minimax(gameBoard.board, 0, false);
                gameBoard.board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        playRound(move)
    }
    const minimax = (board, depth, isMaximizingPlayer) => {
        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        } 

        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (gameBoard.board[i] === '') {
                    gameBoard.board[i] = 'x'
                    let score = minimax(gameBoard.board, depth + 1, false)
                    gameBoard.board[i] = ''
                    if (score > bestScore) {
                        bestScore = score
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (gameBoard.board[i] === '') {
                    gameBoard.board[i] = 'o'
                    let score = minimax(gameBoard.board, depth + 1, true)
                    gameBoard.board[i] = ''
                    if (score < bestScore) {
                        bestScore = score
                    }
                }
            }
            return bestScore;
        }
    }
    const playerMode = () => {
        ai = false;
    }
    const playRound = (id) => {
        const currentSign = getCurrentPlayerSign()
        if (!isOver && gameBoard.board[id] === '') {
            gameBoard.insertChoice(id, currentSign)
            displayController.updateBoard(id, currentSign)
            let winner = checkWinner()
            if (winner === 'X') {
                displayController.displayWinner('X')
                isOver = true
            } else if (winner === 'O') {
                displayController.displayWinner('O')
                isOver = true
            } else if (winner === 'tie') {
                displayController.displayWinner('')
                isOver = true
            }
            round++;
        }
        if (round % 2 !== 0 && ai && isOver === false) {
            aiMode()
        }
    }
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerOne.choice : playerTwo.choice;
    }
    const checkWinner = () => {
        let winner = null;
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
                winner = 'X'
            } else if (combination.every(v => o_index.includes(v))) {
                winner = 'O'
            }
        })
        if (round === 9 && !isOver) {
            winner = 'tie'
        }
        return winner
    }
    const reset = () => {
        isOver = false;
        round = 1;
    }
    return { playRound, reset, aiMode, playerMode }
})();
const displayController = (() => {
    const cells = document.querySelectorAll('.cell')
    const winnerDiv = document.querySelector('.winner')
    const pvpBtn = document.querySelector('.player')
    const aiBtn = document.querySelector('.ai')
    const restartBtn = document.querySelector('.restart')

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const { target } = e;
            gameController.playRound(target.id);
        })
    })
    
    restartBtn.addEventListener('click', () => {
        reset()
        gameController.playerMode()
        pvpBtn.style.backgroundColor = "#0b40a1"
        aiBtn.style.backgroundColor = "#216EFC"
    })

    pvpBtn.addEventListener('click', () => {
        reset()
        gameController.playerMode()
        pvpBtn.style.backgroundColor = "#0b40a1"
        aiBtn.style.backgroundColor = "#216EFC"
    })
    aiBtn.addEventListener('click', () => {
        reset()
        gameController.aiMode()
        pvpBtn.style.backgroundColor = "#216EFC"
        aiBtn.style.backgroundColor = "#0b40a1"
    })

    const reset = () => {
        gameBoard.reset()
        cells.forEach(cell => {
            cell.innerHTML = ""
        })
        winnerDiv.innerHTML = ""
        gameController.reset()
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

    return { updateBoard, displayWinner }
})();