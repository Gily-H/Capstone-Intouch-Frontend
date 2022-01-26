import React from "react"
import {animated, useSpring} from "react-spring"
import Navbar from "./Navbar"
import Bubbles from "./Bubbles"
import "../styles/homePage.css"


export default function HomePage(){
    return(
        
        <div id="home-bubbles">
            <Navbar/>
            <div className="top-bubbles">
            <Bubbles/>
            <Bubbles/>
            </div>
            <div className="center-bubble">
                <Bubbles/>
            </div>
            <div className="bottom-bubbles">
                <Bubbles/>
                <Bubbles/>
            </div>
        </div>
    )
}