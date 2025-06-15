import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const PrivateRoute = () => {
  const { auth } = useAuth();
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
