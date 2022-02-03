import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { zoomTransform } from "d3-zoom";
import { createNodes, createLinks, createNodeText, onTick } from "./graphFuncs";
import { FriendSlide } from "..";
import "../../styles/Graph.css";

export default function Graph(props) {
  const EDGE_GROWTH_FACTOR = 5;
  const networkGraph = useRef();

  // console.log(props.strengthData);
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
      .force("collide", d3.forceCollide(80)) // prevent node overlap
      // force exerted from center point - evenly spreads distance between nodes
      .force("center", d3.forceCenter(props.dimensions.width / 2, props.dimensions.height / 2).strength(1))
      .force(
        "links",
        d3
          .forceLink(props.data.links)
          .id((datum) => datum.id)
          .distance((link, i) => {
            // console.log(link.target);
            const edgeLength = props.strengthData[i];
            if (edgeLength <= 0) {
              return 1; // prevent node from moving past central node
            } else if (edgeLength * EDGE_GROWTH_FACTOR > 500) {
              return 500; // limit how far node can move
            } else {
              return edgeLength * EDGE_GROWTH_FACTOR;
            }
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
      .scaleExtent([0.8, 2.5])
      .on("zoom", () => {
        const zoomState = zoomTransform(svg.node());
        links.attr("transform", zoomState);
        nodes.attr("transform", zoomState);
        text.attr("transform", zoomState);
      });

    svg.call(zoom);
  }, [props.data.nodes, props.data.relations, props.strengthData, props.user, props.data]);

  return (
    <div className="svg-container">
      {props.selectedPerson && (
        <FriendSlide
          friend={props.selectedPerson}
          rootUserId={props.rootUserId}
          deleteHandler={props.deleteFriend}
          updateStrengthConnection={props.connectionStrengthHandler}
          isMessage={props.isMessage}
          messageHandler={props.messageHandler}
          openMessageBoxHandler={props.openMessageBoxHandler}
          closeMessageBoxHandler={props.closeMessageBoxHandler}
        />
      )}
      <svg className="graph" ref={networkGraph}></svg>
    </div>
  );
}
