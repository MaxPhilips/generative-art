function setup() {
  createCanvas(640, 400);
  noLoop();

  strokeCap(SQUARE);
}

function draw() {
  background(220);

  var x1 = 80, y1 = 360, x2 = 80, y2 = 40;

  for (var i = 0; i < 60; i++) {
    line(x1, y1, x2, y2);
    strokeWeight(random([2, 4]));

    x1 = x1 + random(4, 12);
    x2 = x2 + random(4, 12);
  }

  push();
  noStroke();
  fill(220);
  rect(80, 20, width - 80, 20);
  rect(80, 360, width - 80, 20);
  pop();
}

function section(code, x, y) {
  // implement this to make the barcode real
}
