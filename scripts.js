const Gameboard = (() => {
    const cellElements = document.querySelectorAll('.cell');
    const cells = [];
  
    cellElements.forEach(cell => cells.push(cell));
  
    return { cells };
  })();
const playerFactory = (name) => {
    let score = 0;
    let playerName = name;
    const win = () => {
        score++;
        let HTMLScore = document.querySelector(`#${playerName}Counter`);
        HTMLScore.innerHTML = score;
    }
    return { win };
}
const game = (playerOne, playerTwo) => {   
    const PLAYER_ONE_MARK = 'X';
    const PLAYER_TWO_MARK = 'O';
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
let x = playerFactory('x');
let o = playerFactory('o');
game(x, o).start();