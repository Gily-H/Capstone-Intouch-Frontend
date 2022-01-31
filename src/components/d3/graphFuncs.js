/* graph component creation functions */

export function createNodes(svg, data, eventHandler) {
  const nodes = svg
    .selectAll(".node")
    .data(data)
    .join("circle")
    .attr("r", 20)
    .attr("fill", (datum, index) => randomBackgroundColor(index))
    .classed("node", true)
    .on("mousedown", (event, datum) => {
      eventHandler(datum);
    });

  nodes.transition().duration(1000).attr("r", 35);
  return nodes;
}

export function createLinks(svg, data) {
  const links = svg
    .selectAll(".link")
    .data(data)
    .join("line")
    .attr("stroke-width", "0px")
    .classed("link", true)
    .on("click", () => alert("clicked link"));

  links.transition().duration(2000).attr("stroke-width", "1.5px");
  return links;
}

export function createNodeText(svg, data, eventHandler) {
  const texts = svg
    .selectAll(".text")
    .data(data)
    .join("text")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    // .attr("dy", "0.35em")
    .text((datum) => setInitials(datum))
    .classed("text", true)
    .on("mousedown", (event, datum) => {
      eventHandler(datum);
    });

  return texts;
}

/* graph event handlers */
export function onTick(links, nodes, texts) {
  links
    .attr("x1", (link) => link.source.x)
    .attr("y1", (link) => link.source.y)
    .attr("x2", (link) => link.target.x)
    .attr("y2", (link) => link.target.y);
  nodes.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
  texts.attr("x", (node) => node.x).attr("y", (node) => node.y);
}

/* styling helper functions */

function randomBackgroundColor(datum) {
  const COLORS = [
    "#7094cf",
    "#cf9c70",
    "#cf7070",
    "#70cf7e",
    "#8c70cf",
    "#ed7edb",
    "#ffaf69",
  ];

  const random = datum % COLORS.length;
  return COLORS[random];
}

function setInitials(datum) {
  const initials = datum.firstName
    ? (datum.firstName[0] + datum.lastName[0]).toUpperCase()
    : "";
  return initials;
}
