import { useEffect, useState } from "react";
import { MediaSet, SetsSummary } from "../components";
import { useParams } from "react-router-dom";
import type { Artist, MediaSetManagerSummary } from "../types";
import { getArtistById } from "../services/artistService";
import { getMediaByArtist } from "../services/mediaSetService";

export const ManagerArtistView = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loadingArtist, setLoadingArtist] = useState<boolean>(false);
  const [errorArtist, setErrorArtist] = useState<string | null>(null);
  const [mediaSets, setMediaSets] = useState<MediaSetManagerSummary[]>();
  const [loadingMedia, setLoadingMedia] = useState<boolean>(true);
  const [errorMedia, setErrorMedia] = useState<string | null>(null);

  useEffect(() => {
    const getArtist = async () => {
      setLoadingArtist(true);
      setArtist(null);
      if (!artistId) {
        setErrorArtist("Artista no encontrado");
        setLoadingArtist(false);
        return;
      }
      setErrorArtist(null);
      try {
        const artist = await getArtistById(artistId);
        console.log("Artista recibido", artist);
        if (!artist) {
          setErrorArtist("Artista no encontrado");
          return;
        }
        setArtist(artist);
      } catch {
        setErrorArtist("Error en la carga del artista");
      } finally {
        setLoadingArtist(false);
      }
    };

    getArtist();
  }, [artistId]);

  useEffect(() => {
    const fetchMediaByArtist = async () => {
      setLoadingMedia(true);
      setErrorMedia(null);
      if (!artistId) {
        setErrorMedia("Artista no disponible");
        setLoadingMedia(false);
        return;
      }
      try {
        const media = await getMediaByArtist(artistId);
        setMediaSets(media);
      } catch {
        setErrorMedia("Error al cargar los conjuntos");
      } finally {
        setLoadingMedia(false);
      }
    };
    fetchMediaByArtist();
  }, [artistId]);

  return (
    <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
      {loadingArtist && <p className="text-white text-lg">Cargando Artista</p>}
      {errorArtist && <p className="text-white text-lg">{errorArtist}</p>}
      <p className="text-gray-400 text-xl uppercase">
        Panel de gestión / Artistas
      </p>
      <div className="flex flex-row gap-6 px-4 my-3 items-center">
        <svg
          className="w-14 h-14 text-blue-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>

        <div>
          {!loadingArtist && !errorArtist && artist && (
            <h2 className="text-blue-600 text-4xl">{artist.name}</h2>
          )}
        </div>
      </div>
      <SetsSummary
        title="Conjuntos disponibles"
        total={mediaSets?.length ?? 0}
      />
      <section>
        {errorMedia && <p>{errorMedia}</p>}
        <p className="text-white text-xl font-bold">Sus conjuntos</p>
        {loadingMedia && <p>Cargando conjuntos</p>}
        {!loadingMedia && !errorMedia && mediaSets && (
          <ul>
            {mediaSets.map((media) => (
              <MediaSet
                to={`/mset/${media.id}`}
                id={media.id}
                name={media.name}
                createdAt={media.createdAt}
                photoTotal={media.photoTotal}
              />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
