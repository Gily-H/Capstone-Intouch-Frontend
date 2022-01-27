import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./components/d3/Graph";
import AddFriendNode from "./components/AddFriendNode";
import FriendSlide from "./components/FriendSlide";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";

import ProfilePage from "./components/ProfilePage";
import Prince from "./images/prince-akachi.jpg";

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

  // const [currentUser, setCurrentUser] = useState({
  //   id: "",
  //   name: "",
  //   image: "",
  // });

  const [currentUserId, setCurrentUserId] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [selectedPerson, setselectedPerson] = useState("");

  /* user login */
  useEffect(() => {
    const getUser = async () => {
      const resObject = await axios
        .get("http://crud-intouch-backend.herokuapp.com/auth/login/success")
        .then((res) => {
          console.log("fetching");
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      // setCurrentUser(resObject);
    };

    // if (successfulLogin) {
    getUser();
    // }
  }, []);

  /* data fetching  */

  // async function fetchPeopleData() {
  //   const friends = await axios.get(
  //     "https://crud-intouch-backend.herokuapp.com/api/friends/"
  //   );

  //   setFriendsData({
  //     friends: friends.data,
  //   });

  //   const userData = rootUser.data;
  //   const userId = userData.googleId || userData.id; // if no google, backend creates id
  //   setCurrentUserId(userId);

  //   const rootNode = {
  //     id: userId,
  //     // index: 0,
  //     firstName: userData.firstName,
  //     lastName: userData.lastName,
  //     imageUrl: userData.imageUrl,
  //     // password: userData.password ||
  //     /* additional required fields for fixed position */
  //     fx: CANVAS_DIMENSIONS.width / 2,
  //     fy: CANVAS_DIMENSIONS.height / 2,
  //   };

  //   // create nodes for all friends
  //   const friendIds = friends.data.map((friend) => ({
  //     id: friend.friend_id,
  //     index: friend.friend_id,
  //     firstName: friend.firstName,
  //     lastName: friend.lastName,
  //     phone: friend.phone,
  //     imageUrl: friend.imageUrl,
  //     strength: friend.strength,
  //     lastContact: friend.lastContact,
  //     userId: userId,
  //   }));

  //   const friendLinks = friends.data.map((friend) => ({
  //     source: userId,
  //     target: friend.friend_id,
  //     /* INCLUDE FIELD TO CALCULATE EDGE LENGTH */
  //   }));

  //   setGraphData({
  //     nodes: [rootNode, ...friendIds], // keep the root user in the first position
  //     links: [...friendLinks],
  //   });

  //   setLoading(false);
  // }

  // useEffect(() => fetchPeopleData(), [currentUserId]);

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
    if (removeId === currentUserId) {
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
    />
  );
  const testImages = {
    image1: Prince,
  };

  const displayFriendPanel = (
    <FriendSlide
      friend={selectedPerson}
      rootUserId={currentUserId}
      image={testImages.image1} //image prop for testing
      /* friendsData.root.id - 1 */ deleteHandler={deleteFriend}
    />
  );

  function handleSuccesfulLogin() {
    setSuccessfulLogin(true);
  }

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
              <AddFriendNode addData={addGraphData} userId={currentUserId} />
              {displayGraph}
              {selectedPerson && displayFriendPanel}
              {displayFriendPanel}
            </div>
          }
        />
        <Route
          path="/login"
          element={<Login handleSuccessfulLogin={handleSuccesfulLogin} />}
        />
        <Route
          path="/signUp"
          element={<Signup handleSuccessfulLogin={handleSuccesfulLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

/* 
    BAREBONES SAMPLE DATA
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
