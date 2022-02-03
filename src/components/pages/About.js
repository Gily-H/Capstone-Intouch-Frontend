import React from "react";
import "../../styles/about.css";

export default function About() {
  return (
    <div className="home-page">
      <div className="about-circles">
        <div>
          <img className="about-circle-left" src="https://stringfixer.com/files/18113637.jpg" alt="bubble" />
          <p className="about-circle-left-text about-circle-allText">
            When you join in-touch, we’ll remind you when it’s been a while since you last connected with your important
            relationships. You can then send them a text, right from here!
          </p>
        </div>

        <div>
          <img className="about-circle-middle" src="https://stringfixer.com/files/18113637.jpg" alt="bubble" />
          <p className="about-circle-middle-text about-circle-allText">
            <span className="gray-text">in-Touch</span> is on a mission to help people connect{" "}
            <span className="purple-text">— and stay connected. </span>
            <br></br>
            <br></br>
            <span id="main-text-small">
              Too often, we find ourselves busy in our personal affairs. At times - forgetting to connect with those we
              love. At in-touch, we believe that working hard towards your personal goals shouldn’t come at the cost of
              personal relationships.
            </span>
          </p>
        </div>

        <div>
          <img className="about-circle-right" src="https://stringfixer.com/files/18113637.jpg" alt="bubble" />
          <p className="about-circle-right-text about-circle-allText">
            <span id="creators-text">Creators</span>
            <br></br>
            <br></br>
            Gilman Huang
            <br></br>
            Sherzod Mirsharipov
            <br></br>
            Gallelee Thimotus
            <br></br>
            Raja Awais Azhar
          </p>
        </div>
      </div>
    </div>
  );
}
