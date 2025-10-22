const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdY = 150;
let birdVelocity = 0;
const gravity = 0.6;
const jump = -10;

let pipes = [];
let frame = 0;
let score = 0;

document.addEventListener("keydown", () => {
  birdVelocity = jump;
});

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(80, birdY, 15, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, 50, pipe.top);
  ctx.fillRect(pipe.x, pipe.top + pipe.gap, 50, canvas.height - pipe.top - pipe.gap);
}



gameLoop();
