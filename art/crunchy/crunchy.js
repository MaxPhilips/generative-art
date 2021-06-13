function setup() {
  createCanvas(400, 400);
  noLoop();

  colorMode(HSB);
}

function draw() {
  clear();
  randomSeed(seed);

  background('black');
  noStroke();

  var crunches = 400;

  // big crunches
  for (var i = 0; i < crunches / 3; i++) {
    side = random(100, 70);
    fill(0, 0, 100 - side);
    rect(random(-100, width + 100), random(-100, width + 100), side, side);
  }

  // medium crunches
  for (var i = 0; i < crunches / 2; i++) {
    side = random(69, 40);
    fill(0, 0, 100 - side);
    rect(random(-100, width + 100), random(-100, width + 100), side, side);
  }

  // small crunches
  for (var i = 0; i < crunches; i++) {
    side = random(39, 10);
    fill(0, 0, 100 - side);
    rect(random(-100, width + 100), random(-100, width + 100), side, side);
  }
}
