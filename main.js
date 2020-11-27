const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keys = [];

const player = {
  x: 150,
  y: 150,
  width: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 9,
  isMoving: false,
};

const playerSprite = new Image();
playerSprite.src = "/images/darthvader.png";
const background = new Image();
background.src = "/images/background.png";
const apple = new Image();
apple.src = "/images/apple.png";

function drawSprite(image, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(image, sX, sY, sW, sH, dX, dY, dW, dH);
}

let position = 0;

// setInterval(function () {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//   drawSprite(
//     playerSprite,
//     player.width * player.frameX,
//     player.height * player.frameY,
//     player.width,
//     player.height,
//     player.x,
//     player.y,
//     player.width,
//     player.height
//   );
//   movePlayer();
//   handlePlayerFrame();
//   requestAnimationFrame(animate);
// }, 100);

window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true; //adds element to array
  player.isMoving = true;
});
window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  player.isMoving = false;
});

function movePlayer() {
  if (keys[38] && player.y > 100) {
    player.y -= player.speed;
    player.frameY = 3;
  }
  if (keys[37] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
  }
  if (keys[40] && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
  }
  if (keys[39] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
  }
}

function handlePlayerFrame() {
  player.frameX < 3 && player.isMoving === true
    ? player.frameX++
    : (player.frameX = 0);
}

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//   drawSprite(
//     playerSprite,
//     player.width * player.frameX,
//     player.height * player.frameY,
//     player.width,
//     player.height,
//     player.x,
//     player.y,
//     player.width,
//     player.height
//   );
//   movePlayer();
//   handlePlayerFrame();
//   requestAnimationFrame(animate);
// }
// animate();

function createApple() {
  for (let i = 0; i < 30; i++) {
    ctx.drawImage(
      apple,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      20,
      20
    );
  }
}

let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    handlePlayerFrame();
  }
}

startAnimating(20);
