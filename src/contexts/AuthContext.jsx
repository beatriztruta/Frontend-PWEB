import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userEmail,
        setUserEmail,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};