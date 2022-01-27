import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { zoomTransform } from "d3-zoom";
import { createNodes, createLinks, createNodeText, onTick } from "./graphFuncs";
import "../../styles/Graph.css";

export default function Graph(props) {
  /* 
    radius of outer circle / 30 units of time -> (30 is a temporary unit of time measure that we need to decide on) 
    graph edge will grow approximately 17 pixels per unit of time that passes
    Avoiding using floating point -> 17 is a close enough approximation  
  */
  const EDGE_GROWTH_FACTOR = 17;
  const networkGraph = useRef();

  useEffect(() => {
    const svg = d3
      .select(networkGraph.current)
      .html("")
      .attr("viewbox", [0, 0, props.dimensions.width, props.dimensions.height]);

    /* graph components */
    const links = createLinks(svg, props.data.links);
    const nodes = createNodes(svg, props.data.nodes, props.retrieveHandler);
    const text = createNodeText(svg, props.data.nodes, props.retrieveHandler);

    /* graph forces */
    const simulation = d3
      .forceSimulation(props.data.nodes)
      .force("charge", d3.forceManyBody().strength(10)) // magnetic force between nodes, positive attracts, default -30
      .force("collide", d3.forceCollide(20)) // prevent node overlap
      .force(
        "center",
        d3
          .forceCenter(props.dimensions.width / 2, props.dimensions.height / 2)
          .strength(1)
      ) // force exerted from center point - evenly spreads distance between nodes

      // creates a circle that applies a pulling force to all nodes
      // .force(
      //   "enclosure",
      //   d3
      //     .forceRadial(
      //       500, // radius
      //       props.dimensions.width / 2,
      //       props.dimensions.height / 2
      //     )
      //     .strength(0.05) // maybe update this value to move nodes closer
      // )
      .force(
        "links",
        d3
          .forceLink(props.data.links)
          .id((datum) => datum.id)
          .distance((link) => {
            // limit how far the nodes can move - CHANGE THE LINK VALUE BASED ON TIME DIFF INSTEAD OF PERSON's ID VALUE
            // console.log(`${link.target.firstName} ${link.target.days}`);
            if (30 * EDGE_GROWTH_FACTOR > 500) {
              return props.dimensions.width / 2; // TOUCH OUTER RADIAL EDGE
            }
            return 30 * EDGE_GROWTH_FACTOR; // MOVE EDGE CLOSER TO RADIAL EDGE
          })
      )
      // .alpha(0.9) // will decay until reaches default break point of 0.001
      // .alphaMin(0.01) // without this -> infinite loop
      // .alphaDecay(0.05) // rate of decay
      .tick(35); // subtract from default ticks (300 - 35 = 265 ticks)

    // default 300 ticks per simulation before simulation stops
    simulation.on("tick", onTick(links, nodes, text));

    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on("zoom", () => {
        const zoomState = zoomTransform(svg.node());
        links.attr("transform", zoomState);
        nodes.attr("transform", zoomState);
        text.attr("transform", zoomState);
        console.log(zoomState);
      });

    svg.call(zoom);
  }, [props.data.nodes.length]);

  return (
    <div className="svg-container">
      <svg className="graph" ref={networkGraph}></svg>
    </div>
  );
}
