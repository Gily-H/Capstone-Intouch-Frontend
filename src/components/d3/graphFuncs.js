import * as d3 from "d3";

export function createNodes(svg, data, eventHandler) {
  const nodes = svg
    .selectAll(".node")
    .data(data)
    .join("circle")
    .attr("r", 10)
    .attr("cx", (node) => node.x)
    .attr("cy", (node) => node.y)
    .classed("node", true)
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
    .attr("x1", (link) => link.source.x)
    .attr("y1", (link) => link.source.y)
    .attr("x2", (link) => link.target.x)
    .attr("y2", (link) => link.target.y)
    .classed("link", true)
    .on("click", () => alert("clicked link"));

  return links;
}

export function createSvg(ref, width, length) {
  const svg = d3.select(ref);
  return svg;
}
