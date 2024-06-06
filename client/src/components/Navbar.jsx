import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Posts lists</Link>
      {" | "}
      <Link to="/new">New post</Link>
    </nav>
  );
};

export default Navbar;
