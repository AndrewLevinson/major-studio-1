// load json data from local source
d3.json("museums.json").then(data => {
  svg(data);
});

// globals
let margin = 50;
let height = window.innerHeight - margin;
let width = window.innerWidth - margin;

// append svg full browser width
let graph = d3
  .select("body")
  .append("svg")
  .attr("width", window.innerWidth + "px")
  .attr("height", window.innerHeight + "px");

let svg = data => {
  // private letiables
  // map positions horizontally
  let x = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([margin, width]);

  // determine maximum for specified string value
  let max = (() => {
    let tmp = [];
    for (let i in data) {
      tmp.push(data[i].operatingExpenses);
    }
    return d3.max(d3.values(tmp));
  })(); // invoke immediately

  let y = d3
    .scaleLinear()
    .domain([0, max])
    .range([0, height - margin]);

  // callout
  let heading = graph
    .append("text")
    .attr("id", "heading")
    .attr("x", margin)
    .attr("y", margin)
    .attr("font-size", "200%")
    .text("US Nonprofit Art Institutions");

  let group = graph.append("g").attr("id", "group");

  let bars = graph
    .select("#group")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("x", (d, i) => {
      return x(i);
    })
    .attr("transform", (d, i) => {
      return "translate(" + x(i) + ", " + 0 + ")";
    })
    .on("mouseover", function(d) {
      heading.text(d.name);

      d3.select(this)
        .select("text")
        .text(d => {
          return "$ " + d.operatingExpenses;
        });
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .select("text")
        .text(d => {
          return d.name;
        });
    });

  // bar
  bars
    .append("rect")
    .attr("class", "bar")
    .attr("y", (d, i) => {
      return height - y(d.operatingExpenses);
    })
    .attr("width", "20px")
    .attr("height", (d, i) => {
      return y(d.operatingExpenses);
    });

  // name label
  bars
    .append("text")
    .text(d => {
      return d.name;
    })
    .attr("transform", (d, i) => {
      return (
        "translate(15, " +
        (height - y(d.operatingExpenses) - 5) +
        ")rotate(-90)"
      );
    })
    .attr("width", 1000);
};
