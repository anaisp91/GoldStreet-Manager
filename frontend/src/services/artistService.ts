import { api } from "./api";

export const getArtists = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getArtistById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
