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
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";

function App() {



  const CANVAS_DIMENSIONS = {
    width: 1000,
    height: 1000,
  };

  const [isLoading, setLoading] = useState(true);
  const [peopleData, setPeopleData] = useState({
    root: {}, // Will use google idea
    friends: [],
  });
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [selectedPerson, setselectedPerson] = useState("");

  /* data fetching  */

  async function fetchPeopleData() {
    const rootUser = await axios.get(
      "https://crud-intouch-backend.herokuapp.com/api/users/ "
    );

   
    const friends = await axios.get(
      "https://crud-intouch-backend.herokuapp.com/api/friends/"
    );
    console.log(friends);

    setPeopleData({
      root: rootUser.data,
      friends: friends.data,
    });

    const rootData = rootUser.data;

    /* FIND BETTER WAY TO CREATE ID -> BAD TO KEEP SUBTRACTING BY 1 EVERYWHERE */
    const rootId = rootData.id - 1; /* should be 0 in this case */

    // create node for root user
    const rootNode = {
      id: rootId,
      index: rootId,
      firstName: rootData.firstName,
      lastName: rootData.lastName,
      phone: rootData.phone,
      imageUrl: rootData.imageUrl,
      /* additional required fields */
      fx: CANVAS_DIMENSIONS.width / 2, // fixed-x position on canvas
      fy: CANVAS_DIMENSIONS.height / 2, // fixed-y position on canvas
    };

    // create nodes for all friends
    const friendIds = friends.data.map((friend) => ({
      id: friend.friend_id,
      index: friend.friend_id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      phone: friend.phone,
      imageUrl: friend.imageUrl,
      interactions: friend.interactions,
      strength: 100 /* DEFAULT FOR NOW */,
      /* ADDITIONAL FIELD FOR TESTING PURPOSES ONLY */
      days: Math.ceil(Math.random() * 40),
    }));

    const friendLinks = friends.data.map((friend) => ({
      source:
        rootId /* root should always be in the first position - See Line #44 */,
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
    if (removeId === 0 /* peopleData.root.id - 1 */) {
      return;
    }
    

    const updatedFriends = peopleData.friends.filter(
      (friend) => friend.id !== removeId
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

  const displayFriendPanel = (
    <FriendSlide
      friend={selectedPerson}
      rootUserId={0}
      /* peopleData.root.id - 1 */ deleteHandler={deleteFriend}
    />
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage {...peopleData}/>} />
        <Route
          path="/userGraph"
          element={
            <div className="App">
              <AddFriendNode addData={addGraphData} />
              {displayGraph}
              {selectedPerson && displayFriendPanel}
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
