import React, { useState } from "react"

export default function FriendSlide(props){
    
    const name = `${props.firstName} ${props.lastName}`

    const phone = props.phone

    const imageUrl = props.imageUrl

    const updatedAt = props.updatedAt

    return(
        <div id="friend-slide">
            {props? <><img src={imageUrl}></img>
            <h2>Name: {name}</h2>
            <h3>Phone: {phone}</h3>
            <h3>Last Connection {updatedAt}</h3></> : <h2>bi</h2>}
            
            
        </div>
    )
}