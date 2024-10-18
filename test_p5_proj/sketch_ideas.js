// let points = [];
// let wings = [];
// let isRounded = [];
// let noiseOffsetX = 0;
// let noiseOffsetY = 1000;

// function setup() {
//   createCanvas(800, 400);
  
//   // Define fixed points for wings
//   wings.push(createVector(100, 300));
//   wings.push(createVector(200, 100));
//   wings.push(createVector(300, 200));
//   wings.push(createVector(400, 50));
//   wings.push(createVector(500, 300));
//   wings.push(createVector(600, 100));
//   wings.push(createVector(700, 200));
//   wings.push(createVector(400, 350));
//   wings.push(createVector(200, 350));
//   wings.push(createVector(300, 300));
  
//   // Add wings points to the main points array
//   points = points.concat(wings);
  
//   // Define whether to have rounded corners at each vertex
//   isRounded = [true, false, true, false, true, false, true, false, true, false]; // Alternating rounded and sharp
// }

// function draw() {
//   background(220);
  
//   // Apply Perlin noise to the y-coordinates of points to create a dynamic, wavy effect
//   let noisyPoints = points.map((pt, index) => {
//     let noiseFactorX = noise(noiseOffsetX + index * 0.1, frameCount * 0.01) * 50; // Adding noise to x
//     let noiseFactorY = noise(noiseOffsetY + index * 0.1, frameCount * 0.01) * 50; // Adding noise to y
//     return createVector(pt.x + noiseFactorX, pt.y + noiseFactorY);
//   });
  
//   // Draw the smooth curve
//   noFill();
//   stroke(0);
//   strokeWeight(2);
//   beginShape();
  
//   vertex(noisyPoints[0].x, noisyPoints[0].y);
  
//   for (let i = 1; i < noisyPoints.length; i++) {
//     let prev = noisyPoints[i - 1];
//     let curr = noisyPoints[i];

//     if (isRounded[i - 1]) {
//       // Calculate control points for a rounded curve
//       let control1 = createVector(prev.x + (curr.x - prev.x) * 0.4, prev.y);
//       let control2 = createVector(curr.x - (curr.x - prev.x) * 0.4, curr.y);
      
//       // Bezier curve to create smooth connection
//       bezierVertex(control1.x, control1.y, control2.x, control2.y, curr.x, curr.y);
//     } else {
//       // Create a sharp corner (vertex)
//       let midX = (prev.x + curr.x) / 2;
//       let midY = (prev.y + curr.y) / 2;
//       vertex(midX, midY);
//       vertex(curr.x, curr.y);
//     }
//   }
  
//   endShape();

//   // Increment noise offsets to create dynamic movement
//   noiseOffsetX += 0.01;
//   noiseOffsetY += 0.01;
// }

let angle = 10;
let noiseOffset = 0;

function setup() {
  createCanvas(400, 400);
  background(50, 100, 50);  // Dark green background
  stroke(255, 100);  // White with some transparency
  noFill();
}

function draw() {
  translate(width/2, height / 2);  // Move the origin to the center
  rotate(angle);  // Rotate the entire canvas slightly with each frame

  // Begin drawing the Perlin noise curve
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.1) {
    let r = noise(t + noiseOffset) * 150;  // Get radius using Perlin noise
    let x = r * cos(t);
    let y = r * sin(t);
    vertex(x, y);  // Create the smooth curve using vertex points
  }
  endShape(CLOSE);  // Close the shape to make it loop

  noiseOffset += 0.1;  // Increment noise for smooth transitions
  angle += 0.1;  // Slightly increase the rotation angle

  if (frameCount % 200 === 0) {
    background(50, 100, 50);  // Reset background every 200 frames for layering effect
  }
}
