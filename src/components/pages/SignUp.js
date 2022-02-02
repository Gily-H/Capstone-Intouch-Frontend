import React from "react";
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserForm } from "../forms";
import "../../styles/login.css";

export default function SignUp(props) {
  const [signupInfo, handleChange, clearForm] = useForm({
    firstName: "",
    password: "",
    lastName: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();
    const newUser = { ...signupInfo };

    axios
      .post("https://crud-intouch-backend.herokuapp.com/customAuth/signup", newUser)
      .then((res) => {
        navigate("/home");
        props.userData(res.data);
      })
      .catch((err) => console.log(err));
  }

  const text = {
    loginMessage: "Let's get in touch...",
    signupMessage: "Already a member?",
    option: "Login",
    button: "Create Account",
  };

  return (
    <UserForm handleFormSubmit={handleForm} handleInputChange={handleChange} userInfo={signupInfo} formText={text} />
  );
}
