let noiseScale = 0.025;

function setup() {
  createCanvas(400, 400);
  noLoop();
  noStroke();
}

function draw() {
  clear();
  randomSeed(seed);
  noiseSeed(seed);

  colorField(10, 210, 10, width / 3.5);
  colorField(50, 10, 80, width / 3.5);
}

function colorField(red, green, blue, density) {
  fill(red, green, blue, random(40, 40));

  for (var x = -width / 10; x < 1.1 * width; x = x + width / 30) {
    for (var y = -height / 10; y < 1.1 * height; y = y + width / 30) {
      var magnitude = noise(x * noiseScale, y * noiseScale);

      circle(x + random(-15, 15), y + random(-15, 15), width / 40 + magnitude * density);
    }
  }
}
