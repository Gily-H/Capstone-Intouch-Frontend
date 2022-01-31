import React, { useEffect, useState } from "react";
import { useGraph, usePeople } from "./hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Graph from "./components/d3/Graph";
import { LandingPage, HomePage, SignUp, Login, ProfilePage, About } from "./components/pages";
import { Navbar } from "./components";
// import { rootUser } from "./data";
import { createNodeLinks, createNodesData, createRootData } from "./graphUtils";
import "./styles/App.css";

function App() {
  const CANVAS_DIMENSIONS = {
    width: 1000,
    height: 1000,
  };
  const [isLoading, setLoading] = useState(true);
  const [peopleData, setPeopleData, setPeopleDataRelations] = usePeople();
  const [graphData, addGraphData, addSingleGraphData] = useGraph();
  const [strengths, setStrengths] = useState([]);
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
    console.log("I am in the app component");
    // const friends = await axios.get("https://crud-intouch-backend.herokuapp.com/api/friends/");
    const rootUser = await axios.get(`http://localhost:5000/api/users/${1}`);
    const friends = await axios.get("http://localhost:5000/api/friends");
    const userData = rootUser.data;
    const friendsData = friends.data;
    setPeopleData({
      user: userData,
      friends: friendsData,
    });
    setUser(userData); // set user as person retrieved from database FOR TESTING
    setStrengths([...friendsData.map((friend) => friend.strength)]);
    const rootNode = createRootData(userData, CANVAS_DIMENSIONS);
    const friendIds = createNodesData(friendsData, userData.id);
    const friendLinks = createNodeLinks(friendsData, userData.id);
    addGraphData({
      nodes: [rootNode, ...friendIds], // keep the root user in the first position
      links: [...friendLinks],
    });
    setLoading(false);
  }
  useEffect(() => fetchPeopleData(), []);

  /* =========================== state handlers =============================== */

  // updates local state, no need to refresh profile page to see changes
  function addRelationHandler(relationData, nodeData) {
    /* Come back to this and review */
    setPeopleDataRelations([...peopleData.relations, relationData]);
    addSingleGraphData({
      nodes: nodeData, // needs to have id key field (NOT friendId)
      links: { source: relationData.userId, target: relationData.friendId },
    });
    setSelectedPerson(relationData);
  }

  function retrieveSelectedPerson(selected) {
    setSelectedPerson(selected);
  }

  function updateConnectionStrength(friendId, factor) { // maybe use index instead of friendId
    const updatedFriend = peopleData.relations.find((friend) => friend.friendId === friendId);
    const newStrength = updatedFriend.strength - factor;
    if (newStrength >= 100) {
      updatedFriend.strength = 100;
    } else if (newStrength <= 0) {
      updatedFriend.strength = 1;
    } else {
      updatedFriend.strength = newStrength;
    }

    const updatedFriends = peopleData.relations.map((friend) =>
      friendId === friend.friendId ? updatedFriend : friend
    );
    const updatedStrengths = updatedFriends.map((friend) => friend.strength);

    axios
      .patch(`http://localhost:5000/api/friends/${friendId}`, updatedFriend)
      .then((res) => {
        setPeopleDataRelations(updatedFriends);
        setStrengths(updatedStrengths);
      })
      .catch((err) => console.log(err));
  }

  function deleteFriend(removeId) {
    if (removeId !== peopleData.root.id) {
      axios
        .delete(`http://localhost:5000/api/friends/${removeId}`)
        .then((res) => {
          const updatedFriends = peopleData.relations.filter((friend) => friend.friendId !== removeId);
          const updatedGraphData = {
            nodes: graphData.nodes.filter((node) => node.id !== removeId),
            links: graphData.links.filter((link) => link.target.id !== removeId),
          };

          setPeopleDataRelations(updatedFriends);
          addGraphData(updatedGraphData);
          selectedPerson && setSelectedPerson((prevSelectedPerson) => "");
        })
        .catch((err) => console.log(err));
    }
  }

  function setUserData(data) {
    setUser(data);
  }

  /* display Graph  */
  const displayGraph = isLoading ? (
    <p>Loading</p>
  ) : (
    <Graph
      data={graphData}
      strengthData={strengths}
      friends={peopleData.relations}
      retrieveHandler={retrieveSelectedPerson}
      dimensions={CANVAS_DIMENSIONS}
      selectedPerson={selectedPerson}
      rootUserId={user.id}
      deleteFriend={deleteFriend}
      connectionStrengthHandler={updateConnectionStrength}
    />
  );

  return (
    <Router>
      <Routes>
        <Route to="/" element={<Navbar user={user} />}>
          <Route path="landing" element={<LandingPage user={user} />} />
          <Route path="home" element={<HomePage user={user} />} />
          <Route path="login" element={<Login userData={setUserData} />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="profile/:id"
            element={<ProfilePage friends={peopleData.relations} user={user} addRelationHandler={addRelationHandler} />}
          />
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
