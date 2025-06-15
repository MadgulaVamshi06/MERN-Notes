import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: '' });

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) setAuth(JSON.parse(storedAuth));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);