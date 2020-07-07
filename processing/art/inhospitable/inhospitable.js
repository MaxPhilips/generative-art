const BLOCK = 40;

function setup() {
  createCanvas(1280, 720, WEBGL);
  noLoop();

  colorMode(HSB);
}

function draw() {
  clear();
  randomSeed(seed);
  noiseSeed(seed);

  background(0, 0, 95);

  // overhead view
  // camera(0, -1247.076581449591143, 0, 0, 0, 0, 0, 0, -1);
  // head on view
  // camera(0, 0, 1247.076581449591143, 0, 0, 0, 0, 1, 0);
  // rotated view
  rotateCameraAroundCenter(0, -623.538290724795571, randomGaussian(-PI / 6, PI / 18));

  stroke(0, 0, 0);

  var grid = noiseValues(17, 17, 0.01);

  var grid2 = decay(grid);
  var grid3 = decay(grid2);
  var grid4 = decay(grid3);

  for (var i = 0; i < grid4[0].length; i++) {
    for (var j = 0; j < grid4.length; j++) {
      if (grid4[i][j] != 0)
        drawSkyscraper(grid4[i][j], i, j, grid4.length);
    }
  }
}

/**
 * Rotates an input point on the XY plane around (0, 0). Sets the camera to the rotated point plus a static Z-component.
 *
 * @param {number} x - The X coordinate to start rotating from
 * @param {number} y - The Y coordinate to start rotating from
 * @param {number} angle - The amount in radians to rotate
 */
function rotateCameraAroundCenter(x, y, angle) {
  xRot = cos(angle) * (x - 0) - sin(angle) * (y - 0) + 0
  yRot = sin(angle) * (x - 0) + cos(angle) * (y - 0) + 0

  camera(xRot, yRot, 1247.076581449591143, 0, 0, 0, 0, 1, 0);
}

/**
 * Initializes a square 2d array with Perlin noise values for each coordinate.
 *
 * @param {number} side - The length of the sides of the square 2d array
 * @param {number} scale - The amount to scale coordinates by in order to increase cohesivity of noise values
 */
function noiseValues(side, scale) {
  var grid = [];

  for (var i = 0; i < side; i++) {
    var row = [];

    for (var j = 0; j < side; j++) {
      row.push(noise(i * scale, j * scale));
    }

    grid.push(row);
  }

  return grid;
}

/**
 * Decays some blocks of a city according to the following rules:
 * - Decay the block when its Moore neighborhood has population 1
 * - Decay the block when a random number [0, 9) is greater than the population of its Moore neighborhood
 * - Decay the block with probability 1%
 *
 * @param {Array.<Array.<string>>} grid - The city to decay
 */
function decay(grid) {
  var decayedGrid = [];

  for (var i = 0; i < grid[0].length; i++) {
    var row = [];

    for (var j = 0; j < grid.length; j++) {
      if (neighbors(grid, i, j) == 1) {
        row.push(0);
      } else if (random(9) > neighbors(grid, i, j)) {
        row.push(0);
      } else {
        if (random() > 0.99) {
          row.push(0);
        } else {
          row.push(grid[i][j]);
        }
      }
    }

    decayedGrid.push(row);
  }

  return decayedGrid;
}

/**
 * Calculates the population of a city block's Moore neighborhood.
 *
 * @param {Array.<Array.<string>>} grid - The city to find neighbors in
 * @param {number} i - The row of the block to find neighbors of
 * @param {number} j - The column of the block to find neighbors of
 */
function neighbors(grid, i, j) {
  var neighbors = 0;

  for (var ii = i - 1; ii < i + 2; ii++) {
    for (var jj = j - 1; jj < j + 2; jj++) {
      if (ii < 0 || jj < 0)
        continue;
      if (ii >= grid[i].length || jj >= grid.length)
        continue;
      if (grid[ii][jj] > 0)
        neighbors++
    }
  }

  return neighbors;
}

/**
 * Draws a skyscraper of a random category.
 *
 * @param {number} heightMultiplier - A component to be used when calculating the height of the skyscraper. You may
 *   want to initialize it via a noise function
 * @param {number} column - A column of a hypothetical street grid in which to draw the skyscraper
 * @param {number} row - A row of a hypothetical street grid in which to draw the skyscraper
 * @param {number} gridLength - The length of the hypothetical street system. The hypothetical street system is
 *   expected to be square
 */
