import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {

  return (
    <div className="nav">
      <Link to="/" className="tab" style={{textDecoration: "none"}}>
        <FontAwesomeIcon icon={faHome} size="2x" />
      </Link>
      <Link to="/search" className="tab" style={{textDecoration: "none"}}>
          <FontAwesomeIcon icon={faSearch} size="2x" />
      </Link>
      <Link to="/user/me" className="tab" style={{textDecoration: "none"}}>
          <FontAwesomeIcon icon={faUser} size="2x" />
      </Link>
      <Link to="/download" className="tab" style={{textDecoration: "none"}}>
          <FontAwesomeIcon icon={faDownload} size="2x" />
      </Link>
    </div>
  );
}

export default Nav;