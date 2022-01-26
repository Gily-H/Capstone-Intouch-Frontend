import React from "react";

export default function RemoveNode(props) {
  return <button onClick={() => props.deleteHandler(props.selectedId)}>Delete</button>;
}
