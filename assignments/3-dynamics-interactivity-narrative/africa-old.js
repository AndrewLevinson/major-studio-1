d3.json("africa.geo.json").then(geojson => {
  console.log(geojson);

  let svgAfrica = d3.select(".africa-map").append("svg");

  scale = scaleFactor => {
    return d3.geoTransform({
      point: function(x, y) {
        this.stream.point(x * scaleFactor, -1 * y * scaleFactor);
      }
    });
  };

  let featureElement = svgAfrica
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(scale(5)))
    .attr("stroke", "black")
    .attr("fill", "lightgray")
    .attr("fill-opacity", 0.5)
    .on("mouseover", function(d) {
      console.log(d);
      d3.select(this).attr("fill", "lightgreen");
      d3.select("#hover")
        // .text(d.properties.name.toUpperCase() + ' in ' + d.properties.subregion + ' (Population: ' + (d.properties.pop_est / 1000000).toFixed(1) + 'Mio.)');
        .text(
          `${d.properties.name.toUpperCase()} (${
            d.properties.subregion
          }) Population: ${(d.properties.pop_est / 1000000).toFixed(1)} Mio.`
        );
      d3.select("#hover").attr("fill-opacity", 1);
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "lightgray");
      d3.select("#hover").attr("fill-opacity", 0);
    })
    .on("mousemove", function(d) {
      d3.select("#hover")
        .attr("x", function() {
          return d3.mouse(this)[0] + 20;
        })
        .attr("y", function() {
          return d3.mouse(this)[1] + 10;
        });
    });

  svgAfrica.append("text").attr("id", "hover");
});
