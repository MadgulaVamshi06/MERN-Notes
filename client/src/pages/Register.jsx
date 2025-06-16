import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', answer: '', address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      'https://mern-notes-backend-git-main-madgula-vamshis-projects.vercel.app/api/v1/auth/register',
      formData
    );
    if (data.success) {
      alert('Registration Successful');
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Register</h2>
      {['name', 'email', 'password', 'phone', 'answer', 'address'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit" className="btn-green">Register</button>
    </form>
  );
};

export default Register;
