function setup() {
  createCanvas(400, 400);
  noLoop();

  colorMode(HSB);
  rectMode(CENTER);
}

function draw() {
  clear();
  randomSeed(seed);

  background('black');
  noStroke();

  let squares = [];

  squares = squares.concat(createSquares(90, 6, 100, 3));
  squares = squares.concat(createSquares(180, 9, 70, 6));
  squares = squares.concat(createSquares(360, 12, 40, 12));

  let sorted_squares = squares.sort((a, b) => (a.radius < b.radius) ? 1 : -1);

  for (var i = 0; i < sorted_squares.length; i++) {
    let radius = sorted_squares[i]['radius'],
        x = sorted_squares[i]['x'],
        y = sorted_squares[i]['y'],
        side = sorted_squares[i]['side'];

    fill(0, 0, map(radius, 0, width / 2, 100, 0));
    rect(x, y, side, side);
  }
}

function createSquares(amount, stdDev, side, sideModifier) {
  let squares = [];

  for (var i = 0; i < amount; i++) {
    let x = randomGaussian(width / 2, width / stdDev);
    let y = randomGaussian(height / 2, height / stdDev);

    let a = width / 2 - x;
    let b = height / 2 - y;

    squares.push(
      {
        side: side - i / sideModifier,
        x: x,
        y: y,
        radius: Math.sqrt(a * a + b * b)
      }
    );
  }

  return squares;
}
