let r, g, b, scale;

function setup() {
  createCanvas(600, 600);
  noStroke();
  noLoop();
}

function draw() {
  clear();
  randomSeed(seed);

  r = random(255);
  g = random(255);
  b = random(255);
  scale = 0.6;

  recursiveSquare(width / 4, height / 4, width / 2, scale);
}

function recursiveSquare(x, y, side, scale) {
  if (side < 2) { return; }

  fill(color(r, g, b));

  square(x, y, side);

  r = r + 2;
  if (r > 255) { r = 0; }
  if (g++ > 255) { g = 0; }
  if (b++ > 255) { b = 0; }

  let ss = scale * side,
      ss2 = ss / 2,
      s2s = (1 - scale / 2) * side;

  recursiveSquare(x - ss2, y - ss2, ss, scale - random(0, 0.05));
  recursiveSquare(x + s2s, y - ss2, ss, scale - random(0, 0.05));
  recursiveSquare(x + s2s, y + s2s, ss, scale - random(0, 0.05));
  recursiveSquare(x - ss2, y + s2s, ss, scale - random(0, 0.05));
}
