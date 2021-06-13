// this artwork was live coded for Dev Con 2020 with audience input

function setup() {
  createCanvas(720, 720);
  noLoop();

  colorMode(HSL);
}

function draw() {
  clear();
  // seed to reproduce art from Dev Con: 83273282744
  randomSeed(seed);

  var hue = 265;

  drawShapes(hue, 50, 50, 9, width / 18, width / 12);
}

/**
 * Draws a grid of shapes.
 *
 * @param hue {number} - A base hue
 * @param saturation {number} - A base saturation
 * @param lightness {number} - A base lightness
 * @param shapeGridLength {number} - The length of the grid of shapes. The grid is square. Defaults to 1
 * @param shapeLength {number} - The length of an individual shape. Individual shapes are bounded by squares. Defaults
 *   to 1/9th of the width of the canvas
 * @param shapeSpace {number} - The space between shapes in the grid.  Defaults to 1/18th of the width of the canvas
 */
function drawShapes(hue, saturation, lightness, shapeGridLength = 1, shapeLength = width / 9, shapeSpace = width / 18) {
  background(color(hue, saturation - 25, lightness + 25));

  margin = (width - shapeLength * shapeGridLength - shapeSpace * (shapeGridLength - 1)) / 2;

  // iterate over the grid
  for (var i = margin; i < width - margin; i += (shapeLength + shapeSpace)) {
    for (var j = margin; j < width - margin; j += (shapeLength + shapeSpace)) {
      var colorToUse = pickColor(hue, saturation, lightness);

      // draw accent
      push();
      fill(color('white'));
      noStroke();

      drawShape(i + 4, j + 4, shapeLength);
      pop();

      // draw shape
      push();
      fill(colorToUse);
      noStroke();

      drawShape(i, j, shapeLength);
      pop();
    }
  }
}

/**
 * Picks a color by randomly varying an input hue and lightness.
 *
 * @param hue {number} - A base hue
 * @param saturation {number} - A base saturation. Returned without modification
 * @param lightness {number} - A base lightness
 *
 * @returns {p5.Color} - The space between shapes in the grid.  Defaults to 1/18th of the width of the canvas
 */
function pickColor(hue, saturation, lightness) {
  var hueToUse = random([hue, palette(hue).tertiary[0], palette(hue).tertiary[1]]);
  var lightnessToUse = random([lightness, lightness - 15, lightness + 15]);

  return color(hueToUse, saturation, lightnessToUse);
}

/**
 * Draws a shape.
 *
 * @param i {number} - The right translation
 * @param j {number} - The down translation
 * @param shapeLength {number} - The length of the shape
 */
function drawShape(i, j, shapeLength) {
  translate(i + shapeLength / 2, j + shapeLength / 2);
  rotate(PI / 4);
  rectMode(CENTER);
  square(0, 0, shapeLength);
}
