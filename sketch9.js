class Background {
    static noiseScale = 0.05; // Set a static noise scale value
    
    static generateBackground() {
      loadPixels(); // Load pixel data for direct manipulation
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          let noiseVal = noise(x * Background.noiseScale, y * Background.noiseScale);
          let col = color(noiseVal * 255); // Map noise value to grayscale
          let index = (x + y * width) * 4; // Calculate pixel array index
          pixels[index] = red(col);
          pixels[index + 1] = green(col);
          pixels[index + 2] = blue(col);
          pixels[index + 3] = 255; // Set alpha to full opacity
        }
      }
      updatePixels(); // Apply changes to the canvas
    }
  }
  
  function setup() {
    createCanvas(800, 800);
    Background.generateBackground(); // Generate the background once
  }
  
  function draw() {
    // Nothing in draw to keep the background static
  }
  