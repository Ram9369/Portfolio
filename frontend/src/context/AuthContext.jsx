import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await API.get("/auth/me");
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        // User is not logged in or cookie is invalid/expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await API.post("/auth/login", { email, password });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: "Invalid credentials" };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to log in. Please check your credentials.";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const response = await API.post("/auth/register", { name, email, password });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: "Registration failed." };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Try a different email.";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await API.post("/auth/logout");
      setUser(null);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to log out.";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
