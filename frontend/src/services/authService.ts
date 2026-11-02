import { api } from "./api";
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "artist" | "manager";
}

export const registerUser = async (body: RegisterData): Promise<User> => {
  const response = await api.post<User>("/auth/register", body);
  return response.data;
};

export const loginUser = async (body: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", body);
  return response.data;
};
