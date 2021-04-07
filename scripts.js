"use strict";

const playerFactory = (choice) => {
    return { choice };
};
const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    return { board };
})();
const displayController = (() => {

})();
const gameController = (() => {
    const playerOne = playerFactory('x');
    const playerTwo = playerFactory('o');
    let round = 1;
    let isOver = false;
    const playRound = () => {
        console.log(getCurrentPlayerSign())

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
    }

    return { playRound }
})();