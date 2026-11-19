import type { RegisterData } from "../types/auth";
import { api } from "./api";

export const getArtists = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getArtistById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createArtist = async (body: RegisterData) => {
  const response = await api.post("/users", body);
  return response.data;
};
