let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create an initial set of particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  for (let particle of particles) {
    particle.update();
    particle.display();
    particle.checkMouse(mouseX, mouseY);
  }
}
