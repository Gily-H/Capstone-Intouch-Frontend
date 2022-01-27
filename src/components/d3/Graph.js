import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
// import useD3 from "../../hooks/useD3";
import {
  createNodes,
  createLinks,
  randomBackgroundColor,
  setInitials,
} from "./graphFuncs";
import "../../styles/Graph.css";
import Navbar from "../Navbar";

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

    // draws a circle - I did this to make a visual representation of the forceRadial
    svg
      .selectAll(".enclosure")
      .data([props.data])
      .join("circle")
      .attr("stroke", "green")
      .attr("fill", "none")
      .attr("r", 500)
      .attr("cx", props.dimensions.width / 2)
      .attr("cy", props.dimensions.height / 2);

    /* graph components */
    const links = svg
      .selectAll(".link")
      .data(props.data.links)
      .join("line")
      .classed("link", true)
      .on("click", () => alert("clicked link"));

    const nodes = svg
      .selectAll(".node")
      .data(props.data.nodes)
      .join("circle")
      .attr("r", 20)
      .attr("fill", (datum) => randomBackgroundColor(datum.id))
      .classed("node", true)
      .on("mousedown", (event, datum) => {
        props.retrieveHandler(datum);
      });

    const text = svg
      .selectAll(".text")
      .data(props.data.nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      // .attr("dy", "0.35em")
      .text((datum) => setInitials(datum))
      .classed("text", true)
      .on("mousedown", (event, datum) => {
        props.retrieveHandler(datum);
      });

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
        d3.forceLink(props.data.links).distance((link) => {
          // limit how far the nodes can move - CHANGE THE LINK VALUE BASED ON TIME DIFF INSTEAD OF PERSON's ID VALUE
          console.log(`${link.target.firstName} ${link.target.days}`);
          if (link.target.days * EDGE_GROWTH_FACTOR > 500) {
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
    simulation.on("tick", tick);

    /* update positions function */
    function tick() {
      console.log("tick");
      links
        .attr("x1", (link) => link.source.x)
        .attr("y1", (link) => link.source.y)
        .attr("x2", (link) => link.target.x)
        .attr("y2", (link) => link.target.y);
      nodes.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
      text.attr("x", (node) => node.x).attr("y", (node) => node.y);
    }
  }, [props.data.nodes.length]);

  return (
    <div className="svg-container">
      <svg className="graph" ref={networkGraph}></svg>
    </div>
  );
}
