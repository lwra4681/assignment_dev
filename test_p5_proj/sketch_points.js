let table;
let points = [];
let minX = 0, maxX = 200;
let minY = 0, maxY = 200;

function preload() {
  // Load the CSV file
  table = loadTable('sketch.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);
  background(255);
  noFill();
  stroke(0); // Solid stroke for points

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

  // Plot the points
  plotPoints();
}

function plotPoints() {
  strokeWeight(5); // Set the size of the points

  // Loop through the points array and draw each point
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    point(p.x, p.y);  // Draw each point
  }
}

function draw() {
  // No continuous drawing needed
}
