var slatWidth = 26, slatHeight = 104;

var shouldLoop = false, isBlackAndWhite = true, fillHue = 0;

function setup() {
  createCanvas(640, 400);
  noLoop();

  stroke(color('black'));

  frameRate(1.67);

  colorMode(HSB);
}

function draw() {
  clear();
  randomSeed(seed);

  let slats = [];

  // build slats
  for (var x = random(-25, -1); x < width + slatWidth; x += randomGaussian(slatWidth)) {
    let h = randomGaussian(slatHeight, 10);

    for (var y = random(-120, -16); y < height + slatHeight; y += h) {
      let c = isBlackAndWhite ?
        color('white') :
        color(randomGaussian(fillHue, 10), random(35, 95), random(35, 95));

      slats.push([x, y, h, c]);
    }
  }

  shuffleArray(slats);
  slats.forEach(element => drawSlat(element[0], element[1], element[2], element[3]));
}

function drawSlat(x, y, h, c) {
  push();

  fill(c);
  rect(x, y, randomGaussian(slatWidth), h);

  pop();
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
    shouldLoop = false;
    noLoop();
    blackAndWhite = true;

    redrawSystematically();
  } else if (keyCode === 49) {
    // 1
    shouldLoop == false ? loop() : noLoop();

    shouldLoop = !shouldLoop;
  } else if (keyCode === 50) {
    // 2
    isBlackAndWhite = true;

    redrawRandomly();
  } else if (keyCode === 51) {
    // 3
    fillHue = random(360);
    isBlackAndWhite = false;

    redrawRandomly();
  }
}
