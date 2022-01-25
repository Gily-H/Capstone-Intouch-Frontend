import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./components/d3/Graph";
import AddNode from "./components/AddNode";
import "./styles/App.css";

function App() {
  const [peopleData, setPeopleData] = useState({
    root: {},
    friends: [],
  });
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [isLoading, setLoading] = useState(true);

  async function fetchPeopleData() {
    const rootUser = await axios.get(
      "https://crud-intouch-backend.herokuapp.com/api/roots/1"
    );

    const friends = await axios.get(
      "https://crud-intouch-backend.herokuapp.com/api/friends/"
    );

    setPeopleData({
      root: rootUser.data,
      friends: friends.data,
    });

    const rootId = rootUser.data.id - 1; // should be 0
    const rootNode = { id: rootId, index: rootId }; // create node object
    const friendIds = friends.data.map((friend) => ({
      id: friend.id,
      index: friend.id,
    }));
    const friendLinks = friends.data.map((friend) => ({
      source: 0, // root should always be in the first position
      target: friend.id,
    }));

    console.log("inside");
    console.log(rootNode);
    console.log(friendIds);
    console.log(friendLinks);

    setGraphData({
      nodes: [rootNode, ...friendIds], // keep the root user in the first position
      links: [...friendLinks],
    });

    setLoading(false);
  }

  useEffect(() => fetchPeopleData(), []);

  console.log("outside");
  console.log(isLoading);
  console.log(peopleData);
  console.log(graphData);

  function addGraphData(data) {
    setGraphData((prevGraphData) => ({
      nodes: [...prevGraphData.nodes, data.node],
      links: [...prevGraphData.links, data.link],
    }));
  }

  const display = isLoading ? <p>Loading</p> : <Graph data={graphData} />;

  return (
    <div className="App">
      <AddNode addData={addGraphData} />
      {display}
    </div>
  );
}

export default App;

/* 
{
    // nodes can be anything
    nodes: [
      { id: 0, index: 0 },
      // { id: 1 },
      // { id: 2 },
      // { id: 3 },
      // { id: 4 },
      // { id: 5 },
      // { id: 6 },
      // { id: 7 },
      // { id: 8 },
      // { id: 9 },
      // { id: 10 },
    ],

    // links refer to INDEX of nodes by default
    // id(d > d.property) to change id property
    links: [
      // { source: 0, target: 1 },
      // { source: 0, target: 2 },
      // { source: 0, target: 3 },
      // { source: 0, target: 4 },
      // { source: 0, target: 5 },
      // { source: 0, target: 6 },
      // { source: 0, target: 7 },
      // { source: 0, target: 8 },
      // { source: 0, target: 9 },
      // { source: 0, target: 10 },
    ],
  }
*/
