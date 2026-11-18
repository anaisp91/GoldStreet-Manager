import { api } from "./api";

export const getArtists = async () => {
  const response = await api.get("/users");
  return response.data;
};
