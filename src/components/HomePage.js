import React from "react"
import { animated, useSpring } from "react-spring"
import Navbar from "./Navbar"
import Bubbles from "./Bubbles"
import NewBlackCircle from "../images/NewBlackCircle.png"
import blueCircle from "../images/blueCircle.png"
import "../styles/homePage.css"
import { Link } from "react-router-dom"


export default function HomePage() {
    return (

        <div id="home">
            <Navbar />
            <div className="top-bubble">
                <Link to="/userGraph">
                    <Bubbles image={blueCircle} label={"Connects"} startOp={.2} />
                </Link>
            </div>
            <div className="center-bubble">
                <Bubbles image={NewBlackCircle} label={"In-Touch"} startOp={1} />
            </div>
            <div className="bottom-bubbles">
                <div id="left-btm-bubble">
                    <Bubbles image={NewBlackCircle} label={"Profile"} startOp={.2} />
                </div>
                <div id="right-btm-bubble">
                    <Link to="/about">
                        <Bubbles image={NewBlackCircle} label={"About-Us"}  startOp={.2} />
                    </Link>
                </div>
            </div>
        </div>
    )
}