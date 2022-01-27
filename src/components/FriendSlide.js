import React from "react";
import RemoveFriendNode from "./RemoveFriendNode";
import Navbar from "./Navbar";


export default function FriendSlide(props) {
  const friendId = props.friend.id;
  const name = `${props.friend.firstName} ${props.friend.lastName}`;
  const phone = props.friend.phone;
  const imageUrl = props.image;//test image for testing original = props.friend.imageUrl
  const updatedAt = props.friend.updatedAt;

  const displayRemoveButton = props.rootUserId !== friendId && (
    <RemoveFriendNode deleteHandler={props.deleteHandler} selectedId={friendId} />
  );

  return (
    <div className="friend-slide">
      <img className="friend-img" src={imageUrl} alt="friend-profile"></img> 
      <h2 className="friend-name">{name}</h2>
      <p className="friend-phone">Phone: {phone}</p>
      <p className="friend-last-contact">Last Connection {updatedAt}</p>
      <button className="friend-contact"> Send a Messge</button>
      <div className="delete-btn">{displayRemoveButton}</div>
    </div>
  );
}
