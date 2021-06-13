/**
 * @typedef {Object} Palette
 * @property {number} complementary - A hue offset by 180 degrees
 * @property {number[]} secondary - Two hues offset by -60 and 60 degrees respectively
 * @property {number[]} tertiary - Two hues offset by -30 and 30 degrees respectively
 */

/**
 * Calculates complementary, secondary, and tertiary hue values for a specific hue. Best used within the HSB or HSL
 * color spaces.
 *
 * @param {number} hue - The hue to calculate values for. Expects 0 <= hue < 360
 *
 * @returns {Palette} - Interesting relative hue values
 */
function palette(hue) {
  return {
    complementary: keepInBounds(hue - 180),
    secondary: [
      keepInBounds(hue - 60),
      keepInBounds(hue + 60)
    ],
    tertiary: [
      keepInBounds(hue - 30),
      keepInBounds(hue + 30)
    ]
  }
}

/**
 * Adds or subtracts 360 degrees from a hue to keep it within the range 0 <= hue < 360.
 *
 * @param {number} hue - The hue to remap to the range 0 <= hue < 360
 *
 * @return {number} - A hue in the range 0 <= hue < 360
 */
function keepInBounds(hue) {
  if (hue < 0) {
    return hue + 360;
  } else if (hue >= 360) {
    return hue - 360;
  } else {
    return hue;
  }
}
