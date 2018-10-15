// Ideas
// 1. Scatterplot of x (raw GWH energy used) y (% of renewable energy thats from renewable)
// 2. Bar chart x (top ten energy heavy counties) y (total energy consumption) and bars show portion that's from renewable
// 3. Line chart to compare country or region to world's access to energy
// https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS?end=2016&locations=ZG-1W&name_desc=false&start=1990&type=shaded&view=chart

// Below is idea #1

// tried to parse full data set but couldnt figure ut out. Used revised cvs below
// d3.csv("data/SE4ALL_csv/SE4ALLData.csv", d => {
//   return {
//     country: d["Country Name"],
//     value: +d["2015"], // convert "2015" column to number
//     indicator: d["Indicator Code"]
//   };
// }).then(d => {
//   data = d.filter(d => {
//     return (
//       d.indicator == "4.1_SHARE.RE.IN.ELECTRICITY" ||
//       d.indicator == "4.1.1_TOTAL.ELECTRICITY.OUTPUT"
//     );
//   });
//   console.log(data);
//   svg(data);
// });

d3.csv("data/revised2015.csv", d => {
  return {
    country: d["Country"],
    renewablePercent: +d["4.1_SHARE.RE.IN.ELECTRICITY"],
    totalOutput: +d["4.1.1_TOTAL.ELECTRICITY.OUTPUT"],
    flag: d["Flag"]
  };
}).then(d => {
  data = d.filter(d => {
    return d.totalOutput > 200000;
  });
  console.log(data);
  svg(data);
});

// global variables
let margin = 50;
let marginBottom = 150;
let height = window.innerHeight - marginBottom;
let width = window.innerWidth - margin;

let svg = data => {
  // linear scale x
  let x = d3
    .scaleLinear()
    .domain([0, 6000000])
    .range([margin, width]);

  // linear scale y
  let y = d3
    .scaleLinear()
    .domain([0, 80])
    .range([height, margin]);

  let graph = d3
    .select(".container")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

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
    .text("Total electricity output (GWh)")
    .attr("x", width - 230)
    .attr("y", height - 10);

  // y axis title
  let yAxisTitle = graph
    .append("g")
    .attr("id", "yAxisTitle")
    .append("text")
    .text("Renewable Energy share (%)")
    .attr("x", margin + 10)
    .attr("y", margin + 5);

  // add scatter points and mouseover
  let group = graph.append("g").attr("id", "group");

  let point = group
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "up")
    .on("mouseover", function() {
      d3.select("#group")
        .selectAll("g")
        .attr("class", "inactive");
      d3.select(this).attr("class", "active");
      d3.select(this)
        .select("text")
        .text(d => {
          return `${d.country} (${d.totalOutput} GWh, ${Math.floor(
            d.renewablePercent
          )}%)`;
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
  point
    .append("circle")
    .attr("cy", d => {
      return y(d.renewablePercent);
    })
    .attr("cx", d => {
      return x(d.totalOutput);
    })
    .attr("r", 4)
    .attr("id", "output");

  // text labels on points
  point
    .append("text")
    .text(d => {
      return d.country;
    })
    .attr("x", d => {
      return x(d.totalOutput) + 8;
    })
    .attr("y", d => {
      return y(d.renewablePercent) + 4;
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
};
