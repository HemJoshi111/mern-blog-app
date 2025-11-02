import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check localStorage for user data on initial load
  useEffect(() => {
    // --- FIX ---
    // Added a try...catch block to safely parse localStorage.
    // This prevents the 'JSON.parse("undefined")' crash.
    let storedUser = null;
    const storedToken = localStorage.getItem('token');

    try {
      storedUser = localStorage.getItem('user');
      
      // Check for invalid, "undefined" strings
      if (storedUser && storedUser !== 'undefined' && storedToken && storedToken !== 'undefined') {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        // Clear out any bad data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage. Clearing storage.');
      // Clear out any bad data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []); // Empty dependency array runs this once on app load

  // Login function
  const login = (userData, userToken) => {
    // --- FIX ---
    // Add checks to prevent storing 'undefined'
    if (userData && userToken) {
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userToken);
    } else {
      console.error('Login attempt with invalid user data or token.');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // The value that will be provided to all consuming components
  const contextValue = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
