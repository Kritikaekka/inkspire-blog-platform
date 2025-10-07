import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
