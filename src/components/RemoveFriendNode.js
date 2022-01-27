import React from "react";

export default function RemoveFriendNode(props) {
  return <button onClick={() => props.deleteHandler(props.selectedId)}>Delete</button>

 
}



  