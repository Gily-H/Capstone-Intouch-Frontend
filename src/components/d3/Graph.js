import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useD3 from "../../hooks/useD3";

export default function Graph(props) {
  const size = { width: 200, length: 200 };

  const networkGraph = useD3(() => {
    const svg = d3
      .select(networkGraph.current)
      .html("")
      .attr("viewBox", [0, 0, size.width, size.length]);

    const link = svg
      .selectAll(".link")
      .data(props.data.links)
      .join("line")
      .classed("link", true);

    const node = svg
      .selectAll(".node")
      .data(props.data.nodes) // array of data to be mapped to html/svg elements
      .join("circle") // add or remove html/svg elements to match the number of data entries
      .attr("r", 10)
      .classed("node", true)
      .classed("fixed", (d) => d.fx !== undefined);

    svg.node();

    const simulation = d3
      .forceSimulation(props.data.nodes)
      .force("charge", d3.forceManyBody()) // magnetic force, positive attracts, default -30
      .force("center", d3.forceCenter(size.width / 2, size.length / 2)) // point to center on canvas
      .force(
        "link",
        d3.forceLink(props.data.links).distance(() => 80) // set link line length (competes with force)
      )
      .on("tick", tick); // get state of layout whe it has changed (advanced one tick)

    function tick() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }
  }, [props.data.nodes.length]);

  return (
    <div className="svg-container">
      <svg ref={networkGraph}></svg>
    </div>
  );
}
