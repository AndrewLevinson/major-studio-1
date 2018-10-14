// Ideas
// 1. Scatterplot of x (raw GWH energy used) y (% of renewable energy thats from renewable)
// 2. Bar chart x (top ten energy heavy counties) y (total energy consumption) and bars show portion that's from renewable
// 3. Line chart to compare country or region to world's access to energy
// https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS?end=2016&locations=ZG-1W&name_desc=false&start=1990&type=shaded&view=chart

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
    return d.totalOutput > 100;
  });
  console.log(data);
  svg(data);
});

// globals
let margin = 100;
let height = window.innerHeight - margin;
let width = window.innerWidth - margin;

let svg = data => {
  // linear scale
  let x = d3
    .scaleLinear()
    .domain([0, 6000000])
    .range([margin, width]);

  let y = d3
    .scaleLinear()
    .domain([0, 80])
    .range([height, margin]);

  let graph = d3
    .select("body")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

  let modal = graph.append("g").attr("id", "modal");

  let group = graph.append("g").attr("id", "group");

  let point = group
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    // .attr("transform", (d, i) => {
    //   // return 'translate('+(i * window.innerWidth/data.length)+', 0)'; // i * window.innerWidth/data.length
    //   return `translate(${(i * window.innerWidth) / data.length}, 0)`; // i * window.innerWidth/data.length
    // })
    .on("mouseover", function() {
      d3.select(this)
        .select("text")
        .text(d => {
          return `(${d.totalOutput}, ${Math.floor(d.renewablePercent)}%)`;
        });
      d3.select(this)
        .select("#output")
        .style("fill", "gray");
    })
    .on("mouseout", function() {
      d3.select(this)
        .select("text")
        .text(d => {
          return d.country;
        });
      d3.select(this)
        .select("#output")
        .style("fill", "black");
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
    .attr("r", 8)
    .attr("id", "output");

  // text labels on points
  point
    .append("text")
    .text(d => {
      return "\uf118";
    })
    .attr("x", d => {
      return x(d.totalOutput) - 20;
    })
    .attr("y", d => {
      return y(d.renewablePercent) + 20;
    });
  // .attr("transform", (d, i) => {
  //   return `translate(0, ${window.innerHeight -
  //     d.operatingExpenses * 0.000002}) rotate(0) scale(1)`; // i * window.innerWidth/data.length
  // });

  let xAxis = g =>
    g
      .attr("transform", `translate(0,${height + 50})`)
      .call(d3.axisBottom(x))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", -4)
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .text(data.x)
      );

  let yAxis = g =>
    g
      .attr("transform", `translate(${margin},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 4)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y)
      );

  graph.append("g").call(xAxis);
  graph.append("g").call(yAxis);
};
