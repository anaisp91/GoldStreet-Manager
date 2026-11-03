import { api } from "./api";
import type {
  RegisterData,
  User,
  AuthResponse,
  LoginData,
} from "../types/auth";

export const registerUser = async (body: RegisterData): Promise<User> => {
  const response = await api.post<User>("/auth/register", body);
  return response.data;
};

export const loginUser = async (body: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", body);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};
