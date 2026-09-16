/*
Repo: https://github.com/baikash/p5.mouse-centered-gravity/
Version v1 | September 15, 2026
*/


// global vars
let balls = [];
let gravity = 1;

// setup

function setup() {
  frameRate(120);
  createCanvas(4096, 4096);
  gravity = 0.5;
  background(0);
  gravityPoint = createVector(width / 2, height / 2);
}

function mouseDragged() {
  let ball = new Ball(width, height, mouseX, mouseY);
  append(balls, ball);
}
function mouseClicked() {
  let ball = new Ball(width, height, mouseX, mouseY);
  append(balls, ball);
}

function getDistanceSquared(x1, y1, x2, y2) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

function checkGravity(ball, point) {
  let pos = ball.getPosVector();
  let force = 1 * 0.01 * gravity;
  let gravityPoint = point;
  if (pos.y > point.y - ball.radius) {
    ball.addForce(0, -force);
  }
  if (pos.y < point.y - ball.radius) {
    ball.addForce(0, force);
  }
  if (pos.x > point.x - ball.radius) {
    ball.addForce(-force, 0);
  }
  if (pos.x < point.x - ball.radius) {
    ball.addForce(force, 0);
  }
}

//animation loop
function draw() {
  background(0);
  for (var i = 0; i < balls.length; i++) {
    let ball = balls[i];
    let distanceSquared = getDistanceSquared(
      ball.posVector.x,
      ball.posVector.y,
      gravityPoint.x,
      gravityPoint.y
    );
    ball.g = distanceSquared / 256;
    let mousePoint =createVector(mouseX, mouseY);
    let distanceMouseSquared = getDistanceSquared(
      ball.posVector.x,
      ball.posVector.y,
      mousePoint.x,
      mousePoint.y
    );
    ball.g = distanceSquared / 256;
    ball.r = distanceMouseSquared / 256;
    checkGravity(ball, gravityPoint);
    checkGravity(ball, mousePoint);
    ball.update();
    ball.balanceForces();
  }
  console.log(balls.length);
}
