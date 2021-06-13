function setup() {
  createCanvas(640, 400);
  noLoop();
}

function draw() {
  background(220);

  // line(0, 0, 20, 390);
  // line(-40, 10, 40, 380);

  var x1 = -640, y1 = -40;
  var x2 = 0, y2 = 440;
  var deltaX1 = 16, deltaX2 = 8;
  var color = randInt(255);

  for (var i = 0; i < 81; i++) {
    line(x1, y1, x2, y2);
    stroke(color);

    x1 = x1 + (deltaX1 + (Math.round(randInt()) * 2 - 1) * Math.floor(randInt(2)));
    x2 = x2 + (deltaX2 + (Math.round(randInt()) * 2 - 1) * Math.floor(randInt()));
    
    y1 = y1 + (Math.round(randInt()) * 2 - 1) * Math.floor(randInt(8));
    y2 = y2 + (Math.round(randInt()) * 2 - 1) * Math.floor(randInt(4));
    
    color = randInt() * 255;
  }
}
