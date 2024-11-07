let table1, table2, table3;
let sketch1, sketch2, sketch3;
let rotationSpeed = 0.04;
let backgroundLayer;

function preload() {
  table1 = loadTable('assets/body.csv', 'csv', 'header');
  table2 = loadTable('assets/sketch2.csv', 'csv', 'header');
  table3 = loadTable('assets/sketch3.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  
  // Initialize background layer with P2D for 2D noise effect
  backgroundLayer = createGraphics(800, 800);
  backgroundLayer.noiseDetail(1, 0.5);
  Background.generateBackground(backgroundLayer);

  // Initialize sketches
  sketch1 = new Sketch(table1);
  sketch2 = new Sketch(table2);
  sketch3 = new Sketch(table3);
  sketch1.loadPoints();
  sketch2.loadPoints();
  sketch3.loadPoints();
}

function draw() {
  // Draw the background layer as a texture behind the sketches
  texture(backgroundLayer);
  plane(width, height); // Draw the textured plane

  // Draw stationary points
  sketch1.connectPoints();

  // Oscillating sketch2
  push();
  translate(100, 120);
  rotateX(sin(frameCount * rotationSpeed) * PI / 4 - PI / 2);
  sketch2.connectPoints();
  pop();

  // Opposite oscillating sketch3
  push();
  translate(-50, 100);
  rotateX(-sin(frameCount * rotationSpeed) * PI / 4 + PI / 2);
  sketch3.connectPoints();
  pop();
}

// Background class using Perlin noise
class Background {
  static noiseScale = 0;

  static generateBackground(graphics) {
    for (let x = 0; x < graphics.width; x++) {
      for (let y = 0; y < graphics.height; y++) {
        let noiseVal = noise(x * Background.noiseScale, y * Background.noiseScale);
        graphics.stroke(noiseVal*255); // Map noise to grayscale
        graphics.point(x, y); // Set each pixel
      }
    }
  }
}

// Point class to represent individual 3D points
class Point {
  constructor(id, x, y) {
    this.id = id;
    this.position = createVector(x, y, 0);
  }
}

// Sketch class to manage points and render connections
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
      
      let adjustedX = map(x, this.minX, this.maxX, -width / 2 + 50, width / 2 - 50);
      let adjustedY = map(y, this.minY, this.maxY, height / 2 - 50, -height / 2 + 50);
      
      this.points.push(new Point(id, adjustedX, adjustedY));
    }
  }

  connectPoints() {
    stroke(0, 80);
    strokeWeight(1);
    fill(150, 100, 200, 50);

    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i].position;

      if (i > 0 && this.points[i].id < this.points[i - 1].id) {
        endShape(CLOSE);
        beginShape();
      }

      vertex(p.x, p.y, p.z);
    }
    endShape(CLOSE);
  }
}
