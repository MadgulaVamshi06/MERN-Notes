import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://mern-notes-backend-sooty.vercel.app/api/v1/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (data.success) {
        alert('Registration Successful');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn-green">Register</button>
    </form>
  );
};

export default Register;
