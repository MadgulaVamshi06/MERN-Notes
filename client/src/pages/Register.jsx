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
    const { data } = await axios.post('http://localhost:8000/api/v1/auth/register', formData);
    if (data.success) {
      alert('Registration Successful');
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      {['name', 'email', 'password', 'phone', 'answer', 'address'].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Register</button>
    </form>
  );
};

export default Register;