let numControlPoints = 10;
let iterations = 3;
let history = false;

function setup() {
  createCanvas(1280, 800);
  noLoop();
}

function draw() {
  clear();
  randomSeed(seed);

  background(220);

  var lineControlPoints = [];

  // make initial points
  for (var i = 0; i < numControlPoints; i++) {
    lineControlPoints.push(createRandomVector(width, height));
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
    // s
    saveCanvas(filename(), 'png');
  } else if (keyCode === 72) {
    // h
    select('#controls').style('display') == 'none' ?
      select('#controls').style('display', 'block') :
      select('#controls').style('display', 'none');
  } else if (keyCode === 82) {
    // r
    numControlPoints = 10;
    iterations = 3;
    history = false;

    redrawSystematically();
  } else if (keyCode === 89) {
    // y
    history = !history;

    redrawSystematically();
  } else if (keyCode >= 49 && keyCode <= 57) {
    // number keys
    iterations = keyCode - 48;
    console.log('set iterations to: ' + iterations);

    redrawSystematically();
  } else if (keyCode === UP_ARROW) {
    numControlPoints = numControlPoints + 1;
    console.log('increased numControlPoints to: ' + numControlPoints);

    redrawSystematically();
  } else if (keyCode === DOWN_ARROW) {
    numControlPoints = numControlPoints - 1;
    console.log('decreased numControlPoints to: ' + numControlPoints);

    redrawSystematically();
  }
}
