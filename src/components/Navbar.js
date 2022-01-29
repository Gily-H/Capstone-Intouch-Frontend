import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/navbar2.css";
import Login from "./pages/Login";
import { animated, useSpring } from "react-spring";

export default function Navbar(props) {
  const effs = useSpring({
    from: { opacity: 0, marginTop: -200 },
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 500 },
  });

  return (
    <div>
      <animated.div className="nav-body" style={effs}>
        <div className="nav-header">
          {/* <h1 className="nav-title">In-Touch</h1> */}
          <Link to={props.user ? "/home" : "/"} className="nav-link">
            Home
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/signUp" className="nav-link nav-login-btn">
            Sign up
          </Link>
          <Link to="/login" className="nav-link nav-login-btn">
            Login
          </Link>
        </div>
      </animated.div>
      <Outlet />
    </div>
  );
}
