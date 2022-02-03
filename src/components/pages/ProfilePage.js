import React from "react";
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";

import { AddPersonForm } from "../forms";
import { DEFAULT_PROFILE_IMAGE, DEFAULT_PERSON_IMAGE } from "../../resources/profileImages";
import "../../styles/profile.css";

export default function ProfilePage(props) {
  const navigate = useNavigate();
  if (!props.user) {
    navigate("/login");
  }

  const [personInfo, handleChange, clearForm] = useForm({
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    strength: "",
  });

  // const id = useParams();
  // console.log(props.user);
  // console.log(props.friends);

  function handleSubmit(event) {
    event.preventDefault();
    const id = nanoid();
    const addPerson = {
      ...personInfo,
      strength: personInfo.strength || 50,
      friendId: id,
      lastContact: Date.now(),
      userId: props.user.id,
    };

    const addPersonNode = {
      ...personInfo,
      strength: personInfo.strength || 50,
      id: id, // need field this to update the graph in real time without errors
      lastContact: Date.now(),
      userId: props.user.id,
    };

    axios
      .post("https://crud-intouch-backend.herokuapp.com/api/friends", addPerson)
      .then((res) => props.addRelationHandler(addPerson, addPersonNode))
      .catch((error) => console.log(error));

    clearForm();
  }

  /* display the friend cards  */
  const friendCards = props.friends.map((friend, index) => {
    return (
      <div className="contact-card" key={index}>
        <img src={friend.imageUrl || DEFAULT_PERSON_IMAGE} alt="default-person-img" />
        <p className="contact-name">
          {friend.firstName} {friend.lastName}
        </p>
      </div>
    );
  });

  /* component to display the user info */
  const profileCard = (
    <div className="profile-left-panel">
      <div className="profile-pic-container">
        <img className="profile-pic" src={DEFAULT_PROFILE_IMAGE} alt="default-profile-img" />
        <h2 className="profile-initials">{props.user && `${props.user.firstName[0]} ${props.user.lastName[0]}`}</h2>
      </div>
      <div className="profile-user-info">
        <h1 className="profile-username">
          {props.user ? `${props.user.firstName} ${props.user.lastName}` : "Name not Available"}
        </h1>
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
          <div className="contacts-panel-bottom">{friendCards}</div>
        </div>
      </div>
    </div>
  );
}
