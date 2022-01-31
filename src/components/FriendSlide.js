import React from "react";
import RemoveFriendNode from "./RemoveFriendNode";
import { Link } from "react-router-dom";
import "../styles/FriendSlide.css";

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
      <div>
        <img className="friend-img" src={imageUrl} alt="friend-profile"></img>
        <h2 className="friend-name">{name}</h2>
        <hr className="friend-hr-line" />
      </div>

      <p className="friend-phone">Phone: {phone}</p>
      <p className="friend-last-contact">Last Connection {updatedAt}</p>

      <div className="friend-contact-buttons">
        <button className="friend-contact message-btn" onClick={() => updateStrength(friendId, 20)}>
          Send a Messge
        </button>
        <button className="friend-contact" onClick={() => updateStrength(friendId, -20)}>
          Wait to connect
        </button>
      </div>

      <div className="delete-btn">{displayRemoveButton}</div>

      <div className="friend-slide-footer">
        <Link className="friend-slide-home-btn" to={`../home`}>
          <i class="fas fa-home"></i>Home
        </Link>
        <Link className="friend-slide-add-friend-btn" to={`../profile/${props.rootUserId}`}>
          Add Friend
        </Link>
      </div>
    </div>
  );
}
