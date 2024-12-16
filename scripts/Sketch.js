let objs = [];

let FPS = 60;
let R = 255;
let G = 255;
let B = 255;
let particle = "CIRCLE";
let isPlaying = true;
let numParticles = 100; // Number of particles to be created

let c1, c2;

let happened = false;

function Node(position, givenSize, givenR, givenG, givenB) {
this.R = givenR;
this.G = givenG;
this.B = givenB;
this.position = createVector(position.x, position.y);
this.originalPosition = position.copy(); // Store the original position
this.position.x += random(20) - 10;
this.position.y += random(20) - 10;
this.size = createVector(0, 0);
this.sizeScale = 0.1;
let randomSize = givenSize / 2 + random(10);
this.baseSize = createVector(randomSize, randomSize);
this.timepast = 0;
this.isPlaying = isPlaying;
this.rotateAngle = random(2 * PI);
this.shapeType = particle;
this.followingMouse = false;
this.followTime = 0;

this.drawing = function () {
noStroke();
if (this.shapeType == particle) {
push(); // Save current transformation matrix
translate(this.position.x, this.position.y);

  fill(
    (this.size.x * this.R) / 10,
    (this.size.x * this.G) / 10,
    (this.size.x * this.B) / 10,
    255
  );
  ellipse(
    sin(this.timepast) * this.baseSize.x,
    cos(this.timepast) * this.baseSize.y,
    this.size.x,
    this.size.y
  );

  pop(); // Restore original transformation matrix
}
};

this.update = function () {
this.size = createVector(
this.baseSize.x + sin(this.timepast) * this.baseSize.x * this.sizeScale,
this.baseSize.y + sin(this.timepast) * this.baseSize.y * this.sizeScale
);
if (this.isPlaying) {
this.timepast += 1 / FPS;
}

if (dist(mouseX, mouseY, this.position.x, this.position.y) < 50 && !this.followingMouse) {
  this.followingMouse = true;
  this.followTime = millis();
}

// If following the mouse
if (this.followingMouse) {
  this.position.x = lerp(this.position.x, mouseX, 0.1);
  this.position.y = lerp(this.position.y, mouseY, 0.1);
  if (millis() - this.followTime > 500) {
    this.followingMouse = false;
  }
} else {
  //return
  this.position.x = lerp(this.position.x, this.originalPosition.x, 0.01);
  this.position.y = lerp(this.position.y, this.originalPosition.y, 0.01);
}
};
}

// Setup Function
function setup() {

setTimeout(() => {
  resizeCanvas(windowWidth, windowHeight);
}, 100);

function RefreshfreshPage(){
  if (happened == false){
    location.reload();
    happened = true;
  }
}

c1 = color(0); 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize to new dimensions
}

c2 = color(50, 50, 50);

frameRate(FPS);
let canvas = createCanvas(windowWidth, windowHeight);
canvas.position(0, 0);
canvas.style('z-index', '-1'); // Ensure canvas is behind other content

//spawn particles
for (let i = 0; i < numParticles; i++) {
let position = createVector(random(width), random(height));
objs.push(new Node(position, random(20, 40), R, G, B));
}
}

function draw() {

// Draw gradient background
for (let y = 0; y < height; y++) {
let inter = map(y, 0, height, 0, 1);
let c = lerpColor(c1, c2, inter);
stroke(c);
line(0, y, width, y);
}

// Draw particles
noStroke();
for (let i = 0; i < objs.length; i++) {
objs[i].drawing();
objs[i].update();
}
}
