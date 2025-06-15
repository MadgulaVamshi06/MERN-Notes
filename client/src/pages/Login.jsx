import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/auth/login",
      { email, password }
    );
    if (data.success) {
      setAuth({ user: data.user, token: data.token });
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: data.user, token: data.token })
      );
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
};

export default Login;
