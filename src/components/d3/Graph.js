import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Graph(props) {
  const networkGraph = useRef();

  const size = { width: 200, length: 200 };

  useEffect(() => {
    const svg = d3
        .select(networkGraph.current)
        .html("")
        .attr("viewBox", [0, 0, size.width, size.length]),
      link = svg
        .selectAll(".link")
        .data(props.graph.links)
        .join("line")
        .classed("link", true),
      node = svg
        .selectAll(".node")
        .data(props.graph.nodes)
        .join("circle")
        .attr("r", 10)
        .classed("node", true)
        .classed("fixed", (d) => d.fx !== undefined);

    svg.node();

    const simulation = d3
      .forceSimulation()
      .nodes(props.graph.nodes)
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(size.width / 2, size.length / 2))
      .force(
        "link",
        d3.forceLink(props.graph.links).distance(() => 80)
      )
      .on("tick", tick);

    function tick() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }
  }, []);

  return (
    <div className="svg-container">
      <svg ref={networkGraph}></svg>
    </div>
  );
}
