const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const birdImg = new Image();
birdImg.src = "img/avion.png";

const pipeImg = new Image();
pipeImg.src = "img/poste.png";

const bgImg = new Image();
bgImg.src = "img/fondo.png";

let birdY = 150;
let birdVelocity = 0;
const gravity = 0.6;
const jump = -10;
let gameOver = false;

let pipes = [];
let frame = 0;
let score = 0;

document.addEventListener("keydown", () => {
  birdVelocity = jump;
});

function drawBird() {
  ctx.drawImage(birdImg, 65, birdY - 15, 50, 50);
}

function drawPipe(pipe) {
  ctx.save();
  ctx.translate(pipe.x + 25, pipe.top); // centro del tubo
  ctx.scale(1, -1);
  ctx.drawImage(pipeImg, -25, 0, 50, canvas.height);
  ctx.restore();

  ctx.drawImage(pipeImg, pipe.x, pipe.top + pipe.gap, 50, canvas.height);
}


function updatePipes() {
  if (frame % 90 === 0) {
    const top = Math.random() * 300 + 50;
    pipes.push({ x: canvas.width, top: top, gap: 180 });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;
    drawPipe(pipe);

    if (
      !gameOver &&
      80 + 15 > pipe.x && 80 - 15 < pipe.x + 50 &&
      (birdY - 15 < pipe.top || birdY + 15 > pipe.top + pipe.gap)
    ) {
      gameOver = true;
      alert("¡Game Over! Puntuación: " + score);
      document.location.reload();
    }

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

  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  birdVelocity += gravity;
  birdY += birdVelocity;

  drawBird();
  updatePipes();
  drawScore();

  frame++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
