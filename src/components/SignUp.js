import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/login.css";
import Navbar from "./Navbar";
export default function Login() {
  const logo =
    "https://w7.pngwing.com/pngs/489/253/png-transparent-circular-economy-logo-ellen-macarthur-foundation-circle-company-service-logo.png";

  const google_logo =
    "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg";

  const [signUp, setSignUp] = useState({
    userName: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // await axios.post(`INSERT LINK HERE`, {userName, password})
    setRedirect(true);
  }

  function handleChange(event) {
    setSignUp((prevSignUp) => ({
      ...prevSignUp,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div>
      <Navbar />
      <div className="login-box">
        {/* <img src={logo} className="logo"/> */}

        <h1 className="login-msg">Let's get in touch...</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-username">
            <input
              className="login-input"
              placeholder="Username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label className="login-password">
            <input
              className="login-input"
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Create Account"
            className="login-btns login-submit-btn"
          />
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
