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
    width: 1500,
    height: 1500,
  };
  const [isLoading, setLoading] = useState(true);
  const [peopleData, setPeopleData, setPeopleDataRelations, updatePeopleDataRelations] = usePeople();
  const [graphData, addGraphData, addSingleGraphData] = useGraph();
  const [strengths, setStrengths] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [user, setUser] = useState(null);
  const [addNewData, setAddNewData] = useState(false);

  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  axios.defaults.withCredentials = true; /* cookie sessions */

  useEffect(() => {
    axios
      .get("https://crud-intouch-backend.herokuapp.com/auth/login/success")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log("catch block", err));
  }, []);

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
    // const friends = await axios.get("https://crud-intouch-backend.herokuapp.com/api/friends/");
    // const rootUser = await axios.get(`http://localhost:5000/api/users/${1}`);
    if (user) {
      const friends = await axios.get(`https://crud-intouch-backend.herokuapp.com/api/friends/user/${user.id}`);
      // const userData = rootUser.data;
      const friendsData = friends.data;
      setPeopleData({
        user: user, // userData,
        friends: friendsData,
      });
      // setUser(userData); // set user as person retrieved from database FOR TESTING
      setStrengths([...friendsData.map((friend) => friend.strength)]);
      const rootNode = createRootData(user /* userData */, CANVAS_DIMENSIONS);
      const friendIds = createNodesData(friendsData, user.id /* userData.id */);
      const friendLinks = createNodeLinks(friendsData, user.id /* userData.id */);
      addGraphData({
        nodes: [rootNode, ...friendIds], // keep the root user in the first position
        links: [...friendLinks],
      });
      setLoading(false);
    }
  }
  useEffect(() => fetchPeopleData(), [user, addNewData]);

  /* =========================== state handlers =============================== */

  function addRelationHandler(relationData, nodeData) {
    /* Come back to this and review */
    console.log(relationData);
    console.log(nodeData);
    setPeopleDataRelations(relationData);
    addSingleGraphData({
      nodes: nodeData, // needs to have id key field (NOT friendId)
      links: { source: relationData.userId, target: relationData.friendId },
    });
    setAddNewData((prevAddNewData) => !prevAddNewData);
    setSelectedPerson(relationData);
  }

  function retrieveSelectedPerson(selected) {
    setSelectedPerson(selected);
  }

  function updateConnectionStrength(friendId, factor) {
    // maybe use index instead of friendId
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

    console.log(updatedFriends);
    const updatedStrengths = updatedFriends.map((friend) => friend.strength);
    console.log(updatedStrengths);

    axios
      .patch(`https://crud-intouch-backend.herokuapp.com/api/friends/${friendId}`, updatedFriend)
      .then((res) => {
        updatePeopleDataRelations(updatedFriends);
        setStrengths(updatedStrengths);
      })
      .catch((err) => console.log(err));
  }

  function deleteFriend(removeId) {
    if (removeId !== peopleData.root.id) {
      axios
        .delete(`https://crud-intouch-backend.herokuapp.com/api/friends/${removeId}`)
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

  function createMessage(phone, message) {
    console.log(phone, message);
    axios
      .get(`https://crud-intouch-backend.herokuapp.com/sms/send?recipient=${phone}&message=${message}`)
      .then((res) => {
        console.log(res);
        console.log("Sent the request");
      })
      .catch((err) => console.log(err));
  }

  function openMessageBox() {
    setIsMessageBoxOpen(true);
  }

  function closeMessageBox() {
    setIsMessageBoxOpen(false);
  }

  /* display Graph  */
  const displayGraph = isLoading ? (
    <p>Loading</p>
  ) : (
    <Graph
      user={user}
      data={graphData}
      strengthData={strengths}
      friends={peopleData.relations}
      retrieveHandler={retrieveSelectedPerson}
      dimensions={CANVAS_DIMENSIONS}
      selectedPerson={selectedPerson}
      rootUserId={user.id}
      deleteFriend={deleteFriend}
      connectionStrengthHandler={updateConnectionStrength}
      isMessage={isMessageBoxOpen}
      messageHandler={createMessage}
      openMessageBoxHandler={openMessageBox}
      closeMessageBoxHandler={closeMessageBox}
    />
  );

  return (
    <Router>
      <Routes>
        <Route to="/" element={<Navbar user={user} handleUser={setUserData} />}>
          <Route path="landing" element={<LandingPage user={user} />} />
          {/* <Route path="home" element={<HomePage user={user} />} /> */}
          <Route path="login" element={<Login userData={setUserData} />} />
          <Route path="signUp" element={<SignUp userData={setUserData} />} />
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
