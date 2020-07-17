/**
 * Draws a line through an array of control points.
 *
 * @param {p5.Vector[]} controlPoints - The points to connect
 */
function drawLine(controlPoints) {
  for (var i = 0; i < controlPoints.length - 1; i++) {
    line(controlPoints[i].x, controlPoints[i].y, controlPoints[i + 1].x, controlPoints[i + 1].y);
  }
}

/**
 * Calculates control points representing a Chaikin curve from an initial set of control points recursively. Adapted
 * from https://sighack.com/post/chaikin-curves
 *
 * @param {p5.Vector[]} controlPoints - The points to connect
 * @param {number} ratio - The ratio to cut at
 * @param {number} iterations - The number of cuts
 *
 * @returns {p5.Vector[]} - A list of control points representing a Chaikin curve
 */
function chaikinCurve(controlPoints, ratio, iterations) {
  if (iterations == 0)
    return controlPoints;

  if (history)
    drawLine(controlPoints);

  nextControlPoints = [];

  var vertices = controlPoints.length - 1;

  for (var i = 0; i < vertices; i++) {
    var currentPoint = controlPoints[i];
    var nextPoint = controlPoints[i + 1];

    var cutPoints = chaikinCut(currentPoint, nextPoint, ratio);

    if (i == 0) {
      // ignore the current point for the first vertex of the line
      nextControlPoints.push(createVector(currentPoint.x, currentPoint.y));
      nextControlPoints.push(createVector(cutPoints[1].x, cutPoints[1].y));
    } else if (i == vertices - 1) {
      // ignore the next point for the last vertex of the line
      nextControlPoints.push(createVector(cutPoints[0].x, cutPoints[0].y));
      nextControlPoints.push(createVector(nextPoint.x, nextPoint.y));
    } else {
      // ignore neither point for interior vertices of the line
      nextControlPoints.push(createVector(cutPoints[0].x, cutPoints[0].y));
      nextControlPoints.push(createVector(cutPoints[1].x, cutPoints[1].y));
    }
  }

  return chaikinCurve(nextControlPoints, ratio, iterations - 1);
}

/**
 * Calculates two points along a line from first to second. Adapted from https://sighack.com/post/chaikin-curves
 *
 * @param {p5.Vector} p1 - The first point
 * @param {p5.Vector} p2 - The second point
 * @param {number} ratio - The ratio to cut at
 *
 * @returns {p5.Vector[]} - A list of two points representing cuts along a line
 */
function chaikinCut(p1, p2, ratio) {
  // if ratio is greater than 0.5 flip it so we avoid cutting across the midpoint of the line.
  if (ratio > 0.5)
    ratio = 1 - ratio;

  // return point at ratio from p1 to p2 and point at ratio from p2 to p1
  return [
    createVector(lerp(p1.x, p2.x, ratio), lerp(p1.y, p2.y, ratio)),
    createVector(lerp(p2.x, p1.x, ratio), lerp(p2.y, p1.y, ratio))
  ];
}
