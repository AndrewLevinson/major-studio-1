d3.json("museums.json").then(data => {
  data = data.filter(d => {
    return d.operatingExpenses > 2000000;
  });
  data = data.filter(data => {
    return data.name.match("Art");
  });
  svg(data);
});

let svg = data => {
  // linear scale
  let y = d3
    .scaleLinear()
    .domain([0, 250000000])
    .range([0, window.innerHeight]);
  // y(255000)

  let graph = d3
    .select("body")
    .append("svg")
    .attr("width", window.innerWidth + "px")
    .attr("height", window.innerHeight + "px");

  let modal = graph.append("g").attr("id", "modal");

  let group = graph.append("g").attr("id", "group");

  let bars = group
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => {
      // return 'translate('+(i * window.innerWidth/data.length)+', 0)'; // i * window.innerWidth/data.length
      return `translate(${(i * window.innerWidth) / data.length}, 0)`; // i * window.innerWidth/data.length
    })
    .attr("cat", daniel => {
      return daniel.operatingExpenses;
    })
    .on("mouseover", function(d) {
      d3.select(this)
        .select("text")
        .text(d => {
          return d.operatingExpenses;
        });
      d3.select(this)
        .select("#output")
        .style("fill", "gray");
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .select("text")
        .text(d => {
          return d.name;
        });
      d3.select(this)
        .select("#output")
        .style("fill", "black");
    });

  // visual bar
  bars
    .append("rect")
    .attr("width", "20px") // TODO
    .attr("height", (d, i) => {
      return d.operatingExpenses * 0.000002;
    }) // TODO
    // .attr('x', )
    .attr("y", (d, i) => {
      return window.innerHeight - d.operatingExpenses * 0.000002;
    })
    .attr("id", "output");

  // hover
  bars
    .append("rect")
    .attr("width", "20px") // TODO
    .attr("height", window.innerHeight) // TODO
    .attr("y", 0)
    .style("fill", "transparent");

  bars
    .append("text")
    .text(d => {
      return d.name;
    })
    .attr("transform", (d, i) => {
      return `translate(0, ${window.innerHeight -
        d.operatingExpenses * 0.000002}) rotate(-90) scale(1.5)`; // i * window.innerWidth/data.length
    });
};
