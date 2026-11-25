export interface MediaSetSummary {
  id: string;
  name: string;
  createdAt: string;
  photoTotal: number;
}

export interface MediaSetManagerSummary {
  id: string;
  name: string;
  used: boolean;
  createdAt: string;
  photoTotal: number;
}

export interface MediaSetDetail {
  id: string;
  name: string;
  artistId: string;
  used: boolean;
  createdAt: string;
  updatedAt: string;
  description?: string;
  files: MediaFile[];
}

interface MediaFile {
  url: string;
  publicId: string;
}

export interface UpdateMediaSetArtist {
  name?: string;
  description?: string;
}

export interface UpdateMediaSetManager {
  used?: boolean;
}
