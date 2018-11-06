d3.json("africa.geo.json").then(geojson => {
  // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2F1dGVyZCIsImEiOiJjajl6MDhhbmM4bWZjMndzNHdwc2dnM2JwIn0.ymR0Z5IEDE04lo11FJBvYw";

  // https://www.mapbox.com/mapbox-gl-js/api/#map
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/navigation-preview-night-v2",
    center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
    zoom: 0
  });

  // map.addControl(new mapboxgl.NavigationControl());

  let container = map.getCanvasContainer();
  let svgAfrica = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let transform = d3.geoTransform({ point: projectPoint }); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
  let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md

  let featureElement = svgAfrica
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(transform))
    .attr("stroke", "none")
    .attr("fill", "#fff")
    .attr("fill-opacity", 0.1);
  // .on("mouseover", function(d) {
  //   console.log(d);
  //   d3.select(this).attr("fill", "lightgreen");
  //   d3.select("#hover").text(
  //     d.properties.name.toUpperCase() +
  //       " (Population: " +
  //       (d.properties.pop_est / 1000000).toFixed(1) +
  //       "Mio.)"
  //   );
  //   d3.select("#hover").attr("fill-opacity", 1);
  // })
  // .on("mouseout", function() {
  //   d3.select(this).attr("fill", "lightgray");
  //   d3.select("#hover").attr("fill-opacity", 0);
  // })
  // .on("mousemove", function(d) {
  //   d3.select("#hover")
  //     .attr("x", function() {
  //       return d3.mouse(this)[0] + 20;
  //     })
  //     .attr("y", function() {
  //       return d3.mouse(this)[1] + 10;
  //     });
  // });

  svgAfrica.append("text").attr("id", "hover");

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
      if (i == 2 || i == 3 || i == 4) {
        featureElement
          .attr("stroke", "orange")
          .attr("stroke-opacity", 0.4)
          .attr("fill-opacity", 0.0);
      } else {
        featureElement.attr("stroke", "none").attr("fill-opacity", 0.1);
      }

      if (i == 1) {
        map.flyTo({
          center: [18.2812, 9.1021],
          zoom: 2
        });
      } else if (i == 2) {
        map.flyTo({
          center: [31.307, 6.877],
          zoom: 5
        });
      } else if (i == 3) {
        map.flyTo({
          center: [18.7322, 15.4542],
          zoom: 5
        });
      } else if (i == 4) {
        map.flyTo({
          center: [-9.4295, 6.4281],
          zoom: 6
        });
      } else {
        map.flyTo({
          center: [18.2812, 9.1021],
          zoom: 0
        });
      }
    });
});
