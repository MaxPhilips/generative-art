var xmur3Input = base64String(32);
var seed = xmur3(xmur3Input);
var rand = sfc32(seed(), seed(), seed(), seed());

/**
 * Controls the client.
 */
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    draw();

    rand = sfc32(seed(), seed(), seed(), seed());
  } else if (keyCode === 83) {
    // 'S' key
    var timestamp = new Date();
    saveCanvas(
      [
        location.pathname.split('/').slice(-2).reverse().pop(),
        timestamp.getFullYear() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getDate(),
        xmur3Input
      ].join('_'), 'png');
  }
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
 * Generates seeds.
 * https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 *
 * @param {string} str A string to create a seed from
 */
function xmur3(str) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
    h = h << 13 | h >>> 19;

  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507),
    h = Math.imul(h ^ h >>> 13, 3266489909);

    return (h ^= h >>> 16) >>> 0;
  }
}

/**
 * Generates pseudorandom numbers.
 * https://github.com/bryc/code/blob/master/jshash/PRNGs.md
 *
 * @param {string} a A seed
 * @param {string} b A seed
 * @param {string} c A seed
 * @param {string} d A seed
 */
function sfc32(a, b, c, d) {
  return function() {
    a |= 0; b |= 0; c |= 0; d |= 0;

    var t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = c << 21 | c >>> 11;
    c = c + t | 0;

    return (t >>> 0) / 4294967296;
  }
}
