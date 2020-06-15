// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
const WIDTH = 640;
const HEIGHT = 400;
let c1, c2, c3, c4, c5;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  noLoop();
}

function draw() {
  randomSeed(seed());

  setGradientColors(25);

  drawGradients(WIDTH, HEIGHT);

  drawStars(200);
}

/**
 * Creates five random colors using RGB values, starting from near-black.
 *
 * By default, this method assumes a uniform distribution from black (0, 0, 0) to white (255, 255, 255) and picks each
 * color from its respective fifth of the total input space.
 *
 * Called with non-default parameters, this method:
 * - will not reach white when the {width} is less than 51
 * - will reach white early when the {width} is more than 51
 *
 * @param {number} width The range within which to select random RGB values from. Defaults to 51
 */
function setGradientColors(width = 51) {
  c1 = color(                randInt(width),                 randInt(width),                 randInt(width));
  c2 = color(    width + 1 + randInt(width),     width + 1 + randInt(width),     width + 1 + randInt(width));
  c3 = color(2 * width + 1 + randInt(width), 2 * width + 1 + randInt(width), 2 * width + 1 + randInt(width));
  c4 = color(3 * width + 1 + randInt(width), 3 * width + 1 + randInt(width), 3 * width + 1 + randInt(width));
  c5 = color(4 * width + 1 + randInt(width), 4 * width + 1 + randInt(width), 4 * width + 1 + randInt(width));
}

/**
 * Draws four gradients on the Y axis.
 *
 * @param {number} canvasWidth The width of the canvas
 * @param {number} canvasHeight The height of the canvas
 */
function drawGradients(canvasWidth, canvasHeight) {
  baseHeight = Math.floor(canvasHeight / 4);

  var step1 = randIntGauss(baseHeight, 10);
  var step2 = randIntGauss(baseHeight, 10);
  var step3 = randIntGauss(baseHeight, 10);
  var step4 = randIntGauss(baseHeight, 10);

  setGradient(0,                     0, WIDTH,        step1, c1, c2, Y_AXIS);
  setGradient(0,                 step1, WIDTH,        step2, c2, c3, Y_AXIS);
  setGradient(0,         step1 + step2, WIDTH,        step3, c3, c4, Y_AXIS);
  setGradient(0, step1 + step2 + step3, WIDTH, canvasHeight, c4, c5, Y_AXIS);
}

/**
 * Draws stars in the sky.
 * https://en.wikipedia.org/wiki/Stellar_classification#Harvard_spectral_classification
 *
 * @param {number} amount The number of stars to draw
 */
function drawStars(amount) {
  fill(255);
  noStroke();

  excessWidth = WIDTH * 0.2;
  excessHeight = HEIGHT * 0.2;

  // Draw class G, K, and M stars
  for (var i = 0; i < amount * .9615; i++) {
    circle(randInt(-excessWidth, WIDTH + excessWidth), randInt(-excessHeight, HEIGHT + excessHeight), 1);
  }

  // Draw class A and F stars
  for (var i = 0; i < amount * .036; i++) {
    circle(randInt(-excessWidth, WIDTH + excessWidth), randInt(-excessHeight, HEIGHT + excessHeight), 2);
  }

  // Draw class O and B stars
  for (var i = 0; i < amount * .0025; i++) {
    circle(randInt(-excessWidth, WIDTH + excessWidth), randInt(-excessHeight, HEIGHT + excessHeight), 3);
  }
}

/**
 * Draws a linear gradient.
 *
 * Recommended to set up constants X_AXIS = 1 and Y_AXIS = 2 for use with this method.
 * In X_AXIS mode, starts on the left and ends on the right. In Y_AXIS mode, starts on the top and ends on the bottom.
 *
 * https://p5js.org/examples/color-linear-gradient.html
 *
 * @param {number} x X coordinate to start from
 * @param {number} y Y coordinate to start from
 * @param {number} w Width of rectangular gradient section
 * @param {number} h Height of rectangular gradient section
 * @param {p5.Color} startColor Color to start with
 * @param {p5.Color} endColor Color to end with
 * @param {number} axis Axis to grade on. 1 for X, 2 for Y
 */
function setGradient(x, y, w, h, startColor, endColor, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(startColor, endColor, inter);

      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(startColor, endColor, inter);

      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
