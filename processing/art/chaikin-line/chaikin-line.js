const WIDTH = 640;
const HEIGHT = 400;

let numControlPoints = 5;
let iterations = 2;
let history = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noLoop();
}

function draw() {
  clear();
  randomSeed(seed);
  noiseSeed(seed);

  var lineControlPoints = [];

  // make initial points
  for (var i = 0; i < numControlPoints; i++) {
    lineControlPoints.push(createRandomVector(WIDTH, HEIGHT));
  }

  // calculate new chaikin points
  var newLineControlPoints = chaikinCurve(lineControlPoints, 0.75, iterations);

  // connect via lines
  drawLine(newLineControlPoints);
}

/**
 * Creates a random vector representing a point distributed uniformly throughout the canvas.
 *
 * @param {number} width - The width of the canvas
 * @param {number} height - The height of the canvas
 */
function createRandomVector(width, height) {
  return createVector(random(width), random(height));
}

/**
 * Controls the client.
 *
 * Overridden to add extra controls.
 */
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    redrawRandomly();
  } else if (keyCode === 83) {
    // 'S' key
    saveCanvas(filename(), 'png');
  } else if (keyCode === 72) {
    // 'H' key
    history = !history;

    redrawSystematically();
  } else if (keyCode >= 49 && keyCode <= 57) {
    // number keys
    iterations = keyCode - 48;
    console.log('set iterations to: ' + iterations);

    redrawSystematically();
  } else if (keyCode === 38) {
    // up arrow
    numControlPoints = numControlPoints + 1;
    console.log('increased numControlPoints to: ' + numControlPoints);

    redrawSystematically();
  } else if (keyCode === 40) {
    // down arrow
    numControlPoints = numControlPoints - 1;
    console.log('decreased numControlPoints to: ' + numControlPoints);

    redrawSystematically();
  }
}