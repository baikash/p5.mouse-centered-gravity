class Ball {
  constructor(winW, winH, x, y) {
    this.boxW = winW;
    this.boxH = winH;
    this.radius = 1;
    this.diameter = 2 * this.radius;

    this.fallRate = 0;
    this.posVector = createVector(x, y);
    this.forces = [];

    this.r = 0;
    this.b = 0;
    this.g = 0;
    this.color = color(this.r, this.g, this.b);
  }

  getPosVector() {
    return this.posVector;
  }

  drawSelf() {
    this.color = color(this.r, this.g, this.b);

    fill(this.color);
    stroke(this.color);
    circle(this.posVector.x, this.posVector.y, this.diameter);
    fill(0);
    stroke(0);
  }

  addForce(x, y) {
    let newForce = createVector(x, y);
    append(this.forces, newForce);
  }

  applyForces() {
    for (let index = 0; index < this.forces.length; index++) {
      let force = this.forces[index];
      this.posVector.add(force);
    }
  }

  balanceForces() {
    let finalForce = createVector(0, 0);
    for (let index = 0; index < this.forces.length; index++) {
      let force = this.forces[index];
      finalForce.add(force);
    }
    this.forces = [];
    append(this.forces, finalForce);
  }

  update() {
    this.applyForces();
    this.drawSelf();
  }
}
