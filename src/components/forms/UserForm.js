import React from "react";

export default function UserForm(props) {
  return (
    <div className="login-box">
      <h1 className="login-msg">{props.formText.loginMessage}</h1>

      <form onSubmit={props.handleFormSubmit} className="login-form">
        <label className="login-username">
          <input
            className="login-input"
            placeholder="Username"
            type="text"
            name="firstName"
            value={props.userInfo.firstName}
            onChange={props.handleInputChange}
            required
          />
        </label>

        {props.lastNameInput}

        <label className="login-password">
          <input
            className="login-input"
            placeholder="Password"
            type="text"
            name="password"
            value={props.userInfo.password}
            onChange={props.handleInputChange}
            required
          />
        </label>

        <input type="submit" value={props.formText.button} className="login-btns login-submit-btn" />
        
      </form>

      <p className="sign-up-msg">
        {props.formText.signupMessage} <a href="/signUp">{props.formText.option}</a>
      </p>
      <hr className="login-footer-line" />
      <p className="login-footer-msg">By continuing in you agree to the in-Touch's Terms of Service, Privacy Policy</p>
    </div>
  );
}
