import { api } from "./api";

export const createMediaSet = async (body: FormData) => {
  const response = await api.post("/media-set", body);
  return response.data;
};
