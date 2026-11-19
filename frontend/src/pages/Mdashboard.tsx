import { useContext, useEffect, useState } from "react";
import { ArtistCard } from "../components";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getArtists } from "../services/artistService";
import type { Artist } from "../types/auth";

export const Mdashboard = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Contexto no disponible");
  }

  const { user } = context;

  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getManagerArtists = async () => {
    setLoading(true);
    setError(null);

    try {
      const artists = await getArtists();
      console.log("Artistas Recibidos", artists);
      setArtists(artists);
    } catch {
      setError("Error al obtener los artistas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      await getManagerArtists();
    };
    fetchArtists();
  }, [user]);

  return (
    <section className="bg-black flex flex-col gap-3 min-h-screen py-14 px-10">
      {loading && <p>Cargando artistas</p>}
      {error && <p>{error}</p>}
      <p className="text-gray-400 text-xl">Panel de gestión</p>
      <p className="text-white text-2xl">Hola, {user?.name}</p>
      <h2 className="text-white text-5xl uppercase font-bold tracking-wider p-1">
        Tu Equipo
      </h2>

      <Link
        to="/add"
        className="text-center bg-blue-600 py-2 rounded-md text-white text-lg"
      >
        Añadir Artista
      </Link>

      <h3 className="text-white text-2xl p-4 tracking-wide">Artistas</h3>
      {!loading && !error && artists.length === 0 && (
        <p className="text-gray-400 text-lg text-center py-4">
          Aún no tienes artistas,
          <br /> añadelos pinchando el botón de arriba
        </p>
      )}

      <ul>
        {!loading &&
          !error &&
          artists.length > 0 &&
          artists.map((artist) => (
            <ArtistCard key={artist.id} name={artist.name} id={artist.id} />
          ))}
      </ul>
    </section>
  );
};
