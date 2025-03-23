const board = document.getElementById('game-board');
const scoreBoard = document.getElementById('score-board');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');
const restartBtn = document.getElementById('restart-btn');

const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 1 };
let score = 0;
let gameInterval;

function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}