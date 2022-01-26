import React, { useState } from "react";

export default function AddFriendNode(props) {
  const [formVals, setFormVals] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    strength: "",
    lastContacted: "",
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
      /* ADDITIONAL DAYS FIELD FOR TESTING PURPOSES ONLY -> See App.js */
      node: {
        id: formVals.id,
        index: formVals.id,
        firstName: formVals.firstName,
        lastName: formVals.lastName,
        phone: formVals.phone,
        interactions: 1, /* DEFAULT FOR NOW */
        imageUrl: formVals.imageUrl,
        strength: formVals.strength,
      },
      link: { source: 0, target: formVals.id }, // stays constant
    };

    props.addData(newData);
    
    setFormVals((prevFormVals) => ({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      imageUrl: "",
      strength: "",
      lastContacted: "",
    }));
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <label>
        Temp ID:
        <input
          type="number"
          placeholder="add"
          value={formVals.id}
          name="friend"
          onChange={updateOnChange}
        />
      </label>
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
