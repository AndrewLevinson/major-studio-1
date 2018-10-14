const rawData = d3.json("museums.json");
const canvasHeight = window.innerHeight * 0.8;
const canvasWidth = window.innerWidth * 0.8;

rawData.then(data => {
  svg(data);
  console.log(data);
});

let graph = d3
  .select("body")
  .append("svg")
  .attr("height", canvasHeight)
  .attr("width", canvasWidth);

let svg = data => {
  // map positions horizontally
  let x = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([1 - canvasWidth / window.innerWidth, canvasWidth]);

  // linear scale
  let y = d3
    .scaleLinear()
    .domain([0, 250000000])
    .range([0, canvasHeight]);

  // callout
  let heading = graph
    .append("text")
    .attr("id", "heading")
    .attr("fill", "#fff")
    .attr("x", 1 - canvasWidth / window.innerWidth + 50)
    .attr("y", 1 - canvasWidth / window.innerHeight + 50)
    .attr("font-size", "200%")
    .text("US Nonprofit Art Institutions");

  let modal = graph.append("g").attr("id", "modal");

  graph.append("g").attr("id", "group");

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
      return `translate(${(i * window.innerWidth) / data.length}, 0)`;
      // return "translate(" + x(i) + ", " + 0 + ")";
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

  bars
    .append("rect")
    .attr("class", "bar")
    .style("fill", "#fff")
    .attr("width", 20)
    .attr("height", (d, i) => {
      return y(d.operatingExpenses);
    })
    .attr("y", (d, i) => {
      return canvasHeight - y(d.operatingExpenses);
    });

  // name label
  bars
    .append("text")
    .attr("fill", "#fff")
    .text(d => {
      return d.name;
    })
    .attr("transform", (d, i) => {
      return (
        "translate(15, " +
        (canvasHeight - y(d.operatingExpenses) - 5) +
        ")rotate(-90)"
      );
    })
    .attr("width", 1000);
};
