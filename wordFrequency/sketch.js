let dictionary = [];
let counts = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("pink");
  loadStrings("sotu-t-1.txt", callback);
}

function callback(sotu) {
  sotu.forEach(phrases => {
    let words = phrases.split(" ");
    let filteredWords = words.filter(function(element) {
      return element !== "";
    });
    filteredWords.forEach(word => {
      word = word.toLowerCase();
      counts[word] = counts[word] ? counts[word] + 1 : 1;
      dictionary.push({ word: word, count: counts[word] });
    });
  });

  function compare(a, b) {
    let comparison = 0;
    if (a.count > b.count) {
      comparison = 1;
    } else if (a.count < b.count) {
      comparison = -1;
    }
    return comparison * -1;
  }

  // console.log(dictionary.sort(compare));

  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i].count > 1) {
      console.log(dictionary.sort(compare)[i].count);
    }
  }
}
