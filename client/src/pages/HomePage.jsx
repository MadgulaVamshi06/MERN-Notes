// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Notes App</h1>
        <p className="text-gray-600 text-lg">Your simple and secure place to create notes</p>
      </div>
    </div>
  );
};

export default HomePage;
