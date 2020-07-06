const WIDTH = 640;
const HEIGHT = 400;

const OVERSHOT = 0.1;

let history = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noLoop();

  // hue, saturation, brightness
  // black: x, x, 0
  // white: x, 0, 100
  colorMode(HSB);
}

function draw() {
  clear();
  background(0, 0, 88);
  randomSeed(seed);

  var pointsPerLine = 10;

  // interesting combinations: 1000, 30; 10000, 50 (use second width calc)
  var iterations = 1000;
  var standardDistribution = 30;

  for (var i = iterations; i > 0; i--) {
    // generate points
    controlPoints = [];

    for (
      // start a bit below the bottom edge of the canvas
      var y = HEIGHT + HEIGHT * OVERSHOT;
      // end a bit above the top edge of the canvas
      y > -HEIGHT * OVERSHOT;
      // step ~pointsPerLine times
      y = y - randomGaussian((HEIGHT + 2 * OVERSHOT) / pointsPerLine, 1)
    ) {
      controlPoints.push(
        createVector(
          WIDTH / 2 + randomGaussian(0, standardDistribution * i / iterations),
          // WIDTH / 2 + random(-standardDistribution * i / iterations, standardDistribution * i / iterations),
          y
        )
      );
    }

    // draw line
    stroke(0, 0, (iterations - i) * 100 / iterations);
    // strokeWeight(5 * i / iterations);
    drawLine(chaikinCurve(controlPoints, 0.75, 4));
    // stroke(0, 0, 0);
    // line(WIDTH / 2, HEIGHT, WIDTH / 2, 0);
  }
}
