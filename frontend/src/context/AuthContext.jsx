import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 NEW

  const loadUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // IMPORTANT
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    } else {
      setLoading(false); // IMPORTANT
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    loadUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};