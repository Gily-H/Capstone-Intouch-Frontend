import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import "../../styles/homePage.css";
import "../../styles/landingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage(props) {
  const [open, toggle] = useState(false);
  const [hover, toggleHover] = useState(false);
  const [hover2, toggleHover2] = useState(false);
  const [hover3, toggleHover3] = useState(false);
  const navigate = useNavigate();

  const bubbEffs = useSpring({ transform: hover ? "scale(1.5)" : "scale(1.0)" });
  const centerEffs = useSpring({ transform: hover2 ? "scale(1.8)" : "scale(1.0)" });
  const rigthEffs = useSpring({ transform: hover3 ? "scale(1.5)" : "scale(1.0)" });
  // const borderEffs = useSpring( {loop: {reverse: true},from: {borderColor: "blue"}, to: {borderColor: "white"}})

  return (
    <animated.div id="home">
      <div className="landing">
        <div className="landing-text">
          <h1>In-Touch</h1>
          <h2>
            Developed by a group of four exceptional students attending Brooklyn College, In-Touch is an excercise in
            interconnectivity. Designed from the ground up, to visualize our interactions with those close to us.
          </h2>
        </div>

        <animated.div className="landing-bubbles">
          <animated.div
            style={centerEffs}
            onClick={() => toggle(!open)}
            onMouseOver={() => toggleHover2(!hover2)}
            onMouseOut={() => toggleHover2(!hover2)}
            className="center-bubb">
            <h3>In-Touch</h3>
          </animated.div>

          <animated.div className="bottom">
            <animated.div
              style={bubbEffs}
              onClick={() => navigate("/userGraph")}
              onMouseOver={() => toggleHover(!hover)}
              onMouseOut={() => toggleHover(!hover)}
              className="bottom-bubbs"
              id="left-bubb">
              <h3>Connects</h3>
            </animated.div>

            <animated.div
              style={rigthEffs}
              onClick={() => (props.user ? navigate(`/profile/${props.user.id}`) : navigate("login"))}
              onMouseOver={() => toggleHover3(!hover3)}
              onMouseOut={() => toggleHover3(!hover3)}
              className="bottom-bubbs"
              id="right-bubb">
              <h3>Add Friends</h3>
            </animated.div>
          </animated.div>
        </animated.div>

        <animated.div onClick={() => navigate("/about")} className="about-bubb">
          <h2>To learn more about the team and the project, head over to our about page by pressing this bubble</h2>
        </animated.div>
      </div>
    </animated.div>
  );
}
