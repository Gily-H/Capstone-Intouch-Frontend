import React, { useState } from "react"
import { animated, useSpring, config } from "react-spring"
import Navbar from "./Navbar"
import NewBlackCircle from "../images/NewBlackCircle.png"
import "../styles/homePage.css"
import blueCircle from "../images/blueCircle.png"
import "../styles/homePage.css"
import { Link } from "react-router-dom"
import Bubbles from "./Bubbles"
import { useEffect } from "react/cjs/react.development"


export default function LandingPage() {
    const [open, toggle] = useState(false)
    const effs = useSpring({ from: { transform: "translateY(200%)" }, to: { transform: open ? "translateY(0%)" : "translateY(200%)", opacity: open ? 1 : 0 } , config: config.wobbly})
    const leftEffs = useSpring({ from: { transform: "translate(100%,-90%)" }, to: { transform: open ? "translate(0%,0%)" : "translate(100%,-90%)", opacity: open ? 1 : 0 } , config: config.wobbly})
    const rightEffs = useSpring({ from: { transform: "translate(-100%,-90%)"}, to: { transform: open ? "translate(0%,0%)" : "translate(-100%,-90%)", opacity: open ? 1 : 0 }, config: config.wobbly})
    const barEffs = useSpring({from: {transform: "translateY(0%)",opacity: open? 0:1}, to: {transform: "translateY(-300%)",opacity: open? 0:1},loop: true,config: config.gentle})
    const centerEffs = useSpring({from: {opacity: open? 1 : 0.4}, to: {opacity: open? 0.4 : 1}})

    return (
        <div id="home">
            <Navbar />
            <animated.div style={effs} className="top-bubble">
                <Link to="/userGraph"><Bubbles image={blueCircle} label={"Connects"} startOp={.8} /></Link>
            </animated.div>
            <animated.div style = {centerEffs} className="center-bubble" onMouseDown={() => toggle(!open)}>
                <Bubbles label={"In-Touch"} image={NewBlackCircle} startOp={1} />
            </animated.div>
            <animated.div style={barEffs}>
                {/* <div id="bubble-bar"></div> */}
            </animated.div>
            <div className="bottom-bubbles">
                <animated.div style={leftEffs} id="left-btm-bubble">
                <Link to="/profile"><Bubbles image={NewBlackCircle} label={"Add Friends"} startOp={.8} /></Link>
                </animated.div>
                <animated.div style={rightEffs}>
                    <Bubbles label={"About-Us"} image={NewBlackCircle} startOp={.8} />
                </animated.div>
            </div>
        </div>
    )
}