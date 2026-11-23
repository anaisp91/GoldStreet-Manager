import { api } from "./api";
import type { MediaSetSummary } from "../types";

export const createMediaSet = async (
  body: FormData,
): Promise<MediaSetSummary> => {
  const response = await api.post<MediaSetSummary>("/media-set", body);
  return response.data;
};

export const getAllMediaSets = async (): Promise<MediaSetSummary[]> => {
  const response = await api.get<MediaSetSummary[]>("/media-set");
  return response.data;
};

export const getMediaByID = async (id: string) => {
  const response = await api.get(`/media-set/${id}`);
  return response.data;
};
