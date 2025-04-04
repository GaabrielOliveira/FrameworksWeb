const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const canvasSize = 400;
const rows = canvasSize / scale;
const columns = canvasSize / scale;

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };

function update() {
  const head = { ...snake[0] };

  head.x += direction.x;
  head.y += direction.y;

  // Limite de tela (loop)
  if (head.x < 0) head.x = columns - 1;
  if (head.x >= columns) head.x = 0;
  if (head.y < 0) head.y = rows - 1;
  if (head.y >= rows) head.y = 0;

  snake.unshift(head);
  snake.pop();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
  }
}

function gameLoop() {
  update();
  draw();
}

setInterval(gameLoop, 150);

window.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "w":
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      break;
    case "s":
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      break;
    case "a":
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      break;
    case "d":
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      break;
  }
});
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
  
    if ((key === "w" || e.key === "ArrowUp") && direction.y !== 1) {
      direction = { x: 0, y: -1 };
    } else if ((key === "s" || e.key === "ArrowDown") && direction.y !== -1) {
      direction = { x: 0, y: 1 };
    } else if ((key === "a" || e.key === "ArrowLeft") && direction.x !== 1) {
      direction = { x: -1, y: 0 };
    } else if ((key === "d" || e.key === "ArrowRight") && direction.x !== -1) {
      direction = { x: 1, y: 0 };
    }
  });
  
