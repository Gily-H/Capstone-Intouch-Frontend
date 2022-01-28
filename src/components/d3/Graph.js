import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { zoomTransform } from "d3-zoom";
import { createNodes, createLinks, createNodeText, onTick } from "./graphFuncs";
import "../../styles/Graph.css";
import FriendSlide from "../FriendSlide";

export default function Graph(props) {
  const [strengths, setStrengths] = useState(() => {
    const strengthList = props.data.nodes.map((node) => node.strength || 0);
    strengthList.shift();
    return strengthList;
  });

  function updateConnection(index) {
    setStrengths((prevStrengths) => {
      const currentStrengths = [...prevStrengths];
      const newStrength = currentStrengths[index] - 20;
      currentStrengths[index] = newStrength;
      return currentStrengths;
    });
  }

  const EDGE_GROWTH_FACTOR = 5;
  const networkGraph = useRef();

  useEffect(() => {
    const svg = d3
      .select(networkGraph.current)
      .attr("viewbox", [0, 0, props.dimensions.width, props.dimensions.height]);

    /* graph components */
    const links = createLinks(svg, props.data.links);
    const nodes = createNodes(svg, props.data.nodes, props.retrieveHandler);
    const text = createNodeText(svg, props.data.nodes, props.retrieveHandler);

    /* graph forces */
    const simulation = d3
      .forceSimulation(props.data.nodes)
      .force(
        "charge",
        d3.forceManyBody().strength((d, i) => (i === 0 ? 10 * -500 : -500))
      ) // magnetic force between nodes, positive attracts, default -30
      .force("collide", d3.forceCollide(100)) // prevent node overlap
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
          .distance((link, i) => {
            console.log(link, i);
            const edgeLength = strengths[i];
            if (edgeLength * EDGE_GROWTH_FACTOR > 500) {
              return props.dimensions.width / 2; // TOUCH OUTER RADIAL EDGE
            }
            return edgeLength * EDGE_GROWTH_FACTOR; // MOVE EDGE CLOSER TO RADIAL EDGE
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
      .scaleExtent([1, 3])
      .on("zoom", () => {
        const zoomState = zoomTransform(svg.node());
        links.attr("transform", zoomState);
        nodes.attr("transform", zoomState);
        text.attr("transform", zoomState);
      });

    svg.call(zoom);
  }, [props.data.nodes, strengths]);

  return (
    <div>
      {props.selectedPerson && (
        <FriendSlide
          friends={props.friends}
          friend={props.selectedPerson}
          rootUserId={props.rootId}
          deleteHandler={props.deleteFriend}
          updateConnection={updateConnection}
        />
      )}
      <div className="svg-container">
        <svg className="graph" ref={networkGraph}></svg>
      </div>
    </div>
  );
}
