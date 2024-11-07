let table;
let points = [];
let pointIDs = [];
let minX = 0, maxX = 200;
let minY = 0, maxY = 200;

function preload() {
  // Load the CSV file
  table = loadTable('assets/sketch.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);
  background(255);
  stroke(0,80); // Solid stroke for lines
  strokeWeight(1); // Set line thickness
  
  // Parse the points, normalize the coordinates, and store the point IDs
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let id = row.getNum('Point #');
    let x = row.getNum('X');
    let y = row.getNum('Y');
    
    // Normalize X and Y to fit within the canvas
    let adjustedX = map(x, minX, maxX, 50, width - 50);
    let adjustedY = map(y, minY, maxY, height - 50, 50); // Inverted Y axis
    
    // Store the normalized points and their IDs
    points.push(createVector(adjustedX, adjustedY));
    pointIDs.push(id);
  }

  // Connect the points, considering when the ID decreases
  connectPoints();
}

function connectPoints() {
    let numSketches = 20; // Number of overlapping strokes to create the sketch effect
  
    for (let n = 0; n < numSketches; n++) {
      beginShape(); // Start the first shape
  
      // Loop through the points array and connect them
      for (let i = 0; i < points.length; i++) {
        let p = points[i];

        let jit = 4
        // Introduce a subtle jitter effect to each iteration
        let jitterX = p.x + random(-jit, jit); // Adjust the jitter amount as needed
        let jitterY = p.y + random(-jit, jit); 
  
        // If the current point ID is smaller than the previous one, end the current shape and start a new one
        if (i > 0 && pointIDs[i] < pointIDs[i - 1]) {
          endShape(); // End the current shape
          beginShape(); // Start a new shape
        }
  
        vertex(jitterX, jitterY); // Draw lines between jittered points
      }
  
      endShape(); // End the last shape
    }
  }

function draw() {
  // Static artwork; no continuous drawing needed
}
