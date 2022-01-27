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
                <Link to="/userGraph"><Bubbles image={blueCircle} label={"Connects"} startOp={.5} /></Link>
            </div>
            <div className="center-bubble">
                <Bubbles label={"In-Touch"} image={NewBlackCircle} startOp={1} />
            </div>
            <div className="bottom-bubbles">
                <div id="left-btm-bubble">
                    <Bubbles image={NewBlackCircle} label={"Profile"} startOp={.5} />
                </div>
                <Bubbles label={"About-Us"} image={NewBlackCircle} startOp={.5} />
            </div>
        </div>
    )
}