import React, { useState } from "react";
import { Link } from "react-router-dom";

import Bubbles from "../Bubbles";
import NewBlackCircle from "../../images/NewBlackCircle.png";
import blueCircle from "../../images/blueCircle.png";
import "../../styles/homePage.css";

export default function HomePage(props) {
  // useEffect(() => {
  //     async function getSomething(){
  //         await axios.get("https://crud-intouch-backend.herokuapp.com/customAuth/me")
  //         .then(res => {
  //           console.log(res)
  //           setUser(res.data)
  //         })
  //         .catch(err => console.log(err))
  //     }
  //     getSomething()
  // })
  // console.log(props.user ? props.user : "");
  // console.log(props.user);

  return (
    <div id="home">
      <div className="top-bubble">
        <Link to="/userGraph">
          <Bubbles image={blueCircle} label={"Connects"} startOp={0.5} />
        </Link>
      </div>
      <div className="center-bubble">
        <Bubbles label={"In-Touch"} image={NewBlackCircle} startOp={1} />
      </div>
      <div className="bottom-bubbles">
        <div id="left-btm-bubble">
          <Link to={props.user ? `/profile/${props.user.id}` : "/login"}>
            <Bubbles image={NewBlackCircle} label={"Add Friends"} startOp={0.5} />
          </Link>
        </div>
        <Bubbles label={"About-Us"} image={NewBlackCircle} startOp={0.5} />
      </div>
    </div>
  );
}
