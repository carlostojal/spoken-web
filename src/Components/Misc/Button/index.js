import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button className={`button ${props.type === "secondary" ? "secondary" : ""}`} onClick={props.onClick}>{props.children}</button>
  );
}