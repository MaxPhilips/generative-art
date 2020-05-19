function setup() {
  createCanvas(640, 400);
  frameRate(0.333);
}

function draw() {
  background(220);

  // line(0, 0, 20, 390);
  // line(-40, 10, 40, 380);
  
  var x1 = -640, y1 = -40;
  var x2 = 0, y2 = 440;
  var deltaX1 = 16, deltaX2 = 8;
  var color = Math.random() * 255;

  for (var i = 0; i < 81; i++) {
    line(x1, y1, x2, y2);
    stroke(color);

    x1 = x1 + (deltaX1 + (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 2));
    x2 = x2 + (deltaX2 + (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 1));
    
    y1 = y1 + (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 8);
    y2 = y2 + (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 4);
    
    color = Math.random() * 255;
  }

  // noLoop();
}
