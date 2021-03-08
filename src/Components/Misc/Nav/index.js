import React from "react";
import "./Nav.css";

function Nav(props) {
  return (
    <div className="nav">
      <div className="tab">
        Home
      </div>
      <div className="tab">
        New
      </div>
      <div className="tab">
        Profile
      </div>
    </div>
  );
}

export default Nav;