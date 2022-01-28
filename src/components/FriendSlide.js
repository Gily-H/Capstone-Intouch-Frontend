import React from "react";
import RemoveFriendNode from "./RemoveFriendNode";

export default function FriendSlide(props) {
  const friendId = props.friend.id;
  const name = `${props.friend.firstName} ${props.friend.lastName}`;
  const phone = props.friend.phone;
  const imageUrl = props.image; //test image for testing original = props.friend.imageUrl
  const updatedAt = props.friend.updatedAt;

  const displayRemoveButton = props.rootUserId !== friendId && (
    <RemoveFriendNode
      deleteHandler={props.deleteHandler}
      selectedId={friendId}
    />
  );

  let friend = 0;
  for (let i = 0; i < props.friends.length; i++) {
    if (props.friends[i].friendId === friendId) {
      friend = i;
      break;
    }
  }

  return (
    <div className="friend-slide">
      <img className="friend-img" src={imageUrl} alt="friend-profile"></img>
      <h2 className="friend-name">{name}</h2>
      <p className="friend-phone">Phone: {phone}</p>
      <p className="friend-last-contact">Last Connection {updatedAt}</p>
      <button
        className="friend-contact"
        onClick={() => props.updateConnection(friend)}>
        Send a Messge
      </button>
      <button
        className="friend-contact"
        onClick={() => props.updateConnection(friend, -20)}>
        Wait to connect
      </button>
      <div className="delete-btn">{displayRemoveButton}</div>
    </div>
  );
}


