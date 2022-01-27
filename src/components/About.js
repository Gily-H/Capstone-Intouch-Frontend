import React from "react"
import Navbar from "./Navbar"
import "../styles/homePage.css"
import { animated, useSpring } from "react-spring"
import { useState } from "react/cjs/react.development"

export default function About() {
    const [text1, toggle1] = useState(false)
    const [text2, toggle2] = useState(false)

    const effs = useSpring({opacity: text1?1:0.2,fontSize: text1? 40:30})
    const effs2 = useSpring({opacity: text2?1:0.2})
    return (
        <div className="home-page">
            <Navbar />
            <animated.div className="home-text1" style={effs} onMouseOver={() => toggle1(!text1)} onMouseOut={() => toggle1(!text1)}>
                <h2>Coming Together</h2>
                <p>These have been trying times. With our lives being busier than ever,
                    forgetting those we love and cherish has become a regrettable norm.
                    If we could visualize the links between us and how far they've grown, coming
                    together could seem the new norm.</p>
            </animated.div>
            <animated.div className="home-text2" style={effs2} onMouseOver={()=> toggle2(!text2)} onMouseOut={() => toggle2(!text2)}>
                <h2>What is In-Touch?</h2>
                <p>Developed by students attending Brooklyn College, In-Touch is an excercise in interconnectivity.
                    Designed from the ground up with an ever changing model, to visualize our interactions with those close to us.</p>
            </animated.div>
        </div>
    )
}