function drawSkyscraper(heightMultiplier, column, row, gridLength) {
  fill(0, 0, 30 + random(10));
  var randomHeight = abs(BLOCK + 2 * BLOCK * heightMultiplier + randomGaussian(2 * BLOCK, BLOCK));

  var skyscraperCategory = random();

  if (skyscraperCategory > 0.6) {
    drawSkyscraper1(randomHeight, column, row, gridLength);
  } else if (skyscraperCategory > 0.3) {
    drawSkyscraper2(randomHeight, column, row, gridLength);
  } else {
    drawSkyscraper3(randomHeight, column, row, gridLength);
  }
}

/**
 * Draws a skyscraper of category 1.
 *
 * @param {number} height - The height of the skyscraper
 * @param {number} column - A column of a hypothetical street grid in which to draw the skyscraper
 * @param {number} row - A row of a hypothetical street grid in which to draw the skyscraper
 * @param {number} gridLength - The length of the hypothetical street system. The hypothetical street system is
 *   expected to be square
 */
function drawSkyscraper1(height, column, row, gridLength) {
  push();

  // x Number: left (negative)/right (positive) translation
  // y Number: up (negative)/down (positive) translation
  // z Number: backward (negative)/forward (positive) translation (webgl only) (Optional)
  translate((column - floor(gridLength / 2)) * 1.5 * BLOCK, -height / 2, (row - floor(gridLength / 2)) * 1.5 * BLOCK);

  // width Number: width of the box (Optional)
  // Height Number: height of the box (Optional)
  // depth Number: depth of the box (Optional)
  box(BLOCK, height, BLOCK);

  pop();
}

/**
 * Draws a skyscraper of category 2.
 *
 * @param {number} height - The height of the skyscraper
 * @param {number} column - A column of a hypothetical street grid in which to draw the skyscraper
 * @param {number} row - A row of a hypothetical street grid in which to draw the skyscraper
 * @param {number} gridLength - The length of the hypothetical street system. The hypothetical street system is
 *   expected to be square
 */
function drawSkyscraper2(height, column, row, gridLength) {
  middleHeight = height - height * 0.25 - BLOCK * 0.5;
  if (middleHeight < 0)
    return;

  push();
  translate((column - floor(gridLength / 2)) * 1.5 * BLOCK, -height * 0.125, (row - floor(gridLength / 2)) * 1.5 * BLOCK);
  box(BLOCK, height * 0.25, BLOCK);
  pop();

  push();
  translate((column - floor(gridLength / 2)) * 1.5 * BLOCK, -height + BLOCK * 0.5 + middleHeight / 2, (row - floor(gridLength / 2)) * 1.5 * BLOCK);
  box(BLOCK * 0.75, middleHeight, BLOCK * 0.75);
  pop();

  push();
  translate((column - floor(gridLength / 2)) * 1.5 * BLOCK, -height + BLOCK * 0.25, (row - floor(gridLength / 2)) * 1.5 * BLOCK);
  box(BLOCK * 0.5);
  pop();
}

/**
 * Draws a skyscraper of category 3. The skyscraper is equally likely to be oriented north-south or east-west.
 *
 * @param {number} height - The height of the skyscraper
 * @param {number} column - A column of a hypothetical street grid in which to draw the skyscraper
 * @param {number} row - A row of a hypothetical street grid in which to draw the skyscraper
 * @param {number} gridLength - The length of the hypothetical street system. The hypothetical street system is
 *   expected to be square
 */
function drawSkyscraper3(height, column, row, gridLength) {
  if (random() < 0.5) {
    push();
    translate((column - floor(gridLength / 2)) * 1.5 * BLOCK - BLOCK * 3 / 10, -height / 2, (row - floor(gridLength / 2)) * 1.5 * BLOCK);
    box(BLOCK * 2 / 5, height, BLOCK);
    pop();

    push();
    translate((column - floor(gridLength / 2)) * 1.5 * BLOCK + BLOCK * 3 / 10, -height / 2, (row - floor(gridLength / 2)) * 1.5 * BLOCK);
    box(BLOCK * 2 / 5, height, BLOCK);
    pop();
  } else {
    push();
    translate((column - floor(gridLength / 2)) * 1.5 * BLOCK, -height / 2, (row - floor(gridLength / 2)) * 1.5 * BLOCK - BLOCK * 3 / 10);
    box(BLOCK, height, BLOCK * 2 / 5);
    pop();

    push();
    translate((column - floor(gridLength / 2)) * 1.5 * BLOCK, -height / 2, (row - floor(gridLength / 2)) * 1.5 * BLOCK + BLOCK * 3 / 10);
    box(BLOCK, height, BLOCK * 2 / 5);
    pop();
  }
}
