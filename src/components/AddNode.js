import React, { useState } from "react";

export default function AddNode(props) {
  const [formVals, setFormVals] = useState({ root: 0, friend: 0 });

  function updateOnChange(event) {
    setFormVals((prevFormVals) => ({
      ...prevFormVals,
      [event.target.name]: event.target.value,
    }));
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    const id = Number(event.target[0].value);
    const newData = {
      node: { id: id, index: id },
      link: { source: 0, target: id },
    };

    props.addData(newData);
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <label>
        Add Friend:
        <input
          type="number"
          placeholder="add friend..."
          value={formVals.friend}
          name="friend"
          onChange={updateOnChange}
        />
      </label>
      <button>Add Friend</button>
    </form>
  );
}
