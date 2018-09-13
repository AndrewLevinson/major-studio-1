var mySquare1;
var mySquare2;

function setup() {
  createCanvas(400, 400);
  background("pink");
  rectMode(CENTER);

  mySquare1 = new Square(0, 0, 0, 0, mouseX);
  mySquare2 = new Square(0, 0, 0, 0, mouseX);
}

function draw() {
  mySquare1.display();
  mySquare1.rotate();

  mySquare2.display();
  mySquare2.rotate();
}
function mouseReleased() {}

function Square(circleX, circleY, rectX, rectY, action) {
  // properties
  this.circleX = circleX;
  this.circleY = circleY;
  this.rectX = rectX;
  this.rectY = rectY;
  this.action = action;

  // display
  this.display = function() {
    translate(100, 100);
    rect(this.rectX, this.rectY, 100, 100);
    ellipse(this.circleX, this.circleY, 100, 100);
  };

  // methods
  this.rotate = function() {
    this.action = rotate(action);
  };
}

// example

// function setup() {
//   createCanvas(200,200);
//   // Parameters go inside the parentheses when the object is constructed.
//   myCar1 = new Car(color(255,0,0),0,100,2);
//   myCar2 = new Car(color(0,0,255),0,10,1);
// }

// function draw() {
//   background(255);
//   myCar1.drive();
//   myCar1.display();
//   myCar2.drive();
//   myCar2.display();
// }

// // Even though there are multiple objects, we still only need one class.
// // No matter how many cookies we make, only one cookie cutter is needed.
// function Car(color, xpos, ypos, xspeed) {
//   //property
//   this.color = color;
//   this.xpos = xpos;
//   this.ypos = ypos;
//   this.xspeed = xspeed;

//   //method
//   this.display = function() {
//     stroke(0);
//     fill(this.color);
//     rectMode(CENTER);
//     rect(this.xpos, this.ypos, 20, 10);
//   };
//   this.drive = function() {
//     this.xpos = this.xpos + this.xspeed;
//     if (this.xpos > window.innerWidth) {
//       this.xpos = 0;
//     }
//   };
// }
