import React, { useState } from "react"
import { animated, useSpring } from "react-spring"
import Navbar from "./Navbar"
import NewBlackCircle from "../images/NewBlackCircle.png"
import "../styles/homePage.css"
import blueCircle from "../images/blueCircle.png"
import "../styles/homePage.css"
import { Link } from "react-router-dom"
import Bubbles from "./Bubbles"


export default function LandingPage() {
    const [open, toggle] = useState(false)
    const effs = useSpring({ from: { transform: "translateY(200%)" }, to: { transform: open ? "translateY(0%)" : "translateY(200%)", opacity: open ? 1 : 0 } })
    const leftEffs = useSpring({ from: { transform: "translate(100%,-90%)" }, to: { transform: open ? "translate(0%,0%)" : "translate(100%,-90%)", opacity: open ? 1 : 0 } })
    const rightEffs = useSpring({ from: { transform: "translate(-100%,-90%)" }, to: { transform: open ? "translate(0%,0%)" : "translate(-100%,-90%)", opacity: open ? 1 : 0 } })
    const centerEffs = useSpring({ from: { opacity: 1 }, to: { opacity: open ? .3 : 1 } })

    return (
        <div id="home">
            <Navbar />
            <animated.div style={effs} className="top-bubble">
                <Link to="/userGraph"><Bubbles image={blueCircle} label={"Connects"} startOp={.2} /></Link>
            </animated.div>
            <animated.div className="center-bubble" onMouseDown={() => toggle(!open)}>
                <Bubbles label={"In-Touch"} image={NewBlackCircle} startOp={1} />
            </animated.div>
            <div className="bottom-bubbles">
                <animated.div style={leftEffs} id="left-btm-bubble">
                <Link to="/profile"> <Bubbles image={NewBlackCircle} label={"Add Friends"} startOp={.2} /></Link>
                </animated.div>
                <animated.div style={rightEffs}>
                <Link to="/about">
                    <Bubbles label={"About-Us"} image={NewBlackCircle} startOp={.2} />
                </Link>
                </animated.div>
            </div>
        </div>
    )
}