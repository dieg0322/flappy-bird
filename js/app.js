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

function updatePipes() {
  if (frame % 90 === 0) {
    const top = Math.random() * 300 + 50;
    pipes.push({ x: canvas.width, top: top, gap: 120 });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;
    drawPipe(pipe);

    // Colisión
    if (
      80 + 15 > pipe.x && 80 - 15 < pipe.x + 50 &&
      (birdY - 15 < pipe.top || birdY + 15 > pipe.top + pipe.gap)
    ) {
      alert("¡Game Over! Puntuación: " + score);
      document.location.reload();
    }

    // Puntaje
    if (pipe.x + 50 === 80) score++;
  });

  pipes = pipes.filter(pipe => pipe.x + 50 > 0);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Puntuación: " + score, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  birdVelocity += gravity;
  birdY += birdVelocity;

  drawBird();
  updatePipes();
  drawScore();

  frame++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
