let table;
let sketch;
let rotationSpeed = 0.04;

function preload() {
  table = loadTable('assets/sketch.csv', 'csv', 'header'); // Load CSV before setup
}

function setup() {
  createCanvas(800, 800, WEBGL); // Enable WEBGL mode for 3D rendering
  sketch = new Sketch(table);
  sketch.loadPoints(); // Parse and normalize points
}

function draw() {
  background(220);
  
  // // Rotate the entire view for a 3D effect
  // rotateX(frameCount * 0.01);
  // // rotateY(frameCount * 0.01);
  
  // Calculate the angle using sine to oscillate between 0 and PI (180 degrees)
  angle =  sin(frameCount * rotationSpeed) * PI/4; 

  // Apply the back-and-forth rotation on the X axis
  rotateX(angle);
  // Draw points and connect them in 3D space
  sketch.connectPoints();
  sketch.drawRandomizedPoints(10, 5); // Draw with 10 iterations and 5 px randomness
}

// Class representing an individual point with normalized coordinates and an ID
class Point {
  constructor(id, x, y) {
    this.id = id;
    this.position = createVector(x, y, random(-100, 100)); // 3D position with random depth
  }

  // Draw the point at its position with optional randomness for slight offset
  draw(randomOffset = 100) {
    let offsetX = this.position.x + random(-randomOffset, randomOffset);
    let offsetY = this.position.y + random(-randomOffset, randomOffset);
    let offsetZ = this.position.z + random(-randomOffset, randomOffset);

    point(offsetX, offsetY, offsetZ); // Draw the point with potential random offset
  }
}

// Class responsible for loading, parsing, and rendering points and connections in 3D
class Sketch {
  constructor(table) {
    this.table = table;
    this.points = [];
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
      let adjustedX = map(x, this.minX, this.maxX, -width / 2 + 50, width / 2 - 50);
      let adjustedY = map(y, this.minY, this.maxY, height / 2 - 50, -height / 2 + 50); // Inverted Y axis
      
      // Store each point with 3D positioning
      this.points.push(new Point(id, adjustedX, adjustedY));
    }
  }

  connectPoints() {
    stroke(0, 80);
    strokeWeight(1);
    
    // Connect points in the order they are listed, creating lines between them in 3D
    for (let i = 1; i < this.points.length; i++) {
      // Skip to the next line segment if ID decreases
      if (this.points[i].id < this.points[i - 1].id) {
        continue;
      }

      let p0 = this.points[i - 1].position;
      let p1 = this.points[i].position;

      line(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z); // Draw line in 3D space between two points
    }
  }

  drawRandomizedPoints(iterations = 1, randomness = 0) {
    stroke(150, 100, 200);
    strokeWeight(4);
    
    // Draw each point with slight random variations over multiple iterations
    for (let n = 0; n < iterations; n++) {
      for (let point of this.points) {
        point.draw(randomness); // Draw point with optional randomness
      }
    }
  }
}
