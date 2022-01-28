import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./components/d3/Graph";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import AddFriendNode from "./components/AddFriendNode";
import { rootUser, friends } from "./data";

function App() {
  const CANVAS_DIMENSIONS = {
    width: 1000,
    height: 1000,
  };
  const [isLoading, setLoading] = useState(true);
  const [peopleData, setPeopleData] = useState({
    root: {}, // Will use google id
    friends: [],
  });
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [selectedPerson, setselectedPerson] = useState("");

  /* data fetching  */

  async function fetchPeopleData() {
    /* MISSING FETCH REQUESTS */

    const rootNode = {
      id: rootUser.id,
      firstName: rootUser.firstName,
      lastName: rootUser.lastName,
      imageUrl: rootUser.imageUrl,
      // password: userData.password ||
      /* additional required fields for fixed position */
      fx: CANVAS_DIMENSIONS.width / 2,
      fy: CANVAS_DIMENSIONS.height / 2,
    };

    // create nodes for all friends
    const friendIds = friends.data.map((friend) => ({
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      phone: friend.phone,
      imageUrl: friend.imageUrl,
      strength: friend.strength,
      lastContact: friend.lastContact,
      userId: rootUser.id,
    }));

    const friendLinks = friends.data.map((friend) => ({
      source: rootUser.id,
      target: friend.id,
      /* INCLUDE FIELD TO CALCULATE EDGE LENGTH */
    }));

    setGraphData({
      nodes: [rootNode, ...friendIds], // keep the root user in the first position
      links: [...friendLinks],
    });

    setLoading(false);
  }

  useEffect(() => fetchPeopleData(), []);

  /* state handlers */

  function addGraphData(data) {
    setGraphData((prevGraphData) => ({
      nodes: [...prevGraphData.nodes, data.node],
      links: [...prevGraphData.links, data.link],
    }));
  }

  function retrieveSelectedPerson(selected) {
    setselectedPerson(selected);
  }

  function deleteFriend(removeId) {
    // precaution to avoid deletion of root user
    if (removeId === rootUser.id) {
      return;
    }

    const updatedFriends = peopleData.friends.filter(
      (friend) => friend.friend_id !== removeId
    );

    const updatedGraphData = {
      nodes: graphData.nodes.filter((node) => node.id !== removeId),
      links: graphData.links.filter((link) => link.target.id !== removeId),
    };

    setPeopleData((prevPeopleData) => ({
      ...prevPeopleData,
      friends: updatedFriends,
    }));

    setGraphData((prevGraphData) => updatedGraphData);
    selectedPerson && setselectedPerson((prevSelectedPerson) => "");
  }

  /* display section  */

  const displayGraph = isLoading ? (
    <p>Loading</p>
  ) : (
    <Graph
      data={graphData}
      retrieveHandler={retrieveSelectedPerson}
      dimensions={CANVAS_DIMENSIONS}
      selectedPerson={selectedPerson}
      rootUserId={rootUser.id}
      deleteFriend={deleteFriend}
    />
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage {...peopleData} />} />
        <Route
          path="/userGraph"
          element={
            <div className="App">
              <AddFriendNode addData={addGraphData} rootUserId={rootUser.id} />
              {displayGraph}
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
