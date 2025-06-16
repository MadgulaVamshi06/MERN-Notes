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
    const { data } = await axios.post("https://mern-notes-backend-sooty.vercel.app/api/v1/auth/login", {
  email,
  password
}, {
  withCredentials: true // ✅ if using cookies, optional for JWT header
})
    if (data.success) {
      setAuth({ user: data.user, token: data.token });
      localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn-blue">Login</button>
    </form>
  );
};

export default Login;
