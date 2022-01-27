import React from "react";
import Navbar from "./Navbar";

export default function FriendSlide(props) {
  const name = `${props.firstName} ${props.lastName}`;
  const phone = props.phone;
  const imageUrl = props.imageUrl;
  const updatedAt = props.updatedAt;

  return (
    <div className="friend-slide">
      <img className="friend-img" src={imageUrl} alt="friend-profile"></img>
      <h2 className="friend-name">{name}</h2>
      <p className="friend-phone">Phone: {phone}</p>
      <p className="friend-last-contact">Last Connection {updatedAt}</p>
      <button className="friend-contact">
        (message icon) Send a Messge
      </button>
    </div>
  );
}
