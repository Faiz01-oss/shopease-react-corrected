import React from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopease-user")) || null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    if (!email || !password) throw new Error("Email and password are required.");
    const saved = JSON.parse(localStorage.getItem("shopease-account") || "null");
    if (!saved || saved.email !== email || saved.password !== password) {
      throw new Error("Invalid email or password.");
    }
    const loggedUser = { name: saved.name, email: saved.email };
    setUser(loggedUser);
    localStorage.setItem("shopease-user", JSON.stringify(loggedUser));
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password) throw new Error("All fields are required.");
    const account = { name, email, password };
    localStorage.setItem("shopease-account", JSON.stringify(account));
    const loggedUser = { name, email };
    setUser(loggedUser);
    localStorage.setItem("shopease-user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopease-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);