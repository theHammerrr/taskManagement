import React from "react";
import "./NavBar.css";

const title = "הרשימה המבצעית";

const NavBar: React.FC = () => {
  return (
    <div className="NavBar">
      <span className="Title">{title}</span>
    </div>
  );
};

export default NavBar;
