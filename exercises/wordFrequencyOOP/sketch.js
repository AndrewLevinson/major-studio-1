var textX = 0;
var myText1, myText2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("pink");

  myText1 = new Text("sotu-t-1.txt", height / 2);
  myText2 = new Text("sotu-t-2.txt", height);
}

function Text(fileName, yPos) {
  var dictionary = [];
  loadStrings(fileName, callback);

  this.display = function() {
    push();
    translate(textX, yPos);
    for (var i = 0; i < dictionary.length; i++) {
      textSize(dictionary[i].count * 1.5);
      var txtWidth = textWidth(dictionary[i].word + 10);
      text(dictionary[i].word, 0, 0);
      translate(txtWidth, 0);
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
  background("lightgray");

  myText1.display();
  myText2.display();

  textX += mouseX - pmouseX;
}

// scrolling option
function mouseWheel(event) {
  background("lightgray");

  myText1.display();
  myText2.display();

  textX += -event.delta;
}
