let textY = 0;
let growBar = 0;
let growMax;
let myText;
let canvasX = innerWidth * 0.8;
let canvasY = 420;

// the value of each key is an array with the values to filter
let filters = {
  word: [
    "enterprise",
    "enterprises",
    "business",
    "work",
    "small business",
    "training",
    "entrepreneurs",
    "jobs",
    "economic",
    "growth",
    "cost",
    "economies",
    "model",
    "models",
    "prive",
    "sector",
    "create",
    "financing",
    "viable",
    "subsidies",
    "incentivize",
    "pricing",
    "entrepreneurial",
    "expansion",
    "chad"
  ]
};

function addWord() {
  let a = document.getElementById("add").value;
  let b = a.toLowerCase();
  const content = document.querySelector(".warning");
  content.classList.add("active");
  if (filters.word.includes(b)) {
    console.log(b, "already exists");
    content.textContent = b + " already exists!";
  } else {
    filters.word.push(b);
    content.textContent = "Added: " + "'" + b + "'";
    setup();
  }
}

function setup() {
  canvas = createCanvas(canvasX, canvasY);
  canvas.parent("sketch-holder");
  background("#3d3d3d");
  textFont("monospace");
  // title
  fill("#fff");
  textSize(22);
  textAlign(CENTER);
  text("SDG 8: DECENT WORK AND ECONOMIC GROWTH", width / 2, height / 2);
  textSize(16);
  text("Scroll down or drag to visualize word counts", width / 2, height / 1.8);
  myText = new Text("africa.txt", 10);
}

// scrolling option
function draw() {
  myText.display();
}

function Text(fileName, xPos) {
  const dictionary = [];
  loadStrings(fileName, callback);

  this.display = function() {
    // see multiFilter.js file for multi-criteria filtering function
    var x = multiFilter(dictionary, filters);
    // narrow down to top 20 words
    var n = x.slice(0, 20);
    push();
    textSize(16);
    textAlign(LEFT);
    translate(xPos, 0);

    for (var i = 0; i < n.length; i++) {
      let displayCount = n[i].count;
      let growing = growBar * 0.1 * displayCount;
      var xc = constrain(growing, 10, innerWidth * 0.78);

      fill(255 - i * 7);
      stroke("#3d3d3d");
      rect(0, 10, xc, 20, 10);
      fill(0);
      noStroke();

      fill("#3d3d3d");
      textAlign(LEFT);
      text(n[i].word, 10, 26);
      textAlign(RIGHT);
      text(displayCount + "x", xc - 10, 26);
      translate(0, 20);
    }
    pop();
  };

  // dictionary
  function callback(sotu) {
    sotu.forEach(function(phrases) {
      var words = phrases.split(" ");
      words.forEach(function(word) {
        word = word.toLowerCase();
        let removeBlanks = dictionary.filter(el => {
          return el.word !== "";
        });
        let filteredWords = removeBlanks.filter(el => {
          return el.word == word;
        });
        if (filteredWords.length) {
          filteredWords[0].count++;
        } else {
          dictionary.push({ word: word, count: 1 });
        }
      });
    });
    // console.log(dictionary);

    dictionary.sort(function(a, b) {
      return b.count - a.count;
    });
  }
}

// dragging option
function mouseDragged() {
  background("#3d3d3d");
  // title
  fill("#fff");
  textSize(22);
  textAlign(CENTER);
  text("SDG 8: DECENT WORK AND ECONOMIC GROWTH", width / 2, height / 2);
  textSize(16);
  text("Scroll down or drag to visualize word counts", width / 2, height / 1.8);

  growBar += mouseX - pmouseX;
  growBar += mouseY - pmouseY;
}

// scrolling option
function mouseWheel(event) {
  background("#3d3d3d");
  // title
  fill("#fff");
  textSize(22);
  textAlign(CENTER);
  text("SDG 8: DECENT WORK AND ECONOMIC GROWTH", width / 2, height / 2);
  textSize(16);
  text("Scroll down or drag to visualize word counts", width / 2, height / 1.8);

  growBar -= -event.delta;
}
