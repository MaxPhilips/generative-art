function setup() {
  var width = 640, height = 400;
  createCanvas(640, 400, WEBGL);
  // frameRate(0.333);
}

function draw() {
  background(220);

  // line(0, 0, 20, 390);
  // line(-40, 10, 40, 380);
  
  // line(x1, y1, z1, x2, y2, z2);
  
  var leftTopBack = [-320, -200, 300],
      leftTopFront = [-320, -200, -300],
      rightTopFront = [320, -200, -300],
      rightTopBack = [320, -200, 300],
      leftBottomBack = [-320, 200, 300],
      leftBottomFront = [-320, 200, -300],
      rightBottomFront = [320, 200, -300],
      rightBottomBack = [320, 200, 300];

  line.apply(this, leftTopBack.concat(leftTopFront));
  line.apply(this, leftTopFront.concat(rightTopFront));
  line.apply(this, rightTopFront.concat(rightTopBack));
  line.apply(this, leftTopFront.concat(leftBottomFront));
  line.apply(this, rightTopFront.concat(rightBottomFront));
  line.apply(this, leftBottomBack.concat(leftBottomFront));
  line.apply(this, leftBottomFront.concat(rightBottomFront));
  line.apply(this, rightBottomFront.concat(rightBottomBack));

  noLoop();
}
