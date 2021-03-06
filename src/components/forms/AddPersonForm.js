import React from "react";

export default function AddPersonForm(props) {
  return (
    <form onSubmit={props.handleFormSubmit} className="login-form add-contact-form">
      <h1 className="add-contact-form-title">Get in touch</h1>
      <label className="login-username">
        <input
          className="login-input"
          placeholder="First Name..."
          type="text"
          name="firstName"
          value={props.personInfo.firstName}
          onChange={props.handleOnChange}
        />
      </label>
      <label className="login-password">
        <input
          className="login-input"
          placeholder="Last Name..."
          type="text"
          name="lastName"
          value={props.personInfo.lastName}
          onChange={props.handleOnChange}
        />
      </label>
      <label className="phone-input">
        <input
          className="login-input"
          placeholder="Phone..."
          type="number"
          name="phone"
          value={props.personInfo.phone}
          onChange={props.handleOnChange}
        />
      </label>
      <label className="login-password">
        <input
          className="login-input"
          placeholder="Image..."
          type="text"
          name="imageUrl"
          value={props.personInfo.imageUrl}
          onChange={props.handleOnChange}
        />
      </label>
      <label>
        1
        <input
          className="login-input"
          placeholder="Relation Strength..."
          type="range"
          min="1"
          max="100"
          name="strength"
          value={props.personInfo.strength}
          onChange={props.handleOnChange}
          id="strength"
        />
        100
      </label>
      <input type="submit" value="Add Contact" className="login-btns login-submit-btn add-contact-btn" />
    </form>
  );
}
