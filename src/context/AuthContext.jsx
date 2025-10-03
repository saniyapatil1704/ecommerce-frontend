// src/context/AuthContext.jsx
// This context manages the global authentication state for our application.
// It provides the current user data and functions to log in, log out, and register.

import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";
// import authService from '../services/auth.service';

// Why we use createContext:
// React Context provides a way to pass data through the component tree
// without having to pass props down manually at every level. This is
// perfect for global state like authentication.
const AuthContext = createContext();

// Why we use AuthProvider:
// The provider component wraps our entire application or a part of it,
// making the authentication state available to all nested components.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);          

  // Why we use useEffect:
  // We use the effect hook to check for a logged-in user whenever the
  // component mounts. This ensures that if the page is refreshed, the
  // user's session is restored from local storage.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setCurrentUser(user);
    } else {
      // Token present but no user data (e.g cleared localStorage partially)
      authService.logout();
    }
    setLoading(false);
  }, []);

  // Login function that calls the service and updates state.
  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    return user;
  };

  // Logout function that calls the service and updates state.
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Register function that calls the service.
  const register = async (email, password) => {
    await authService.register(email, password);
  };

  // The value object contains the state and functions we want to expose.
  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
  };

  // The provider makes the 'value' object available to its children.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
