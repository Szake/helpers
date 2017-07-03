// Main:
let inverse = (() => {
  // Pattern to match: #000000 or #000
  let pattern = /^\#([0-9a-f]{6}|[0-9a-f]{3})$/;
  let initial = '#000';

  return (hex) => {
    if (!pattern.test(hex)) { return initial; }

    let code = hex.replace('#', '');
    let step = code.length / 3;

    let colors = step === 2 ? code.match(/(..?)/g) : code.match(/(.?)/g);

    // Check the length to be 3:
    colors = colors.slice(0, 3);

    // Concatenate result color:
    let result = colors.reduce((result, color) => {
      // Convert 1 digit format into 2 digit format:
      if (color.length === 1) { color += color; }

      // Count new color (hex -> rgb -> hex):
      let color_rgb_result = 255 - parseInt(color, 16),
          color_hex_result = ('0' + color_rgb_result.toString(16)).slice(-2);

      return result + color_hex_result;
    }, '#');

    console.log(`Converted ${hex} into ${result}.`);

    return result;
  };
})();

// Check:
let setColor = (() => {
  let pattern = /^\#([0-9a-f]{6}|[0-9a-f]{3})$/;

  let start_box = document.querySelector('.color.start'),
      end_box = document.querySelector('.color.end');

  return (color) => {
    if (!pattern.test(color) || !start_box || !end_box) { return; }

    // Set colors:
    start_box.style.backgroundColor = color;
    end_box.style.backgroundColor = inverse(color);
  };
})();