
import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/login.css'
import Navbar from './Navbar'
import axios from "axios"

export default function Login(){

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

    // async function handleSubmit(e){
    //     e.preventDefault()
    //     // await axios.post(`INSERT LINK HERE`, {userName, password})
      
    // }

	function handleForm(event) {
		event.preventDefault();
		setUserName(event.target[0].value)
		setPassword(event.target[1].value)
		
		console.log(event.target[0].value)
		axios
		  .post(
			"https://crud-intouch-backend.herokuapp.com/customAuth/signup",
			{
			  firstName: userName,
			  password: password
			}
		  )
		  .then((res) => {
			//navigate("../");
	
			//props.handleSuccessfulLogin(true);
			console.log("sent request to sign up");
				console.log(res.data)
			//props.user(res.data)
		  })
		  .catch((err) => console.log(err));
	  }
	
	
	const logo = "https://w7.pngwing.com/pngs/489/253/png-transparent-circular-economy-logo-ellen-macarthur-foundation-circle-company-service-logo.png"
	
	const google_logo = "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg"
	return(
		
		<div>
			<Navbar />
			<div className="login-box">
				
				{/* <img src={logo} className="logo"/> */}

				<h1 className="login-msg">Let's get in touch...</h1>
			<form onSubmit={handleForm} className="login-form">
				<label className="login-username">
					<input className="login-input"
					placeholder="Username"
					type="text" 
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
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
          <img src={google_logo} className="google-logo" />
          <p className="google-text">Continue with Google</p>
        </button>

         <p className="sign-up-msg">
            Already a member? <a href="/login">Login</a>
          </p>
            
      </form>
            
        <hr className="login-footer-line" />
        <p className="login-footer-msg">
          By continuing in you agree to the in-Touch's Terms of Service, Privacy
          Policy
        </p>
      </div>
    </div>
  );
}
