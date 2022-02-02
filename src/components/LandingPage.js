import React, { useState } from "react"
import { animated, useSpring, config } from "react-spring"
import Navbar from "./Navbar"
import NewBlackCircle from "../images/NewBlackCircle.png"
import "../styles/homePage.css"
import blueCircle from "../images/blueCircle.png"
import "../styles/landingPage.css"
import { Link, useNavigate } from "react-router-dom"
import Bubbles from "./Bubbles"
import { useEffect } from "react/cjs/react.development"


export default function LandingPage(props) {
    const [open, toggle] = useState(false)
    const [hover, toggleHover] = useState(false)
    const [hover2, toggleHover2] = useState(false)
    const [hover3, toggleHover3] = useState(false)
    const navigate = useNavigate()
    const bubbEffs = useSpring({transform: hover? "scale(1.8)": "scale(1.0)"})
    const centerEffs = useSpring({transform: hover2? "scale(1.8)": "scale(1.0)"})
    const rigthEffs = useSpring({transform: hover3? "scale(1.8)": "scale(1.0)"})

    return (
        <animated.div id="home">
            <Navbar user={props.user} />
            <div className="landing">
                <div className="landing-text">
                    <h1>In-Touch</h1>
                    <h2>Developed by a group of four exceptional students attending Brooklyn College, In-Touch is an excercise in interconnectivity.
                        Designed from the ground up, to visualize our interactions with those close to us.</h2>
                </div>
                <div className="landing-bubbles">
                    <animated.div 
                    style={centerEffs}
                    onClick={() => toggle(!open)}
                    onMouseOver={() => toggleHover2(!hover2)} 
                    onMouseOut={() => toggleHover2(!hover2)}
                    className="center-bubb"><h3>In-Touch</h3></animated.div>
                   
                    <animated.div className="bottom">
                        <animated.div style={bubbEffs} onClick={() => navigate("/userGraph")}  
                        onMouseOver={() => toggleHover(!hover)} 
                        onMouseOut={() => toggleHover(!hover)}
                        className="bottom-bubbs" id="left-bubb"><h3>Connects</h3></animated.div>

                        <animated.div
                        style={rigthEffs}  
                        onClick={() => props.user? navigate("/profile"): navigate("login")}
                        onMouseOver={() => toggleHover3(!hover3)} 
                        onMouseOut={() => toggleHover3(!hover3)}
                        className="bottom-bubbs" id="right-bubb"><h3>Add Friends</h3></animated.div>

                    </animated.div>
                </div>
            </div>
        </animated.div>
    )
}