let table;
let sketch;

function preload() {
  table = loadTable('assets/sketch.csv', 'csv', 'header'); // Load the CSV file before setup
}

function setup() {
  createCanvas(800, 800);
  background(200);
  stroke(0, 80);
  strokeWeight(1);

  sketch = new Sketch(table); // Pass the loaded table to the Sketch class
  sketch.loadPoints(); // Parse and normalize points
  sketch.connectPoints(); // Draw the points without jitter
}

function draw() {
  // Static artwork; no continuous drawing needed
}

// Class representing an individual point with normalized coordinates and an ID
class Point {
  constructor(id, x, y) {
    this.id = id;
    this.position = createVector(x, y);
  }
}

// Class responsible for loading, parsing, and rendering the points
class Sketch {
  constructor(table) {
    this.table = table; // Use the preloaded table
    this.points = [];
    this.pointIDs = [];
    this.minX = 0;
    this.maxX = 200;
    this.minY = 0;
    this.maxY = 200;
  }

  loadPoints() {
    for (let i = 0; i < this.table.getRowCount(); i++) {
      let row = this.table.getRow(i);
      let id = row.getNum('Point #');
      let x = row.getNum('X');
      let y = row.getNum('Y');

      // Normalize X and Y to fit within the canvas
      let adjustedX = map(x, this.minX, this.maxX, 50, width - 50);
      let adjustedY = map(y, this.minY, this.maxY, height - 50, 50); // Inverted Y axis

      // Store normalized point objects
      this.points.push(new Point(id, adjustedX, adjustedY));
      this.pointIDs.push(id);
    }
  }

  connectPoints() {
    let numSketches = 10; // Number of overlapping strokes for the sketch effect
  
    for (let n = 0; n < numSketches; n++) {
      for (let i = 1; i < this.points.length; i++) {
        // Start a new segment if the ID decreases
        if (this.points[i].id < this.points[i - 1].id) {
          continue; // Skip to the next point set without drawing a line
        }
  
        // Draw a line between the points without jitter
        line(this.points[i - 1].position.x, this.points[i - 1].position.y, 
             this.points[i].position.x, this.points[i].position.y);
      }
    }
  }
}
