import React from "react";
import RemoveFriendNode from "./RemoveFriendNode";

export default function FriendSlide(props) {
  const friendId = props.friend.id;
  const name = `${props.friend.firstName} ${props.friend.lastName}`;
  const phone = props.friend.phone;
  const imageUrl = props.friend.imageUrl;
  const updatedAt = props.friend.lastContact;

  const displayRemoveButton = props.rootUserId !== friendId && (
    <RemoveFriendNode deleteHandler={props.deleteHandler} selectedId={friendId} />
  );

  function updateStrength(friendId, factor) {
    props.updateStrengthConnection(friendId, factor);
  }

  return (
    <div className="friend-slide">
      <img className="friend-img" src={imageUrl} alt="friend-profile"></img>
      <h2 className="friend-name">{name}</h2>
      <p className="friend-phone">Phone: {phone}</p>
      <p className="friend-last-contact">Last Connection {updatedAt}</p>
      <button className="friend-contact" onClick={() => updateStrength(friendId, 20)}>
        Send a Messge
      </button>
      <button className="friend-contact" onClick={() => updateStrength(friendId, -20)}>
        Wait to connect
      </button>
      <div className="delete-btn">{displayRemoveButton}</div>
    </div>
  );
}
