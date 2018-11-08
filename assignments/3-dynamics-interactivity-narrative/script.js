// to do
// section 1 graphics
// section 1 text
// section 3 graphic
// section 3 text
// responsive and better typography
// revise color palette
// edit writing
// revise interactivity/animation
// solve for overplotting
// footnotes and data sources
// data gutcheck

var data, nonCountries, subCountries, topCountries;
// load data
const rawData = d3.csv("data/cleaned/master_cleaned.csv", d => {
  return {
    country: d["Country"],
    ease: +d["Ease"],
    cost: +d["Cost"],
    access: +d["Access"],
    category: d["Category"],
    area: +d["totalareakm2"],
    csp: +d["csptwh"],
    pv: +d["pvtwh"],
    wind: +d["wind20twh"],
    totalPotential: +d["totaltwh"],
    perArea: +d["twhperkm2"],
    population: +d["population2017"],
    perPerson: +d["twhperperson"]
  };
});
// filter into sets
rawData.then(d => {
  data = d.filter(d => {
    return d.ease > 0; // all
  });
  // console.log(data);
});

rawData.then(d => {
  nonCountries = data.filter(d => {
    return d.category == "non";
  });
  // console.log(nonCountries);
});
rawData.then(d => {
  subCountries = data.filter(d => {
    return d.category == "sub";
  });
  // console.log(subCountries);
});
rawData.then(d => {
  topCountries = data.filter(d => {
    return d.category == "top";
  });
  // console.log(topCountries);
  svg(data, nonCountries, subCountries, topCountries, ".container-2 #graph");
});

// global svg variables
let margin = 25;
let marginBottom = 0;
let marginRight = 100;
let width, height;

if (window.innerWidth < 925) {
  width = window.innerWidth * 0.95 - margin;
  height = window.innerHeight * 0.6;
} else {
  width = window.innerWidth * 0.45 - margin;
  height = window.innerHeight * 0.9;
}

let svg = (data, nonCountries, subCountries, topCountries, applyTo) => {
  var svg1 = d3
    .select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#3d3d3d");

  var colors = ["orange", "purple", "steelblue", "pink", "blue", "green"];
  var r = [0, 40, 30, 25, 80, 130];
  var circle = svg1
    .append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", r[0]);

  d3.graphScroll()
    .container(d3.select(".container-1"))
    .graph(d3.selectAll("container-1 #graph"))
    .eventId("uniqueId1") // namespace for scroll and resize events
    .sections(d3.selectAll(".container-1 #sections > div"))
    // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
    .on("active", function(i) {
      circle
        .transition()
        .duration(1000)
        .attr("r", r[i])
        .transition()
        .style("fill", colors[i]);
    });

  // linear scale x
  let x = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, width - marginRight]);

  // linear scale y
  let y = d3
    .scaleLinear()
    .domain([0, 199])
    .range([height, margin]);

  let graph = d3
    .select(applyTo)
    .append("svg")
    .attr("width", width)
    .attr("height", height + 20);

  // title
  // let title = graph
  //   .append("g")
  //   .attr("id", "title")
  //   .append("text")
  //   .text("Total Electricty Output (GWh) to Renewable Energy Share (%), 2015")
  //   .style("text-anchor", "end")
  //   .attr("x", width)
  //   .attr("y", margin + 5);

  // x axis title
  let xAxisTitle = graph
    .append("g")
    .attr("id", "xAxisTitle")
    .append("text")
    .text("Access to Electricity (%)")
    .attr("x", width - marginRight - 10)
    .attr("y", height - 10)
    .style("text-anchor", "end");

  // y axis title
  let yAxisTitle = graph
    .append("g")
    .attr("id", "yAxisTitle")
    .append("text")
    .text("Ease of Doing Business Index (1 - 190) 1 = Easiest")
    .attr("x", margin + 10)
    .attr("y", margin + 5);

  // add scatter points and mouseover
  let group = graph.append("g").attr("id", "group");

  let points = group
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "hidden");

  points
    .on("mouseover", function() {
      d3.select("#group")
        .selectAll("g")
        .attr("class", "inactive");
      d3.select(this).attr("class", "active");
      d3.select(this)
        .select("text")
        .text(d => {
          return `${d.country} (${d.access}%, ${d.ease})`;
        });
    })

    .on("mouseout", function() {
      d3.select("#group")
        .selectAll("g")
        .attr("class", "up");
      d3.select(this)
        .select("text")
        .text(d => {
          return d.country;
        });
    });

  // visual plot points
  points
    .append("circle")

    .attr("cy", d => {
      return y(d.ease);
    })
    .attr("cx", d => {
      return x(d.access);
    })
    .transition()
    .delay(function(d, i) {
      return i * 10;
    }) // <-- delay as a function of i
    .attr("r", 4)
    .attr("id", "output");

  // text labels on points
  points
    .append("text")
    .attr("x", d => {
      return x(d.access) + 8;
    })
    .attr("y", d => {
      return y(d.ease) + 4;
    })
    .transition()
    .delay(function(d, i) {
      return i * 10;
    }) // <-- delay as a function of i
    .text(d => {
      return d.country;
    });

  // Axis ticks
  let xAxis = g =>
    g.attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

  let yAxis = g =>
    g
      .attr("transform", `translate(${margin},0)`)
      .call(d3.axisLeft(y))
      .attr("id", "xAxis");

  graph.append("g").call(xAxis);
  graph.append("g").call(yAxis);

  d3.graphScroll()
    .container(d3.select(".container-2"))
    .graph(d3.selectAll(".container-2 #graph"))
    .eventId("uniqueId2") // namespace for scroll and resize events
    .sections(d3.selectAll(".container-2 #sections > div"))
    // .offset(3000)
    .on("active", function(i) {
      if (i == 0) {
        points.attr("class", "hidden");
      } else if (i == 1) {
        points.attr("class", "up");
      } else if (i == 2) {
        points.attr("class", "inactive");
        points.classed("active", d => {
          return d.access == 100 && d.ease <= 50;
        });
      } else if (i == 3) {
        points.attr("class", "inactive");
        points.classed("active", d => {
          return d.category == "sub";
        });
      } else if (i == 4) {
        points.attr("class", "inactive");
        points.classed("active", d => {
          return d.category == "sub" && d.access < 25;
        });
      } else if (i == 5) {
        points.attr("class", "inactive");
        points.classed("active", d => {
          // return d.category == "sub" && d.ease > 173 && d.access < 21;
          return (
            d.country == "Chad" ||
            d.country == "Mozambique" ||
            d.country == "Niger"
          );
        });
      } else {
        points.attr("class", "up");
      }
    });
};

