import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./components/d3/Graph";
import AddNode from "./components/AddNode";
import FriendSlide from "./components/FriendSlide";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./styles/App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/SignUp"
import Navbar from "./components/Navbar";



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

  const [selectedPerson, setselectedPerson] = useState("");

  /* data fetching  */

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

    const rootData = rootUser.data;
    const rootId = rootData.id - 1; // should be 0

    // create node for root user
    const rootNode = {
      id: rootId,
      index: rootId,
      firstName: rootData.firstName,
      lastName: rootData.lastName,
      phone: rootData.phone,
      imageUrl: rootData.imageUrl,
      updatedAt: rootData.updatedAt,
    };

    // create nodes for all friends
    const friendIds = friends.data.map((friend) => ({
      id: friend.id,
      index: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      phone: friend.phone,
      imageUrl: friend.imageUrl,
      interactions: friend.interactions,
      updatedAt: friend.updatedAt,
    }));

    const friendLinks = friends.data.map((friend) => ({
      source: 0, // root should always be in the first position
      target: friend.id,
    }));

    setGraphData({
      nodes: [rootNode, ...friendIds], // keep the root user in the first position
      links: [...friendLinks],
    });

    setLoading(false);
  }

  useEffect(() => fetchPeopleData(), []);

  /* handlers */

  function addGraphData(data) {
    console.log(data);
    setGraphData((prevGraphData) => ({
      nodes: [...prevGraphData.nodes, data.node],
      links: [...prevGraphData.links, data.link],
    }));
  }

  function retrieveselectedPerson(selected) {
    console.log("this is the selected user");
    console.log(selected);
    setselectedPerson(selected);
  }

  /* display section  */

  const displayGraph = isLoading ? (
    <p>Loading</p>
  ) : (
    <Graph data={graphData} retrieveHandler={retrieveselectedPerson} />
  );


  return (
    <Router>
      <Routes>
        <Route path="/userGraph" element={
          <div className="total-App">
            <div className="App">
              <div className="friend-slide">
                {selectedPerson ? <FriendSlide firstName={selectedPerson.firstName}
                  lastName={selectedPerson.lastName}
                  imageUrl={selectedPerson.imageUrl}
                  phone={selectedPerson.phone}
                  updatedAt={selectedPerson.updatedAt} /> : <></>}
              </div>

              <div className="graph">
                <AddNode addData={addGraphData} />
                {displayGraph}
              </div>
            </div>
          </div>
        } />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </Router>
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
