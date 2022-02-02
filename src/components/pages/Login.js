import React, { useEffect } from "react";
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserForm } from "../forms";
import "../../styles/login.css";

export default function Login(props) {
  const [loginInfo, handleChange, clearForm] = useForm({
    firstName: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();
    const user = { ...loginInfo };

    axios
      .post("https://crud-intouch-backend.herokuapp.com/customAuth/signin", user)
      .then((res) => {
        setTimeout(() => navigate("/home"), 500);
        console.log("sent request to sign in");
        console.log(res.data);
        props.userData(res.data);
      })
      .catch((err) => console.log(err));
  }

  

  // function handleLogin() {
  //   window.open("https://crud-intouch-backend.herokuapp.com/auth/google", "_self");
  // }

  const text = {
    loginMessage: "Login to your account",
    signupMessage: "Don't have an account?",
    option: "Sign Up",
    button: "Login",
  };

  return (
    <UserForm handleFormSubmit={handleForm} handleInputChange={handleChange} userInfo={loginInfo} formText={text} />
  );
}
