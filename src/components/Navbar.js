import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import Login from './Login'



export default function Navbar(){

    return(
        <div>

        <div className="nav-body">
            
            <div className="nav-header">
               
                <h1 className="nav-title">In-Touch</h1>
            </div>

            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/userGraph" className="nav-link">My Connects</Link>
                <Link to="/" className="nav-link">About</Link>

                <Link to="/signUp" className="nav-link nav-login-btn" >Sign up</Link>
                <Link to="/login" className="nav-link nav-login-btn" >Login</Link>
                
            </div>
        </div>
       
        

        </div>
    )
}