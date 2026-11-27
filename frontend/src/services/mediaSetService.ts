import { api } from "./api";

import type {
  MediaSetSummary,
  MediaSetDetail,
  UpdateMediaSetArtist,
  MediaSetManagerSummary,
  UpdateMediaSetManager,
} from "../types";

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

export const updateMediaSetArtist = async (
  id: string,
  body: UpdateMediaSetArtist,
): Promise<MediaSetDetail> => {
  const response = await api.put<MediaSetDetail>(`/media-set/${id}`, body);
  return response.data;
};

export const updateMediaSetManager = async (
  id: string,
  body: UpdateMediaSetManager,
): Promise<MediaSetDetail> => {
  const response = await api.put<MediaSetDetail>(`/media-set/${id}`, body);
  return response.data;
};

export const getMediaByArtist = async (
  artistId: string,
): Promise<MediaSetManagerSummary[]> => {
  const response = await api.get<MediaSetManagerSummary[]>(
    `/media-set/artist/${artistId}`,
  );
  return response.data;
};
