function setup() {
  createCanvas(640, 400);
  noLoop();
  noStroke();

  colorMode(HSB);
}

function draw() {
  clear();
  randomSeed(seed);
  noiseSeed(seed);

  background(87);

  for (let i = 0; i < 40; i++) {
    for (let y = -40; y < height + 40; y = y + 40) {
      for (let x = -40; x < width + 40; x = x + 40) {
        push();

        translate(x, y);

        if (random() > 0.997) {
          fill(0, 100, 79);
          shearX((PI / 5.0) * Math.min(Math.max(randomGaussian(), -1.5), 1.5));
          shearY((PI / 5.0) * Math.min(Math.max(randomGaussian(), -1.5), 1.5));
        } else {
          fill(100, random() * 0.1);
          shearX((PI * 4.0) * (random() - 0.5));
          shearY((PI * 4.0) * (random() - 0.5));
        }

        rect(5, 5, 30, 30);
        pop();
      }
    }
  }
}
