let table;
let sketch;
let numIterationsInput;
let randomnessInput;

function preload() {
  table = loadTable('assets/sketch.csv', 'csv', 'header'); // Load the CSV file before setup
}

function setup() {
  createCanvas(800, 800);
  background(200);
  
  // Create input elements for number of iterations and randomness
  numIterationsInput = createInput('10'); // Default value for iterations
  numIterationsInput.position(10, 10);
  
  randomnessInput = createInput('5'); // Default value for randomness
  randomnessInput.position(10, 40);
  
  let button = createButton('Draw');
  button.position(10, 70);
  button.mousePressed(drawSketch); // Call drawSketch function on button press
  
  drawSketch(); // Initial drawing with default values
}

function drawSketch() {
  background(200); // Clear the background for new drawings
  
  sketch = new Sketch(table); // Create a new Sketch instance
  sketch.loadPoints(); // Parse and normalize points
  sketch.connectPoints(); // Draw the original points
  sketch.drawPoints(); // Draw random points from each point instance
}

class Point {
  constructor(id, x, y) {
    this.id = id;
    this.position = createVector(x, y);
  }

  drawRandomPoints(numIterations, randomness) {
    stroke(255, 0, 0); // Change stroke color for random points
    strokeWeight(5); // Set point size

    for (let n = 0; n < numIterations; n++) {
      // Add randomness to the position
      let offsetX = random(-randomness, randomness);
      let offsetY = random(-randomness, randomness);
      let randomX = this.position.x + offsetX;
      let randomY = this.position.y + offsetY;

      // Draw the random point
      point(randomX, randomY);
    }
  }
}

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

  drawPoints() {
    // Get user inputs for iterations and randomness
    let numIterations = int(numIterationsInput.value()); // Get the number of iterations from input
    let randomness = float(randomnessInput.value()); // Get the randomness from input

    // Call drawRandomPoints on each point
    for (let point of this.points) {
      point.drawRandomPoints(numIterations, randomness); // Draw random points for each point
    }
  }
}

function draw() {
  // Static artwork; no continuous drawing needed
}
