import React from "react";
import RemoveNode from "./RemoveNode";

export default function FriendSlide(props) {
  const friendId = props.friend.id;
  const name = `${props.friend.firstName} ${props.friend.lastName}`;
  const phone = props.friend.phone;
  const imageUrl = props.friend.imageUrl;
  const updatedAt = props.friend.updatedAt; 

  const displayRemoveButton = props.rootUserId !== friendId && (
    <RemoveNode deleteHandler={props.deleteHandler} selectedId={friendId} />
  );

  return (
    <div className="friend-slide">
      <img className="friend-img" src={imageUrl} alt="friend-profile"></img>
      <h2 className="friend-name">{name}</h2>
      <p className="friend-phone">Phone: {phone}</p>
      <p className="friend-last-contact">Last Connection {updatedAt}</p>
      <button className="friend-contact">(message icon) Send a Messge</button>
      {displayRemoveButton}
    </div>
  );
}