// var oldWidth = 0;
// function render() {
//   if (oldWidth == innerWidth) return;
//   oldWidth = innerWidth;

//   var width = (height = d3.select("#graph").node().offsetWidth);
//   var r = 40;

//   if (innerWidth <= 925) {
//     width = innerWidth;
//     height = innerHeight * 0.7;
//   }

//   // return console.log(width, height)

//   var svg1 = d3
//     .select("#graph")
//     .append("svg")
//     .attrs({ width: 500, height: 500 });

//   var circle = svg.append("circle").attrs({ cx: 0, cy: 0, r: r });

//   var colors = ["orange", "purple", "steelblue", "pink", "black"];
//   var gs = d3
//     .graphScroll()
//     .container(d3.select(".container-1"))
//     .graph(d3.selectAll("container-1 #graph"))
//     .eventId("uniqueId1") // namespace for scroll and resize events
//     .sections(d3.selectAll(".container-1 #sections > div"))
//     // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
//     .on("active", function(i) {
//       var pos = [
//         { cx: width - r, cy: r },
//         { cx: r, cy: r },
//         { cx: width - r, cy: height - r },
//         { cx: width / 2, cy: height / 2 }
//       ][i];

//       circle
//         .transition()
//         .duration(1000)
//         .attrs(pos)
//         .transition()
//         .style("fill", colors[i]);
//     });

//   var svg2 = d3
//     .select(".container-2 #graph")
//     .html("")
//     .append("svg")
//     .attrs({ width: width, height: height });

//   var path = svg2.append("path");

//   var gs2 = d3
//     .graphScroll()
//     .container(d3.select(".container-2"))
//     .graph(d3.selectAll(".container-2 #graph"))
//     .eventId("uniqueId2") // namespace for scroll and resize events
//     .sections(d3.selectAll(".container-2 #sections > div"))
//     .on("active", function(i) {
//       var h = height;
//       var w = width;
//       var dArray = [
//         [
//           [w / 4, h / 4],
//           [(w * 3) / 4, h / 4],
//           [(w * 3) / 4, (h * 3) / 4],
//           [w / 4, (h * 3) / 4]
//         ],
//         [
//           [0, 0],
//           [(w * 3) / 4, h / 4],
//           [(w * 3) / 4, (h * 3) / 4],
//           [w / 4, (h * 3) / 4]
//         ],
//         [[w / 2, h / 2], [w, h / 4], [w, h], [w / 4, h]],
//         [[w / 2, h / 2], [w, h / 4], [w, h], [w / 4, h]],
//         [[w / 2, h / 2], [w, h / 2], [0, 0], [w / 4, h / 2]],
//         [[w / 2, h / 2], [0, h / 4], [0, h / 2], [w / 4, 0]]
//       ].map(function(d) {
//         return "M" + d.join(" L ");
//       });

//       path
//         .transition()
//         .duration(1000)
//         .attr("d", dArray[i])
//         .style("fill", colors[i]);
//     });

//   d3.select("#source").styles({
//     "margin-bottom": window.innerHeight - 450 + "px",
//     padding: "100px"
//   });
// }
// render();
// d3.select(window).on("resize", render);
