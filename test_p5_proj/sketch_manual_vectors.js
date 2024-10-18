// let points = [];
// let wings = [];
// let isRounded = [];
// let angle = 10;
// let noiseOffset = 0;

// function setup() {
//   createCanvas(800, 800);
//   background(50, 100, 50);  // Dark green background
//   stroke(255, 100);  // White with some transparency
//   noFill();
  
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
//   // Reset background every 2000 frames for a layering effect

// ///UNCOMMENT for animation example

// //   if (frameCount % 2000 === 0) {
// //     background(50, 100, 50);
// //   }
// //   translate(width / 2, height / 2);  // Move the origin to the center
// //   rotate(angle);  // Rotate the entire canvas slightly with each frame
  
//   // Apply Perlin noise to the points and create a curve
//   let noisyPoints = points.map((pt, index) => {
//     let noiseFactorX = noise(noiseOffset + index * 0.1) * 50; // Adding noise to x
//     let noiseFactorY = noise(noiseOffset + 1000 + index * 0.1) * 50; // Adding noise to y
//     return createVector(pt.x + noiseFactorX, pt.y + noiseFactorY);
//   });

//   // Draw the smooth curve
//   noFill();
//   stroke(255, 100);  // White stroke with transparency
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
  
//   endShape(CLOSE);  // Close the shape to form a loop
  

// ////// a basic animation ////
// //   // Increment noise and rotation
// //   noiseOffset += 0.1;
// //   angle += 0.01;  // Slightly increase the rotation angle
// }

let wingPoints = [];
let bodyPoints = [];
let headPoints = [];
let tailPoints = [];
let isRounded = [];

let angle = 2;
let noiseOffset = 0;

function setup() {

    createCanvas(800, 800);
    background(50, 100, 50);  // Dark green background
    stroke(255,100);  // Black stroke for the bird's outline
    strokeWeight(3);
    noFill();

  // Define fixed points for wings
  wingPoints.push(createVector(400, 480));  // Bottom left curve
  wingPoints.push(createVector(280,10));  //Left wing tip
  wingPoints.push(createVector(80, 120));  // Mid curve
  wingPoints.push(createVector(250, 500));  // Right wing tip
  // wingPoints.push(createVector(460, 450));  // Bottom right curve
  // wingPoints.push(createVector(350, 650));
  // Define points for the body
  bodyPoints.push(createVector(300, 650));  // Start of the body
  // bodyPoints.push(createVector(420, 350));  // Curve inward
  bodyPoints.push(createVector(460, 295));
  bodyPoints.push(createVector(495, 340));  // beak 
  bodyPoints.push(createVector(500, 350));  
  bodyPoints.push(createVector(495, 351)); // End of the body
  bodyPoints.push(createVector(400, 450)); //belly
  bodyPoints.push(createVector(250, 510));
  bodyPoints.push(createVector(230, 500));
  // bodyPoints.push(createVector(500, 700)); 
  // bodyPoints.push(createVector(400, 500));  // Bottom of body, connecting to tail
  // bodyPoints.push(createVector(350, 650));  // Tail extending downwards
  // bodyPoints.push(createVector(250, 750));  // Tip of tail
  
  
  // Define points for the tail
  
  // Define whether each section is rounded
  // isRounded = [true, true, true, true, true];  // Wings are all rounded
}

function draw() {

if (frameCount % 160 === 0) {
background(50, 100, 50);
}


// // UNCOMMENT THESE TWO LINES TO SHOW AN ANIMATION
//   translate(width / 2, height / 2);  // Move the origin to the center
//   rotate(angle);  // Rotate the entire canvas slightly with each frame
  
  // Draw wings
  drawShape(wingPoints, false);
  
  // Draw body
  drawShape(bodyPoints, false);
  
  // Draw head
  drawShape(headPoints, false);
  
  // Draw tail
  drawShape(tailPoints, false);
  
}

function drawShape(points, isClosed) {
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let prev = points[i - 1];
    let curr = points[i];
    
    if (i == 0) {
      vertex(points[0].x, points[0].y);  // Starting point
    } else {
      // Calculate control points for a rounded curve
      let control1 = createVector(prev.x + (curr.x - prev.x) * 0.4, prev.y);
      let control2 = createVector(curr.x - (curr.x - prev.x) * 0.4, curr.y);
      
      // Bezier curve to create smooth connection
      bezierVertex(control1.x, control1.y, control2.x, control2.y, curr.x, curr.y);
    }
  }
  
  if (isClosed) {
    endShape(CLOSE);
  } else {
    endShape();
  }
  //// a basic animation ////
  // Increment noise and rotation
  noiseOffset += 0.1;
  angle += 0.01;  // Slightly increase the rotation angle
}


