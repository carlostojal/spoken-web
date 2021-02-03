import React from "react";
import "./Header.css"

function Header(props) {
  return (
    <header className="header">
      <h1 className="title">{props.children}</h1>
      <h2 className="subtitle">{props.subtitle}</h2>
    </header>
  );
}

export default Header;