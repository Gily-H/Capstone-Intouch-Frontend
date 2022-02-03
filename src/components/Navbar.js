import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import { animated, useSpring } from "react-spring";
import "../styles/navbar2.css";

export default function Navbar(props) {
  const navigate = useNavigate();
  const effs = useSpring({
    from: { opacity: 0, marginTop: -200 },
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 500 },
  });

  function userLogout() {
    axios
      .get("https://crud-intouch-backend.herokuapp.com/customAuth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        props.handleUser("");
        navigate("/landing");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <animated.div className="nav-body" style={effs}>
        <div className="nav-header">
          {/* <h1 className="nav-title">In-Touch</h1> */}
          <Link to="/landing" className="nav-link">
            Home
          </Link>
        </div>

        {props.user ? (
          <div className="nav-links-with-signin">
            {props.user.firstName}
            <button onClick={userLogout}>Logout</button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/signUp" className="nav-link nav-login-btn">
              Sign up
            </Link>
            <Link to="/login" className="nav-link nav-login-btn">
              Login
            </Link>
          </div>
        )}
      </animated.div>
      <Outlet />
    </div>
  );
}
