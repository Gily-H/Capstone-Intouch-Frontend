import React, { useState } from "react";
import RemoveFriendNode from "./RemoveFriendNode";
import { Link } from "react-router-dom";
import "../styles/FriendSlide.css";

export default function FriendSlide(props) {
  const [message, setMessage] = useState("");

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

  function connectWithFriend() {
    props.messageHandler(phone, message);
    updateStrength(friendId, 20);
    setMessage("");
  }

  function cancelConnectWithFriend() {
    props.closeMessageBoxHandler();
    setMessage("");
  }

  return (
    <div className="friend-slide">
      <div>
        <img className="friend-img" src={imageUrl} alt="friend-profile"></img>
        <h2 className="friend-name">{name}</h2>
        <hr className="friend-hr-line" />
      </div>

      <p className="friend-phone">Phone: {phone}</p>
      {props.rootUserId !== friendId && (
        <>
          <p className="friend-last-contact">Last Connection {updatedAt}</p>

          {props.isMessage ? (
            <div className="friend-message-container">
              <textarea
                className="friend-message"
                placeholder="message..."
                rows="7"
                cols="20"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button className="friend-contact send-btn" onClick={connectWithFriend}>
                Send
              </button>
              <button className="friend-contact cancel-btn" onClick={cancelConnectWithFriend}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="friend-contact-buttons">
              <button className="friend-contact message-btn" onClick={props.openMessageBoxHandler}>
                Send a Messge
              </button>
              <button className="friend-contact" onClick={() => updateStrength(friendId, -20)}>
                Wait to connect
              </button>
            </div>
          )}

          <div className="delete-btn">{displayRemoveButton}</div>
        </>
      )}

      <div className="friend-slide-footer">
        <Link className="friend-slide-home-btn" to={`../home`}>
          <i className="fas fa-home"></i>Home
        </Link>
        <Link className="friend-slide-add-friend-btn" to={`../profile/${props.rootUserId}`}>
          Add Friend
        </Link>
      </div>
    </div>
  );
}
