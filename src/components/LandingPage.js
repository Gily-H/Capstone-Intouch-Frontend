import React,{useState} from "react"
import { animated,useSpring } from "react-spring"
import Navbar from "./Navbar"
import NewBlackCircle from "../images/NewBlackCircle.png"
import "../styles/homePage.css"
import blueCircle from "../images/blueCircle.png"
import "../styles/homePage.css"
import { Link } from "react-router-dom"
import Bubbles from "./Bubbles"


export default function LandingPage(){
    const [open, toggle] = useState(false)
    const effs = useSpring({from:{transform:"translateY(200%)"}, to:{transform: open? "translateY(0%)":"translateY(200%)",opacity: open? 1 : 0}})
    const leftEffs = useSpring()

    return(

        <div id="home">
        <Navbar />
        <animated.div style={effs} className="top-bubble">
            <Link to="/userGraph"><Bubbles image={blueCircle} label={"Connects"} startOp={.2} /></Link>
        </animated.div>
        <animated.div className="center-bubble" onMouseDown={()=> toggle(!open)}>
            <Bubbles label={"In-Touch"} image={NewBlackCircle} startOp={1} />
        </animated.div>
        <div className="bottom-bubbles">
            <div id="left-btm-bubble">
                <Bubbles image={NewBlackCircle} label={"Profile"} startOp={.2} />
            </div>
            <Bubbles label={"About-Us"} image={NewBlackCircle} startOp={.2} />
        </div>
    </div>
    )
}