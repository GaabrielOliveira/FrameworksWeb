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

function draw() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.className = 'cell');

    snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
    });

    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].classList.add('food');
}

function move() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || isCollision(head)) {
        showGameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function isCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function placeFood() {
    do {
        food = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
}

function showGameOver() {
    gameOverText.textContent = `Game Over! Score: ${score}`;
    gameOverScreen.style.display = 'block';
    clearInterval(gameInterval);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 1 };
    score = 0;
    scoreBoard.textContent = 'Score: 0';
    gameOverScreen.style.display = 'none';
    placeFood();
    draw();
    gameInterval = setInterval(move, 200);
}

createBoard();
placeFood();
draw();
gameInterval = setInterval(move, 200);
window.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', resetGame);