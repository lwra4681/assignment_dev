let table;
let points = [];
let minX = -200, maxX = 200;
let minY = -200, maxY = 200;
let noiseOffset = 0;  // This will control the dynamic movement
let breakPoints = [5, 10];  // Indices where the drawing should break

function preload() {
  // Load the CSV file
  table = loadTable('bird3.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);
  background(255);
  noFill();
  stroke(0, 50); // Light stroke for the curves

  // Parse the points and normalize the coordinates
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let x = row.getNum('X');
    let y = row.getNum('Y');
    
    // Normalize X and Y to fit within the canvas
    let adjustedX = map(x, minX, maxX, 50, width - 50);
    let adjustedY = map(y, minY, maxY, height - 50, 50); // Inverted Y axis
    
    // Store the normalized points
    points.push(createVector(adjustedX, adjustedY));
  }
}

function draw() {
  background(255);  // Clear the background each frame
  
  let currentSegment = 0;  // Track the current segment of the drawing
  
  // Add some randomness or Perlin noise to the points for organic effect
  for (let i = 0; i < points.length; i++) {
    if (breakPoints.includes(i)) {
      // End the current shape segment when hitting a breakpoint
      endShape();
      currentSegment++;  // Move to the next segment
      beginShape();
    } else if (i === 0 || breakPoints.includes(i - 1)) {
      // Start a new shape after a break
      beginShape();
    }
    
    let p = points[i];
    
    // Use Perlin noise to add subtle movement to each point
    let noiseX = map(noise(noiseOffset + i * 0.1), 0, 1, -10, 10);  // X-axis movement
    let noiseY = map(noise(noiseOffset + 1000 + i * 0.1), 0, 1, -10, 10);  // Y-axis movement

    // Apply noise to the points
    let x = p.x + noiseX;
    let y = p.y + noiseY;

    // Use curveVertex for smooth curves
    curveVertex(x, y);
  }

  // Finish the last segment
  endShape();

  // Increment the noise offset for smooth animation
  noiseOffset += 0.02;
}


