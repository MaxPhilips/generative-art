let moduleWidth = 2, moduleHeight = 88;
let topX = 22, bottomX = 22, y = 22;

function setup() {
  createCanvas(462, 132);
  noLoop();

  code128 = {
    startB: [2,1,1,2,1,4],
    0: [1,2,3,1,2,2],
    1: [1,2,3,2,2,1],
    2: [2,2,3,2,1,1],
    3: [2,2,1,1,3,2],
    4: [2,2,1,2,3,1],
    5: [2,1,3,2,1,2],
    6: [2,2,3,1,1,2],
    7: [3,1,2,1,3,1],
    8: [3,1,1,2,2,2],
    9: [3,2,1,1,2,2],
    a: [1,2,1,1,2,4],
    b: [1,2,1,4,2,1],
    c: [1,4,1,1,2,2],
    d: [1,4,1,2,2,1],
    e: [1,1,2,2,1,4],
    f: [1,1,2,4,1,2],
    g: [1,2,2,1,1,4],
    h: [1,2,2,4,1,1],
    i: [1,4,2,1,1,2],
    j: [1,4,2,2,1,1],
    k: [2,4,1,2,1,1],
    l: [2,2,1,1,1,4],
    m: [4,1,3,1,1,1],
    n: [2,4,1,1,1,2],
    o: [1,3,4,1,1,1],
    p: [1,1,1,2,4,2],
    q: [1,2,1,1,4,2],
    r: [1,2,1,2,4,1],
    s: [1,1,4,2,1,2],
    t: [1,2,4,1,1,2],
    u: [1,2,4,2,1,1],
    v: [4,1,1,2,1,2],
    w: [4,2,1,1,1,2],
    x: [4,2,1,2,1,1],
    y: [2,1,2,1,4,1],
    z: [2,1,4,1,2,1],
    stop: [2,3,3,1,1,1]
  }
}

function draw() {
  clear();
  randomSeed(seed);

  background(220);

  // https://stackoverflow.com/a/47496558
  let barcodify = [...Array(16)].map(() => Math.random().toString(36)[2]).join('');

  section(code128['startB'], topX, bottomX, y);
  topX = topX + 22 + random([-1, 0, 1]);
  bottomX = bottomX + 22 + random([-1, 0, 1]);

  for (let i = 0; i < barcodify.length; i++) {
    section(code128[barcodify[i]], topX, bottomX, y);

    // https://stackoverflow.com/a/33352604
    topX = topX + 22 + random([-1].concat([...Array(i).keys()]));
    bottomX = bottomX + 22 + random([-1].concat([...Array(i).keys()]));
  }

  // TODO: add checksum digit

  section(code128['stop'], topX, bottomX, y);

  topX = 22, bottomX = 22;
}

function section(symbol, topX, bottomX, y) {
  push();
  noStroke();
  fill(0);

  for (let i = 0; i < symbol.length; i++) {
    let deltaTopX = moduleWidth * symbol[i];
    let deltaBottomX = moduleWidth * symbol[i];

    quad(
      // top left
      topX, y,
      // top right
      topX + deltaTopX, y,
      // bottom right
      bottomX + deltaBottomX, y + moduleHeight,
      // bottom left
      bottomX, y + moduleHeight
    );
    topX = topX + deltaTopX;
    bottomX = bottomX + deltaBottomX;

    if (i % 2 == 0) {
      fill(220);
    } else {
      fill(0);
    }
  }

  pop();
}
