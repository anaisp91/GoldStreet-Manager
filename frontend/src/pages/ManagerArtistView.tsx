import { useEffect, useState } from "react";
import { MediaSet, SetsSummary } from "../components";
import { useParams } from "react-router-dom";
import type { Artist } from "../types/auth";
import { getArtistById } from "../services/artistService";

export const ManagerArtistView = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArtist = async () => {
      setLoading(true);
      setArtist(null);
      if (!artistId) {
        setError("Artista no encontrado");
        setLoading(false);
        return;
      }
      setError(null);
      try {
        const artist = await getArtistById(artistId);
        console.log("Artista recibido", artist);
        if (!artist) {
          setError("Artista no encontrado");
          return;
        }
        setArtist(artist);
      } catch {
        setError("Error en la carga del artista");
      } finally {
        setLoading(false);
      }
    };

    getArtist();
  }, [artistId]);

  return (
    <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
      {loading && <p className="text-white text-lg">Cargando Artista</p>}
      {error && <p className="text-white text-lg">{error}</p>}
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
          {!loading && !error && artist && (
            <h2 className="text-blue-600 text-4xl">{artist.name}</h2>
          )}

          {artistId && <p>{artistId}</p>}
          <p className="text-gray-400 text-lg">Artista del estudio</p>
        </div>
      </div>
      <SetsSummary title="Conjuntos disponibles" total={2} />
      <section>
        <p className="text-white text-xl font-bold">Sus conjuntos</p>
        <ul>
          <MediaSet name={"Flores"} createdAt={"20/10/26"} photoTotal={4} />
        </ul>
      </section>
    </section>
  );
};
