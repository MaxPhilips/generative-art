// Constants
const Y_AXIS = 1;
const X_AXIS = 2;

let debug = false;
let darkness = 0.5;
let stars = 200;

function setup() {
  createCanvas(800, 800);
  noLoop();

  // hue         red 0 - 360 red
  // saturation dull 0 - 100 vibrant
  // brightness dark 0 - 100 light
  colorMode(HSB);
}

function draw() {
  randomSeed(seed);
  // randomSeed('2744179000');
  // randomSeed('891352100');
  // randomSeed('4070364191');
  // randomSeed('1075383286');
  // randomSeed('806925186');
  // randomSeed('4257629332');
  // randomSeed('2728217512');
  // randomSeed('1730905111');

  drawSky(darkness);

  drawStars(stars);
}

/**
 * Draws four gradients on the Y axis.
 */
function drawSky(fraction) {
  var step1 = randomGaussian(height / 3, height / 16);
  var step2 = randomGaussian(height / 4, height / 16);
  var step3 = randomGaussian(height / 5, height / 16);

  var [c1, c2, c3, c4, c5] = setGradientColors(fraction);

  setGradient(0,                     0, width,  step1, c1, c2, Y_AXIS);
  setGradient(0,                 step1, width,  step2, c2, c3, Y_AXIS);
  setGradient(0,         step1 + step2, width,  step3, c3, c4, Y_AXIS);
  setGradient(0, step1 + step2 + step3, width, height, c4, c5, Y_AXIS);

  if (debug) {
    push();

    noFill();
    stroke('white');

    line(0, step1, width, step1);
    line(0, step1 + step2, width, step1 + step2);
    line(0, step1 + step2 + step3, width, step1 + step2 + step3);

    fill('white');
    noStroke();

    text(c1.toString('hsba'), 2, 2, width, 20);

    text(c2.toString('hsba'), 2, step1 - 15, width, 20);
    text(c2.toString('hsba'), 2, step1 + 5, width, 20);

    text(c3.toString('hsba'), 2, step1 + step2 - 15, width, 20);
    text(c3.toString('hsba'), 2, step1 + step2 + 5, width, 20);

    text(c4.toString('hsba'), 2, step1 + step2 + step3 - 15, width, 20);
    text(c4.toString('hsba'), 2, step1 + step2 + step3 + 5, width, 20);

    text(c5.toString('hsba'), 2, height - 17, width, 20);

    pop();
  }
}

/**
 * Creates five random colors using HSB values, starting from near-black and ending with some near-fully-saturated and
 * near-fully-bright color. By default, this method assumes a uniform distribution from black (x, x, 0) to full
 * saturation/full brightness (x, 100, 100) and picks each color from its respective fifth of the total input space.
 *
 * Called with non-default parameters, this method:
 * - will not reach full saturation/full brightness when the fraction is more than 1
 * - will reach full saturation/full brightness early when the fraction is less than 1
 *
 * @param {number} fraction - The fraction of the color space to traverse. Defaults to 1 (indicating the entire scale
 *   from 0 to 100 saturation and 0 to 100 brightness will be traversed)
 */
function setGradientColors(fraction = 1) {
  hue1 = randomHue();
  hue2 = randomHue(hue1);
  hue3 = randomHue(hue2);
  hue4 = randomHue(hue3);
  hue5 = randomHue(hue4);

  return [
    color(hue1, random(fraction * 20),                 random(fraction * 20)),
    color(hue2, random(fraction * 20) + fraction * 20, random(fraction * 20) + fraction * 20),
    color(hue3, random(fraction * 20) + fraction * 40, random(fraction * 20) + fraction * 40),
    color(hue4, random(fraction * 20) + fraction * 60, random(fraction * 20) + fraction * 60),
    color(hue5, random(fraction * 20) + fraction * 80, random(fraction * 20) + fraction * 80)
  ];
}

/**
 * Picks a random hue. When an existing hue is passed in, the random hue will be picked within 120 degrees of it.
 *
 * @param {number} hue - Optional. A hue in the HSB color space (0 to 360) to seed the next pick with
 */
function randomHue(hue) {
  var low = 0, high = 360;

  if (typeof hue !== 'undefined') {
    low = hue - 120;
    high = hue + 120;
  }

  var returnHue = random(low, high);

  if (returnHue < 0)
    returnHue = returnHue + 360;
  if (returnHue >= 360)
    returnHue = returnHue - 360;

  return returnHue;
}

/**
 * Draws stars in the sky.
 * https://en.wikipedia.org/wiki/Stellar_classification#Harvard_spectral_classification
 *
 * @param {number} amount - The number of stars to draw
 */
function drawStars(amount) {
  fill(255);
  noStroke();

  excessWidth = width * 0.2;
  excessHeight = height * 0.2;

  // Draw class G, K, and M stars
  for (var i = 0; i < amount * .9615; i++) {
    circle(randInt(-excessWidth, width + excessWidth), randInt(-excessHeight, height + excessHeight), 1);
  }

  // Draw class A and F stars
  for (var i = 0; i < amount * .036; i++) {
    circle(randInt(-excessWidth, width + excessWidth), randInt(-excessHeight, height + excessHeight), 2);
  }

  // Draw class O and B stars
  for (var i = 0; i < amount * .0025; i++) {
    circle(randInt(-excessWidth, width + excessWidth), randInt(-excessHeight, height + excessHeight), 3);
  }
}

/**
 * Draws a linear gradient. You'll need to set up constants X_AXIS = 1 and Y_AXIS = 2 to pass in to this method's axis
 * argument. In X_AXIS mode, starts on the left and ends on the right. In Y_AXIS mode, starts on the top and ends on
 * the bottom.
 *
 * Interpolates colors in RGB mode since smooth transitions from 0 to 360 are a nightmare in HSB mode
 *
 * https://p5js.org/examples/color-linear-gradient.html
 *
 * @param {number} x - X coordinate to start from
 * @param {number} y - Y coordinate to start from
 * @param {number} w - Width of rectangular gradient section
 * @param {number} h - Height of rectangular gradient section
 * @param {p5.Color} startColor - Color to start with
 * @param {p5.Color} endColor - Color to end with
 * @param {number} axis - Axis to grade on. 1 for X, 2 for Y
 */
function setGradient(x, y, w, h, startColor, endColor, axis) {
  noFill();

  colorMode(RGB);

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i = i + 0.1) {
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

  colorMode(HSB);
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
    debug = false;
    darkness = 0.5;
    stars = 200;

    redrawSystematically();
  } else if (keyCode === 68) {
    // d
    debug = !debug;

    redrawSystematically();
  } else if (keyCode === 49) {
    // 1
    darkness -= 0.1;
    if (darkness < 0)
      darkness = 0;

    redrawSystematically();
  } else if (keyCode === 50) {
    // 2
    darkness += 0.1;
    if (darkness > 1)
      darkness = 1;

    redrawSystematically();
  } else if (keyCode === 51) {
    // 3
    stars -= 40;
    if (stars < 0)
      stars = 0;

    redrawSystematically();
  } else if (keyCode === 52) {
    // 4
    stars += 40

    redrawSystematically();
  }
}
