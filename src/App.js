import React, { useEffect, useState } from "react";
import { useGraph, usePeople } from "./hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Graph from "./components/d3/Graph";
import { LandingPage, HomePage, SignUp, Login, ProfilePage, About } from "./components/pages";
import { Navbar } from "./components";
import { rootUser } from "./data";
import { createNodeLinks, createNodesData, createRootData } from "./graphUtils";
import "./styles/App.css";

function App() {
  const CANVAS_DIMENSIONS = {
    width: 1000,
    height: 1000,
  };
  const [isLoading, setLoading] = useState(true);
  const [peopleData, setPeopleData] = usePeople(rootUser.id);
  const [graphData, setGraphData] = useGraph();
  const [selectedPerson, setSelectedPerson] = useState("");
  const [user, setUser] = useState(null);

  /* user login */
  //  useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://crud-intouch-backend.herokuapp.com/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         console.log(resObject);
  //         setCurrentUserId(resObject.id);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   getUser();
  // }, []);

  /* data fetching  */

  async function fetchPeopleData() {
    const friends = await axios.get("https://crud-intouch-backend.herokuapp.com/api/friends/");
    setPeopleData(friends.data);
    const rootNode = createRootData(rootUser, CANVAS_DIMENSIONS);
    const friendIds = createNodesData(friends.data, rootUser.id);
    const friendLinks = createNodeLinks(friends.data, rootUser.id);
    setGraphData({
      nodes: [rootNode, ...friendIds], // keep the root user in the first position
      links: [...friendLinks],
    });
    setLoading(false);
  }
  useEffect(() => fetchPeopleData(), []);

  /* display section  */

  const displayGraph = isLoading ? (
    <p>Loading</p>
  ) : (
    <Graph
      data={graphData}
      friends={peopleData.nonRoot}
      retrieveHandler={retrieveSelectedPerson}
      dimensions={CANVAS_DIMENSIONS}
      selectedPerson={selectedPerson}
      rootUserId={rootUser.id}
      deleteFriend={deleteFriend}
    />
  );

  /* state handlers */

  // function addGraphData(data) {
  //   setGraphData(data);
  // }

  function retrieveSelectedPerson(selected) {
    setSelectedPerson(selected);
  }

  function deleteFriend(removeId) {
    if (removeId !== rootUser.id) {
      const updatedFriends = peopleData.nonRoot.filter((friend) => friend.friend_id !== removeId);
      const updatedGraphData = {
        nodes: graphData.nodes.filter((node) => node.id !== removeId),
        links: graphData.links.filter((link) => link.target.id !== removeId),
      };

      setPeopleData(updatedFriends);
      setGraphData((prevGraphData) => updatedGraphData);
      selectedPerson && setSelectedPerson((prevSelectedPerson) => "");
    }
  }

  function setUserData(data) {
    setUser(data);
  }

  return (
    <Router>
      <Routes>
        <Route to="/" element={<Navbar user={user} />}>
          <Route path="landing" element={<LandingPage user={user} />} />
          <Route path="home" element={<HomePage user={user} />} />
          <Route path="login" element={<Login userData={setUserData} />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="profile/:id" element={<ProfilePage {...peopleData} user={user} />} />
          <Route path="about" element={<About />} />
          <Route index element={<LandingPage user={user} />} />
        </Route>

        {/* <Route path="/profile" element={<Login userData={setUserData}/>}/> */}

        {/* graph has no navbar */}
        <Route path="/userGraph" element={<div className="App">{displayGraph}</div>} />
      </Routes>
    </Router>
  );
}

export default App;
