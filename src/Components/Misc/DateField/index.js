import React from "react";
import "./DateField.css";

export default function DateField(props) {
  return (
    <input type="date" className="field" placeholder={props.placeholder}  style={props.style} />
  );
};