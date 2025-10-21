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
