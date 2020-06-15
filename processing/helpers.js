// get a base64 string of length 32
var xmur3Input = base64String(32);
console.log(xmur3Input);
// calls to seed() yield 32-bit hash values
var seed = xmur3(xmur3Input);

/**
 * Controls the client.
 */
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    xmur3Input = base64String(32);
    console.log(xmur3Input);
    seed = xmur3(xmur3Input);

    draw();
  } else if (keyCode === 83) {
    // 'S' key
    saveCanvas(filename(), 'png');
  }
}


/**
 * Returns the artwork title for filenames.
 */
function filename() {
  return [filenameTitle(), filenameDate(), xmur3Input].join('_');
}

/**
 * Returns the artwork title for filenames.
 */
function filenameTitle() {
  return location.pathname.split('/').slice(-2).reverse().pop();
}

/**
 * Formats a date for filenames.
 */
function filenameDate() {
  var d = new Date();

  return [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');
}

/**
 * Returns a random-enough base64 string.
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @param {number} length The length of string to generate
 */
function base64String(length) {
  var result = Array(length);
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return result.join('');
}

/**
 * Hash function that generates 32-bit seeds from string input.
 * https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 *
 * @param {string} str A string to create a seed from
 */
function xmur3(str) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
    h = h << 13 | h >>> 19;
  }

  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507),
    h = Math.imul(h ^ h >>> 13, 3266489909);

    return (h ^= h >>> 16) >>> 0;
  }
}

/**
 * Wraps https://p5js.org/reference/#/p5/random to generate a random integer between {minimum} and {maximum} inclusive.
 *
 * @param {number} minimum The lowest integer to return. Defaults to 0
 * @param {number} maximum The highest integer to return. Defaults to 1
 */
function randInt(minimum = 0, maximum = 1) {
  return Math.floor(random(minimum, maximum + 1));
}

/**
 * Wraps https://p5js.org/reference/#/p5/randomGaussian to generate a random integer distributed normally around
 * {mean} with standard deviation {sd}.
 *
 * @param {number} maximum The highest integer to return. Defaults to 1
 */
function randIntGauss(mean, sd) {
  return Math.floor(randomGaussian(mean, sd));
}
