import React from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to the Notes App</h1>
        <p className="homepage-subtitle">
          Your simple and secure place to create notes
        </p>
        <a href="/register" className="get-started-btn">Get Started</a>
      </div>
    </div>
  );
};

export default HomePage;
