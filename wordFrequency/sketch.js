var dictionary = [];
var textX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("pink");
  loadStrings("sotu-t-1.txt", callback);
  display();
}

function display() {
  background("lightgray");
  translate(textX, 0);
  push();
  for (var i = 0; i < dictionary.length; i++) {
    textSize(dictionary[i].count);
    var txtWidth = textWidth(dictionary[i].word);
    text(dictionary[i].word, 0, height / 2);
    translate(txtWidth, 0);
  }
  pop();
}
// dragging option
function mouseDragged() {
  display();
  textX = mouseX - pmouseX;
}

// scrolling option
function mouseWheel(event) {
  display();
  print(event.delta);
  textX = -event.delta;
}

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
  console.log(dictionary);
}
