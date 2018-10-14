d3.select("body")
  .append("input")
  .on("change", callback);

function callback(event) {
  d3.select("#content")
    .append("span")
    .text(this.value);
}
