let textY = 0;
let myText;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#3d3d3d");
  myText = new Text("africa.txt", 50);
}

function Text(fileName, xPos) {
  const dictionary = [];
  loadStrings(fileName, callback);

  this.display = function() {
    push();
    translate(xPos, textY);
    for (var i = 0; i < dictionary.length; i++) {
      let displayCount = dictionary[i].count;
      // let txtWidth = textWidth(dictionary[i].word + displayCount + 0);
      fill(100 + i * 10);
      // rect(25, 25 + i * 20, txtWidth, 16);
      noStroke();
      rect(0, 5, displayCount * 2, 20);
      // textSize(dictionary[i].count * 1.5);
      fill(255 - i * 10);

      text(dictionary[i].word + " " + displayCount, 10, 21);
      translate(0, 21);
    }
    pop();
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

  myText.display();

  textY += mouseY - pmouseY;
}

// scrolling option
function mouseWheel(event) {
  background("#3d3d3d");

  myText.display();
  if (textY <= 200) {
    textY += -event.delta;
  }
  console.log(textY);
}
