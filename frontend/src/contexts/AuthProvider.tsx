import { useState, type ReactNode, useEffect } from "react";
import type { User, LoginData } from "../types/auth";
import { loginUser, getMe } from "../services/authService";
import { AuthContext } from "./AuthContext";
import axios from "axios";
export interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(
    () => !!localStorage.getItem("token"),
  );

  const logout = () => {
    setUser(null);
    setToken(null);
    setLoading(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      return;
    }
    const recoverUser = async () => {
      try {
        const getUser = await getMe();
        setUser(getUser);
        setToken(storedToken);
      } catch (error) {
        if (
          axios.isAxiosError<{ message: string }>(error) &&
          error.response?.status === 401
        ) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    recoverUser();
  }, []);

  const login = async (data: LoginData): Promise<User> => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      return response.user;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
