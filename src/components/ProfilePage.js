import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./profile.css";

export default function ProfilePage(props) {
  const userInitials = "JN";
  const friendsData = props.friends;
  console.log(props.friends);
  const [formVals, setFormVals] = useState({
    id: 4,
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    strength: "",
    lastContacted: "",
  });

  function updateOnChange(event) {
    setFormVals((prevFormVals) => ({
      ...prevFormVals,
      [event.target.name]: event.target.value,
    }));
  }

  const sendData = (newFriendData) => {
    axios
      .post(
        "https://crud-intouch-backend.herokuapp.com/api/friends/",
        newFriendData
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const addFriend = {
      userId: 1,
      friendId: nanoid(),
      firstName: formVals.firstName,
      lastName: formVals.lastName,
      phone: formVals.phone,
      strength: formVals.strength || 100,
      // imageUrl: formVals.imageUrl,
    };
    console.log(addFriend);
    sendData(addFriend);
    props.addData(addFriend);
    // setFormVals((prevFormVals) => ({
    //   id: formVals.id + 1,
    //   firstName: "",
    //   lastName: "",
    //   phone: "",
    //   imageUrl: "",
    // }));
  }

  return (
    <div>
      <Navbar />

      <div className="profile-panels">
        <div className="profile-left-panel">
          <div className="profile-pic-container">
            <img
              className="profile-pic"
              src="https://stringfixer.com/files/18113637.jpg"
              alt="profile"
            />
            <p className="profile-initials">
              {userInitials.charAt(0)} {userInitials.charAt(1)}
            </p>
          </div>
          <div className="profile-user-info">
            <h1 className="profile-username">John Nelson</h1>
            <p className="profile-phone"> 209 - 563 - 7170</p>
          </div>
        </div>

        <div className="profile-middle-panel">
          <form onSubmit={handleSubmit} className="login-form add-contact-form">
            <h1 className="add-contact-form-title">Get in touch</h1>
            <label className="login-username">
              <input
                className="login-input"
                placeholder="First Name"
                type="text"
                name="firstName"
                value={formVals.firstName}
                onChange={updateOnChange}
              />
            </label>
            <label className="login-password">
              <input
                className="login-input"
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={formVals.lastName}
                onChange={updateOnChange}
              />
            </label>
            <label className="phone-input">
              <input
                className="login-input"
                placeholder="Phone#:"
                type="number"
                name="phone"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={formVals.phone}
                onChange={updateOnChange}
              />
            </label>
            <label className="login-password">
              <input
                className="login-input"
                placeholder="Image URL"
                type="text"
                name="imageUrl"
                value={formVals.imageUrl}
                onChange={updateOnChange}
              />
            </label>
            <label>
              <input
                placeholder="Relationship Strength"
                type="range"
                min="1"
                max="100"
                value={formVals.strength || 1}
                name="strength"
                onChange={updateOnChange}
              />
              <label>{formVals.strength}</label>
            </label>
            <input
              type="submit"
              value="Add Contact"
              className="login-btns login-submit-btn add-contact-btn"
            />
          </form>

          <div className="contacts-panel-bottom">
            {friendsData?.map((item, index) => {
              return (
                <div className="contact-card" key={index}>
                  <img
                    src="https://w7.pngwing.com/pngs/529/816/png-transparent-computer-icons-user-profile-avatar-heroes-monochrome-black-thumbnail.png"
                    alt="contact"
                  />
                  <p className="contact-name">
                    {item.firstName} {item.lastName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
