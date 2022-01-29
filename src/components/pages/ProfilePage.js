import React from "react";
import { useForm } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";

import { AddPersonForm } from "../forms";
import { DEFAULT_PROFILE_IMAGE, DEFAULT_PERSON_IMAGE } from "../../resources/profileImages";
import "../../styles/profile.css";

export default function ProfilePage(props) {
  const [personInfo, handleChange, clearForm] = useForm({
    friendId: "",
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    strength: "",
    userId: "",
  });
  const navigate = useNavigate();

  if (props.user === null) {
    navigate("/login");
  }

  const id = useParams();
  const userInitials = "JN";
  console.log(props.user);
  console.log(props.nonRoot);

  function handleSubmit(event) {
    event.preventDefault();

    const addPerson = {
      ...personInfo,
      userId: 1,
      friendId: nanoid(),
    };

    console.log(addPerson);

    axios
      .post("https://crud-intouch-backend.herokuapp.com/api/friends/", addPerson)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    clearForm();
  }

  /* display the friend cards  */
  const friendsData = props.nonRoot;
  const friendCards = friendsData?.map((item, index) => {
    return (
      <div className="contact-card" key={index}>
        <img src={DEFAULT_PERSON_IMAGE} alt="default-person-img" />
        <p className="contact-name">
          {item.firstName} {item.lastName}
        </p>
      </div>
    );
  });

  /* component to display the user info */
  const profileCard = (
    <div className="profile-left-panel">
      <div className="profile-pic-container">
        <img className="profile-pic" src={DEFAULT_PROFILE_IMAGE} alt="default-profile-img" />
        <p className="profile-initials">
          {userInitials.charAt(0)} {userInitials.charAt(1)}
        </p>
      </div>

      <div className="profile-user-info">
        <h1 className="profile-username">{props.user ? `${props.user.firstName}` : "Name not Available"}</h1>
        <p className="profile-phone"> 209 - 563 - 7170</p>
      </div>
    </div>
  );

  return (
    <div>
      {/* {id!==props.userId? <p>Not signed In</p>: */}
      <div className="profile-panels">
        {profileCard}
        <div className="profile-middle-panel">
          <AddPersonForm handleFormSubmit={handleSubmit} handleOnChange={handleChange} personInfo={personInfo} />
        </div>
        <div className="contacts-panel-bottom">{friendCards}</div>
      </div>
    </div>
  );
}
