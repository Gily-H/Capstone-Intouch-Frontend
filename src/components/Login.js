import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/login.css";
import Navbar from "./Navbar";
import axios from "axios";

const logo =
  "https://w7.pngwing.com/pngs/489/253/png-transparent-circular-economy-logo-ellen-macarthur-foundation-circle-company-service-logo.png";

const google_logo =
  "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg";

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [signIn, setSignIn] = useState({
    userName: "",
    password: "",
  });

  function handleForm(event) {
    const userLogin = signIn;
    axios.post(
      "https://crud-intouch-backend.herokuapp.com/customAuth/signin",
      userLogin
    );
  }

  function handleLogin() {
    setRedirect(true);
  }

  function handleChange(event) {
    setSignIn((prevSignIn) => ({
      ...prevSignIn,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    if (redirect) {
      window.open(
        "https://crud-intouch-backend.herokuapp.com/auth/google",
        "_self"
      );
    }
  }, [redirect]);

  return (
    <div>
      <Navbar />
      <div className="login-box">
        {/* <img src={logo} className="logo"/> */}

        <h1 className="login-msg">Login to your account</h1>
        <form onSubmit={handleForm} className="login-form">
          <label className="login-username">
            <input
              className="login-input"
              placeholder="Username"
              type="text"
              value={signIn.userName}
              onChange={handleChange}
              name="userName"
            />
          </label>
          <label className="login-password">
            <input
              className="login-input"
              placeholder="Password"
              type="password"
              value={signIn.password}
              onChange={handleChange}
              name="password"
            />
          </label>
          <input
            type="submit"
            value="Login"
            className="login-btns login-submit-btn"
          />
          <p className="login-OR"> or</p>
          <p className="sign-up-msg">
            Dont have an account? <a href="/signUp">Sign Up</a>
          </p>
        </form>

        <button className="login-btns login-google-btn" onClick={handleLogin}>
          <img src={google_logo} className="google-logo" alt="google-icon" />
          <p className="google-text">Continue with Google</p>
        </button>

        <hr className="login-footer-line" />
        <p className="login-footer-msg">
          By continuing in you agree to the in-Touch's Terms of Service, Privacy
          Policy
        </p>
      </div>
    </div>
  );
}
