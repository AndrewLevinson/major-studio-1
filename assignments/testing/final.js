// data sets

// us data
const usaData = d3
  .csv("data/decades/usa_decade.csv", d => {
    return {
      tests: +d["tests"],
      decade: d["decade"]
    };
  })
  .then(data => {
    console.log(data);
    usaChart(data);
  });

// russia data
const russiaData = d3
  .csv("data/decades/russia_decade.csv", d => {
    return {
      tests: +d["tests"],
      decade: d["decade"]
    };
  })
  .then(data => {
    console.log(data);
    russiaChart(data);
  });

// all other country data
const othersData = d3
  .csv("data/decades/others_decade.csv", d => {
    return {
      tests: +d["tests"],
      decade: d["decade"]
    };
  })
  .then(data => {
    console.log(data);
    othersChart(data);
  });

// usa blocks
let usaChart = data => {
  // waffle chart code
  // Select your div
  const usa = d3.select(".usa");

  // // Create an array with numbers 0 - 99
  // const numbers = d3.range(20);
  // For each item in the array, add a div element
  // if the number is < 5, color it red, otherwise gray

  // const nest = d3
  //   .nest()
  //   .key(d => d.decade)
  //   .entries(tests);

  const numbers = d3.range(data[8]["tests"]);
  const fourties = d3.range(data[0]["tests"]);
  const fifties = d3.range(data[1]["tests"]);
  const sixties = d3.range(data[2]["tests"]);
  const seventies = d3.range(data[3]["tests"]);
  const eighties = d3.range(data[4]["tests"]);
  const nineties = d3.range(data[5]["tests"]);
  const twenty = d3.range(data[6]["tests"]);
  const twentyTen = d3.range(data[7]["tests"]);

  let bars = usa
    .selectAll("div")
    .data(fourties)
    .enter()
    .append("div")
    .attr("class", "four");

  bars = usa
    .selectAll("div")
    .data(fifties)
    .enter()
    .append("div")
    .attr("class", "five");

  bars = usa
    .selectAll("div")
    .data(sixties)
    .enter()
    .append("div")
    .attr("class", "six");

  bars = usa
    .selectAll("div")
    .data(seventies)
    .enter()
    .append("div")
    .attr("class", "seven");

  bars = usa
    .selectAll("div")
    .data(eighties)
    .enter()
    .append("div")
    .attr("class", "eight");

  bars = usa
    .selectAll("div")
    .data(nineties)
    .enter()
    .append("div")
    .attr("class", "nine");

  bars = usa
    .selectAll("div")
    .data(twenty)
    .enter()
    .append("div")
    .attr("class", "twenty");

  bars = usa
    .selectAll("div")
    .data(twentyTen)
    .enter()
    .append("div")
    .attr("class", "twentyTen");

  // .style(
  //   "background-color",
  //   d => (d < fourties.length ? "#FE4A49" : "#CCCCCC")
  // );

  // bars.attr("class", d => (d < fourties.length ? "four" : "nope"));
  // bars.attr(
  //   "class",
  //   d => (fourties.length < d < fifties.length ? "five" : "nope")
  // );
};

// ruussia blocks
let russiaChart = data => {
  // waffle chart code
  // Select your div
  const usa = d3.select(".russia");

  // // Create an array with numbers 0 - 99
  // const numbers = d3.range(20);
  // For each item in the array, add a div element
  // if the number is < 5, color it red, otherwise gray

  // const nest = d3
  //   .nest()
  //   .key(d => d.decade)
  //   .entries(tests);

  const numbers = d3.range(data[8]["tests"]);
  const fourties = d3.range(data[0]["tests"]);
  const fifties = d3.range(data[1]["tests"]);
  const sixties = d3.range(data[2]["tests"]);
  const seventies = d3.range(data[3]["tests"]);
  const eighties = d3.range(data[4]["tests"]);
  const nineties = d3.range(data[5]["tests"]);
  const twenty = d3.range(data[6]["tests"]);
  const twentyTen = d3.range(data[7]["tests"]);

  let bars = usa
    .selectAll("div")
    .data(fourties)
    .enter()
    .append("div")
    .attr("class", "four");

  bars = usa
    .selectAll("div")
    .data(fifties)
    .enter()
    .append("div")
    .attr("class", "five");

  bars = usa
    .selectAll("div")
    .data(sixties)
    .enter()
    .append("div")
    .attr("class", "six");

  bars = usa
    .selectAll("div")
    .data(seventies)
    .enter()
    .append("div")
    .attr("class", "seven");

  bars = usa
    .selectAll("div")
    .data(eighties)
    .enter()
    .append("div")
    .attr("class", "eight");

  bars = usa
    .selectAll("div")
    .data(nineties)
    .enter()
    .append("div")
    .attr("class", "nine");

  bars = usa
    .selectAll("div")
    .data(twenty)
    .enter()
    .append("div")
    .attr("class", "twenty");

  bars = usa
    .selectAll("div")
    .data(twentyTen)
    .enter()
    .append("div")
    .attr("class", "twentyTen");

  // .style(
  //   "background-color",
  //   d => (d < fourties.length ? "#FE4A49" : "#CCCCCC")
  // );

  // bars.attr("class", d => (d < fourties.length ? "four" : "nope"));
  // bars.attr(
  //   "class",
  //   d => (fourties.length < d < fifties.length ? "five" : "nope")
  // );
};

// others blocks
let othersChart = data => {
  // waffle chart code
  // Select your div
  const usa = d3.select(".others");

  // // Create an array with numbers 0 - 99
  // const numbers = d3.range(20);
  // For each item in the array, add a div element
  // if the number is < 5, color it red, otherwise gray

  // const nest = d3
  //   .nest()
  //   .key(d => d.decade)
  //   .entries(tests);

  const numbers = d3.range(data[8]["tests"]);
  const fourties = d3.range(data[0]["tests"]);
  const fifties = d3.range(data[1]["tests"]);
  const sixties = d3.range(data[2]["tests"]);
  const seventies = d3.range(data[3]["tests"]);
  const eighties = d3.range(data[4]["tests"]);
  const nineties = d3.range(data[5]["tests"]);
  const twenty = d3.range(data[6]["tests"]);
  const twentyTen = d3.range(data[7]["tests"]);

  let bars = usa
    .selectAll("div")
    .data(fourties)
    .enter()
    .append("div")
    .attr("class", "four");

  bars = usa
    .selectAll("div")
    .data(fifties)
    .enter()
    .append("div")
    .attr("class", "five");

  bars = usa
    .selectAll("div")
    .data(sixties)
    .enter()
    .append("div")
    .attr("class", "six");

  bars = usa
    .selectAll("div")
    .data(seventies)
    .enter()
    .append("div")
    .attr("class", "seven");

  bars = usa
    .selectAll("div")
    .data(eighties)
    .enter()
    .append("div")
    .attr("class", "eight");

  bars = usa
    .selectAll("div")
    .data(nineties)
    .enter()
    .append("div")
    .attr("class", "nine");

  bars = usa
    .selectAll("div")
    .data(twenty)
    .enter()
    .append("div")
    .attr("class", "twenty");

  bars = usa
    .selectAll("div")
    .data(twentyTen)
    .enter()
    .append("div")
    .attr("class", "twentyTen");

  // .style(
  //   "background-color",
  //   d => (d < fourties.length ? "#FE4A49" : "#CCCCCC")
  // );

  // bars.attr("class", d => (d < fourties.length ? "four" : "nope"));
  // bars.attr(
  //   "class",
  //   d => (fourties.length < d < fifties.length ? "five" : "nope")
  // );
};
