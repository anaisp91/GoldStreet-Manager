import { api } from "./api";
import type { MediaSetSummary, MediaSetDetail } from "../types";

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

export const getMediaByID = async (id: string): Promise<MediaSetDetail> => {
  const response = await api.get<MediaSetDetail>(`/media-set/${id}`);
  return response.data;
};

export const deleteMedia = async (id: string): Promise<void> => {
  await api.delete(`/media-set/${id}`);
  return;
};
