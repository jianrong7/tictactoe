const Gameboard = () => {
    let state = new Array(3);
    return state;
};
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

}
let x = playerFactory('x');
let o = playerFactory('o');
game(x, o).start();