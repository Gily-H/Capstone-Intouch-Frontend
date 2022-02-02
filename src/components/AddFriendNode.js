import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function AddFriendNode(props) {
  const [formVals, setFormVals] = useState({
    friend_id: "",
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    strength: "",
    lastContact: "",
    userId: "",
  });

  function updateOnChange(event) {
    setFormVals((prevFormVals) => ({
      ...prevFormVals,
      [event.target.name]: event.target.value,
    }));
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    const newData = {
      node: {
        friend_id: nanoid(),
        firstName: formVals.firstName,
        lastName: formVals.lastName,
        phone: formVals.phone,
        imageUrl: formVals.imageUrl,
        strength: formVals.strength,
        lastContact: Date.now(), /* CREATE TIMESTAMP */
        userId: props.userId,
      },
      link: { source: 0, target: formVals.id }, // stays constant
    };

    props.addData(newData);

    setFormVals((prevFormVals) => ({
      friend_id: "",
      firstName: "",
      lastName: "",
      phone: "",
      imageUrl: "",
      strength: "",
      lastContact: "",
      userId: "",
    }));
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <label>
        First Name:
        <input
          type="text"
          placeholder="First name..."
          value={formVals.firstName}
          name="firstName"
          onChange={updateOnChange}
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          placeholder="Last name..."
          value={formVals.lastName}
          name="lastName"
          onChange={updateOnChange}
        />
      </label>

      <label>
        Phone:
        <input
          type="text"
          placeholder="Phone..."
          value={formVals.phone}
          name="phone"
          onChange={updateOnChange}
        />
      </label>

      <label>
        Image Link:
        <input
          type="text"
          placeholder="Photo..."
          value={formVals.imageUrl}
          name="imageUrl"
          onChange={updateOnChange}
        />
      </label>

      <label>
        Strength of Relationship:
        <input
          type="text"
          min="1"
          max="100"
          value={formVals.strength}
          name="strength"
          onChange={updateOnChange}
        />
      </label>

      <button>Add Friend</button>
    </form>
  );
}
