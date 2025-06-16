import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Notes App</Link>
      <div className="navbar-links">
        {/* <Link to="/dashboard" className="navbar-link">Notes</Link> */}
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/register" className="navbar-link">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
