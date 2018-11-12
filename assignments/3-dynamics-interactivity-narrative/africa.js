d3.json("data/africaRev.geojson").then(geojson => {
  // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2F1dGVyZCIsImEiOiJjajl6MDhhbmM4bWZjMndzNHdwc2dnM2JwIn0.ymR0Z5IEDE04lo11FJBvYw";

  // https://www.mapbox.com/mapbox-gl-js/api/#map
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/navigation-preview-night-v2",
    center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
    zoom: 1
  });

  map.addControl(new mapboxgl.NavigationControl());
  const numFormatT = d3.format(",d");
  const numFormatF = d3.format(".2f");
  let container = map.getCanvasContainer();
  let svgAfrica = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let transform = d3.geoTransform({ point: projectPoint }); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
  let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md

  let domainMin = 0;
  let capitaMax = 0.002;
  let areaMax = 0.05;

  let colorScale = d3
    .scaleSequential(d3.interpolateGreens)
    .domain([domainMin, areaMax]);

  let featureElement = svgAfrica
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(transform))
    .attr("stroke", "none")
    .attr("fill", function(d) {
      return d.properties.totaltwh == 0
        ? "grey"
        : colorScale(d.properties.totaltwh / d.properties.areakm);
    })
    .attr("fill-opacity", 0.5)
    .attr("stroke", function(d, i) {
      if (
        d.properties.name == "S. Sudan" ||
        d.properties.name == "Mozambique" ||
        d.properties.name == "Niger" ||
        d.properties.name == "Dem. Rep. Congo" ||
        d.properties.name == "Chad" ||
        d.properties.name == "Burkina Faso" ||
        d.properties.name == "Malawi" ||
        d.properties.name == "Madagascar" ||
        d.properties.name == "Central African Rep." ||
        d.properties.name == "Guinea-Bissau" ||
        d.properties.name == "Sierra Leone" ||
        d.properties.name == "Burundi" ||
        d.properties.name == "Liberia"
      ) {
        return "#00FF40";
      }
    });

  // tooltip method
  var tooltip = {
    element: null,
    init: function() {
      this.element = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    },
    show: function(t) {
      this.element
        .html(t)
        .transition()
        .duration(200)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 20 + "px")
        .style("opacity", 0.9);
    },
    move: function() {
      this.element
        .transition()
        .duration(30)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 20 + "px")
        .style("opacity", 0.9);
    },
    hide: function() {
      this.element
        .transition()
        .duration(500)
        .style("opacity", 0);
    }
  };

  tooltip.init();

  featureElement
    .on("mouseover", function(d) {
      tooltip.show(
        `<b>${d.properties.name.toUpperCase()}</b><br>
        Access to Electricity: ${
          d.properties.access == 0 || d.properties.access == null
            ? "--"
            : d.properties.access + "%"
        }<br>
        Doing Business Rank: ${
          d.properties.easedb == 0 || d.properties.easedb == null
            ? "--"
            : numFormatT(d.properties.easedb) + " of 190"
        }<br>
        <b><span>Solar & Wind Potential</span></b><br>
        Total Raw Potential: 
        ${numFormatT(d.properties.totaltwh)} TWh/year<br>
        Potential per Capita: ${numFormatT(
          (d.properties.totaltwh * 1000000000) / d.properties.pop_2017
        )} KWh/year<br>
        Potential per Area: ${numFormatT(
          (d.properties.totaltwh * 1000000000) / d.properties.areakm
        )} KWh/year
        `
      );
    })
    .on("mousemove", function(d, i) {
      tooltip.move();
    })
    .on("mouseout", function(d, i) {
      //createStuff();
      tooltip.hide();
    });

  // svgAfrica.append("text").attr("id", "hover");

  function update() {
    featureElement.attr("d", path);
  }

  map.on("viewreset", update);
  map.on("movestart", function() {
    svgAfrica.classed("hide-map", true);
  });
  map.on("rotate", function() {
    svgAfrica.classed("hide-map", true);
  });
  map.on("moveend", function() {
    update();
    svgAfrica.classed("hide-map", false);
  });
  update();

  function projectPoint(lon, lat) {
    let point = map.project(new mapboxgl.LngLat(lon, lat));
    this.stream.point(point.x, point.y);
  }

  d3.graphScroll()
    .container(d3.select(".container-3"))
    .graph(d3.selectAll(".container-3 #graph"))
    .eventId("uniqueId3") // namespace for scroll and resize events
    .sections(d3.selectAll(".container-3 #sections > div"))
    // .offset(3000)
    .on("active", function(i) {
      // if (i == 2 || i == 3 || i == 4) {
      //   featureElement.attr("stroke", "green").attr("stroke-opacity", 0.9);
      //   // .attr("fill-opacity", 0.0);
      // } else {
      //   featureElement.attr("stroke", "none").attr("fill-opacity", 0.4);
      // }
      console.log("map", i);

      if (i == 2) {
        // colorScale.domain([domainMin, areaMax]);
        // featureElement.transition().attr("fill", function(d) {
        //   return d.properties.totaltwh == 0
        //     ? "grey"
        //     : colorScale(d.properties.totaltwh / d.properties.areakm);
        // });
        map.flyTo({
          center: [18.2812, 9.1021],
          zoom: 2.4
        });
      } else if (i == 3) {
        map.flyTo({
          center: [18.7322, 15.4542],
          zoom: 4.5
        });
        // colorScale.domain([domainMin, capitaMax]);
        // featureElement.transition().attr("fill", function(d) {
        //   return d.properties.totaltwh == 0
        //     ? "grey"
        //     : colorScale(d.properties.totaltwh / d.properties.pop_2017);
        // });
      } else if (i == 3) {
        map.flyTo({
          center: [8.0817, 17.6078],
          zoom: 4.5
        });
      } else if (i == 4) {
        map.flyTo({
          center: [35.5296, -18.6657],
          zoom: 4.5
        });
      } else {
        map.flyTo({
          center: [18.2812, 9.1021],
          zoom: 1
        });
      }
    });
});
