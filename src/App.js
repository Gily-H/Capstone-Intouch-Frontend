import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./components/d3/Graph";
import AddFriendNode from "./components/AddFriendNode";
import FriendSlide from "./components/FriendSlide";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./styles/App.css";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import Prince from "./images/prince-akachi.jpg"
import { rootUser } from "./data";

function App() {



  const CANVAS_DIMENSIONS = {
    width: 1000,
    height: 1000,
  };

  const [isLoading, setLoading] = useState(true);
  const [peopleData, setPeopleData] = useState({
    root: rootUser, // Will use google id
    friends: [],
  });
  

  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [selectedPerson, setselectedPerson] = useState("");

  

  




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
    const friends = await axios.get(
      "https://crud-intouch-backend.herokuapp.com/api/friends/"
    );

    setPeopleData((prevPeopleData) => ({
      ...prevPeopleData,
      friends: friends.data,
    }));

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
      id: friend.friendId,
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
      target: friend.friendId,
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
      friends={peopleData.friends}
      retrieveHandler={retrieveSelectedPerson}
      dimensions={CANVAS_DIMENSIONS}
      selectedPerson={selectedPerson}
      rootUserId={rootUser.id}
      deleteFriend={deleteFriend}
    />
  );
  const testImages = {
    image1: Prince
  }

  
  
  const [user, setUser] = useState(null)

  function setUserData(data){
    setUser(data)
  }

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<HomePage user={user}/>} />
        <Route path="/profile/:id" element={<ProfilePage {...peopleData} user={user}/>} />
       
        
        {/* <Route path="/profile" element={<Login userData={setUserData}/>}/> */}
        <Route
          path="/userGraph"
          element={
            <div className="App">
              {displayGraph}
            </div>
          }
        />
        <Route path="/login" element={<Login userData={setUserData}/>} />
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
