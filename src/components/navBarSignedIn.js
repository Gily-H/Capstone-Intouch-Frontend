import React from "react"
import {Link} from "react-router-dom"
import { animated,useSpring } from "react-spring"
import '../styles/navbar2.css'

export default function navBarSignedIn(){
    const effs = useSpring({from: {opacity: 0, marginTop: -200},to: {opacity: 1, marginTop: 0}, config:{duration: 500}})

    return(
        <div>

        <animated.div className="nav-body" style={effs}>
            
            <div className="nav-header">
                {/* <img src={logo} className="bank-logo"/> */}
                {/* <h1 className="nav-title">In-Touch</h1> */}
                <Link to="/" className="nav-link">Home</Link>
            </div>

            <div className="nav-links">
                {/* <Link to="/" className="nav-link">Home</Link>
                <Link to="/userGraph" className="nav-link">My Connects</Link>
                <Link to="/" className="nav-link">About</Link> */}

                <Link to="/signUp" className="nav-link nav-login-btn" >Sign up</Link>
                <Link to="/login" className="nav-link nav-login-btn" >Login</Link>
                
            </div>
        </animated.div>
       
        

        </div>
    )
}