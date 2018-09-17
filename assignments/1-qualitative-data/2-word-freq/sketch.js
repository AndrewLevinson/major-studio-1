let textY = 0;
let growBar = 0;
let growMax;
let myText;
let canvasX = innerWidth * 0.8;
let canvasY = innerHeight * 0.6;
let filters = {};

function setup() {
  canvas = createCanvas(canvasX, canvasY);
  canvas.parent("sketch-holder");
  background("#3d3d3d");
  myText = new Text("africa.txt", 50);
}

// scrolling option
function draw() {
  myText.display();
}
// function addWord() {
//   var a = document.getElementById("add").value;
//   filters.word = a;
// }
function Text(fileName, xPos) {
  const dictionary = [];
  loadStrings(fileName, callback);

  this.display = function() {
    // the value of each key is an array with the values to filter
    filters = {
      word: [
        "africa",
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

    // see multiFilter.js file for multi-criteria filtering function
    var n = multiFilter(dictionary, filters);

    push();
    translate(xPos, 0);

    for (var i = 0; i < n.length; i++) {
      // let n = dictionary[i].word.includes("africa");

      let displayCount = n[i].count;
      let growing = growBar * 0.1 * displayCount;
      var xc = constrain(growing, 50, innerWidth * 0.75);

      // let txtWidth = textWidth(dictionary[i].word + displayCount + 0);
      fill(255 - i * 10);
      // rect(25, 25 + i * 20, txtWidth, 16);
      noStroke();
      rect(0, 10, xc, 20);
      // textSize(dictionary[i].count * 1.5);
      fill(0 + i * 50);

      text(n[i].word + " " + displayCount, 10, 26);
      translate(0, 21);
    }
    pop();

    fill("#3d3d3d");

    text("SDG", width / 2, height / 2);
  };

  // dictionary
  function callback(sotu) {
    sotu.forEach(function(phrases) {
      var words = phrases.split(" ");
      words.forEach(function(word) {
        word = word.toLowerCase();

        let filteredWords = dictionary.filter(el => {
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

  // myText.display();

  textY += mouseY - pmouseY;
}

// scrolling option
function mouseWheel(event) {
  background("#3d3d3d");

  // myText.display();

  // textY += -event.delta;
  growBar -= -event.delta;
}
