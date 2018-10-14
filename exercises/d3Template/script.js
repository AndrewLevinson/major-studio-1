// 1 basic shapes exer.

// var svg = d3.select("svg");

// svg
//   .append("circle")
//   .attr("r", 20)
//   .attr("cx", 100)
//   .attr("cy", 75);

// svg
//   .append("rect")
//   .attr("x", 300)
//   .attr("y", 50)
//   .attr("width", 50)
//   .attr("height", 50);

// svg
//   .append("polygon")
//   .attr("transform", "translate(100, 150) scale(2)")
//   .attr("points", "60,30 100,50 100,90 60,110 20,90 20,50");

// 2 ripple effect
//   d3.select("body")
//   .append("svg")
//   .attr("width", window.innerWidth)
//   .attr("height", window.innerHeight)
//   .on("mousemove", ripple);
// function ripple() {
//   var mouse = d3.mouse(this);

//   d3.select("svg")
//     .insert("circle")
//     .attr("r", 0)
//     .attr("cx", mouse[0])
//     .attr("cy", mouse[1])
//     .style("fill", "transparent")
//     .style("stroke", "#3d3d3d")
//     .style("stroke-opacity", 1)
//     .transition()
//     .attr("r", 50)
//     .style("stroke-opacity", 0)
//     .duration(2000)
//     .remove();
// }

const groceries = d3.tsv("groceries.tsv");

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight);

groceries.then(items => {
  // brute force version
  //   items.forEach((d, i) => {
  //     d3.select("svg")
  //       .append("text")
  //       .text(d.amount + " | " + d.unit + " | " + d.item + " | " + d.source)
  //       .attr("x", window.innerWidth / 2)
  //       .attr("y", 100 + i * 30)
  //       .style("text-anchor", "middle")
  //       .style("fill", () => {
  //         if (d.source === "market") return "limegreen";
  //       });
  //   });

  svg
    .selectAll(".item")
    .data(items)
    .enter()
    .append("text")
    .attr("class", "item")
    .text(d => {
      return d.amount + " | " + d.unit + " | " + d.item + " | " + d.source;
    })
    .attr("x", window.innerWidth / 2)
    .attr("y", (d, i) => {
      return 100 + i * 30;
    })
    .style("text-anchor", "middle")
    .style("fill", d => {
      if (d.source === "market") return "limegreen";
    });
});
