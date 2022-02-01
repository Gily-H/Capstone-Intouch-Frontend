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
    const navigate = useNavigate()

    return (
        <div id="home">
            <Navbar user={props.user} />
            <div className="landing">
                <div className="landing-text">
                    <h1>In-Touch</h1>
                    <h2>Developed by a group of four exceptional students attending Brooklyn College, In-Touch is an excercise in interconnectivity.
                        Designed from the ground up, to visualize our interactions with those close to us.</h2>
                </div>
                <div className="landing-bubbles">
                    <animated.div className="center-bubb"><h3>In-Touch</h3></animated.div>
                   
                    <animated.div className="bottom">
                        <animated.div onClick={() => navigate("/userGraph")} className="bottom-bubbs" id="left-bubb"><h3>Connects</h3></animated.div>
                        <animated.div  onClick={() => props.user? navigate("/profile"): navigate("login")} className="bottom-bubbs" id="right-bubb"><h3>Add Friends</h3></animated.div>

                    </animated.div>

                </div>
            </div>
        </div>
    )
}