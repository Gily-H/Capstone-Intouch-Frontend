import * as d3 from "d3";

export function createNodes(svg, data, eventHandler) {
  const nodes = svg
    .selectAll(".node")
    .data(data)
    .join("circle")
    .attr("r", 10)
    .classed("node", true)
    .classed("fixed", (d) => d.fx !== undefined) // if undefined, nodes will move aroud
    .on("mousedown", (event, datum) => {
      eventHandler(datum);
    });

  return nodes;
}

export function createLinks(svg, data) {
  const links = svg
    .selectAll(".link")
    .data(data)
    .join("line")
    .classed("link", true)
    .on("click", () => alert("clicked link"));

  return links;
}

function addTooltip(circle) {
  var x = parseFloat(circle.attr("cx"));
  var y = parseFloat(circle.attr("cy"));
  var text = circle.attr("id");

  var tooltip = d3
    .select("#plot")
    .append("text")
    .text(text)
    .attr("x", x)
    .attr("y", y)
    .attr("id", "tooltip");

  var offset = tooltip.node().getBBox().width / 2;

  if (x - offset < 0) {
    tooltip.attr("text-anchor", "start");
  } else if (x + offset > 100 - 20) {
    tooltip.attr("text-anchor", "end");
  } else {
    tooltip.attr("text-anchor", "middle");
    tooltip.attr("dx", 0);
  }
}
