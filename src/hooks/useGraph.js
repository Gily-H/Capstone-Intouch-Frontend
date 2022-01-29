import { useState } from "react";

export default function useGraph() {
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });

  function addData(data) {
    setGraphData((prevGraphData) => ({
      nodes: [...prevGraphData.nodes, ...data.nodes],
      links: [...prevGraphData.links, ...data.links],
    }));
  }

  return [graphData, addData];
}
