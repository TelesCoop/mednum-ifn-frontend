const colors = ["334c5c", "334c5c", "acc2cf", "c2d2cd", "faefe5", "ff9f64", "cf782d", "8a3721"];
const defaultColor = "#ffffff";

function hexToRgb(hex) {
  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return {
    red,
    green,
    blue,
  };
}

function rgbToHex(red, green, blue) {
  const componentToHex = (c) => {
    const hex = parseInt(c, 10).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

function colorGradient(percentFade, firstColor, lastColor) {
  const startColor = hexToRgb(firstColor);
  const endColor = hexToRgb(lastColor);
  return rgbToHex(
    percentFade * startColor.red + (1 - percentFade) * endColor.red,
    percentFade * startColor.green + (1 - percentFade) * endColor.green,
    percentFade * startColor.blue + (1 - percentFade) * endColor.blue
  );
}

export const computeColorFromScoring = (score) => {
  if (score == null) {
    return defaultColor;
  }

  const threasholds = [-7.5, -5, -2.5, 0, 2.5, 5, 7.5];
  const step = 2.5;
  for (let index = 0; index < threasholds.length; index++) {
    const threashold = threasholds[index];
    if (score < threashold) {
      return colorGradient((threashold - score) / step, colors[index], colors[index + 1]);
    }
  }
  return "#8a3721";
};
