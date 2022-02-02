import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/login.css'
import Navbar from './Navbar'
export default function Login(){

	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [password, setPassword] = useState();

	const [redirect, setRedirect] = useState(false)

	console.log(firstName);

    async function handleSubmit(e){
        e.preventDefault()
        // await axios.post(`INSERT LINK HERE`, {userName, password})
        setRedirect(true)
    }
	const logo = "https://w7.pngwing.com/pngs/489/253/png-transparent-circular-economy-logo-ellen-macarthur-foundation-circle-company-service-logo.png"
	
	const google_logo = "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg"
	return(
		
		<div>
			<Navbar/>
			<div className="login-box">
				
				{/* <img src={logo} className="logo"/> */}

				<h1 className="login-msg">Let's get in touch...</h1>
			<form onSubmit={handleSubmit} className="login-form">
				<label className="login-firstName">
					<input className="login-input"
					placeholder="First Name"
					type="text" 
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<label className="login-lastName">
					<input className="login-input"
					placeholder="Last Name"
					type="text" 
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<label className="login-password">
					<input className="login-input"
					placeholder="Password"
					type="text" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" value="Create Account" className="login-btns login-submit-btn"/>
				<p className="login-OR"> or</p>

				<button className="login-btns login-google-btn">
					<img src={google_logo} className="google-logo"/> 
					<p className="google-text">Continue with Google</p>
				</button>
				<p className="sign-up-msg"> 
					Already a member? <a href="/login">Login</a>
				</p>
			</form>
			<hr className="login-footer-line"/>
			<p className="login-footer-msg"> 
			By continuing in you agree to the in-Touch's Terms of Service, Privacy Policy
			</p>
			
			</div>
		</div>
    )
}