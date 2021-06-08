import React from "react";
import { Link } from "react-router-dom";
import "./ListUser.css";

function ListUser(props) {
  return (
    <Link to={`/user/${props.user._id}`} style={{textDecoration: "none", color: "white"}}>
      <div className="listUserContainer">
        <p>{props.user.username}</p>
        <p>{props.user.name} {props.user.surname}</p>
      </div>
    </Link>
  );
}

export default ListUser;