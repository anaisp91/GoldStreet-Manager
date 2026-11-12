import { useState, type ReactNode } from "react";
import type { User, LoginData } from "../types/auth";
import { loginUser } from "../services/authService";
import { AuthContext } from "./AuthContext";
export interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const logout = () => {
    setUser(null);
    setToken(null);
    setLoading(false);
    localStorage.removeItem("token");
  };

  const login = async (data: LoginData): Promise<void> => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
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
