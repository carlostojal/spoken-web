import React from "react";
import "./TextField.css";

export default function TextField(props) {
  return (
    <input type={props.type || "text"} className="field" placeholder={props.placeholder} onChange={props.onChange} style={props.style} />
  );
};