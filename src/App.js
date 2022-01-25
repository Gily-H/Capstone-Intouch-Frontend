import React, { useState } from "react";
import Graph from "./components/d3/Graph";
import AddNode from "./components/AddNode";
import "./App.css";

function App() {
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
    ],
    links: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 0, target: 5 },
      { source: 0, target: 6 },
      { source: 0, target: 7 },
      { source: 0, target: 8 },
      { source: 0, target: 9 },
      { source: 0, target: 10 },
    ],
  });

  function addGraphData(data) {
    setGraphData((prevGraphData) => ({
      nodes: [...prevGraphData.nodes, data.node],
      links: [...prevGraphData.links, data.link],
    }));
  }

  console.log(graphData);
  return (
    <div className="App">
      {/* <Network data={graphData} /> */}
      <Graph graph={graphData} />
      <AddNode addData={addGraphData} />
    </div>
  );
}

export default App;
