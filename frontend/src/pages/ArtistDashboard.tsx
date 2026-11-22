import { Link } from "react-router-dom";
import { MediaSet, SetsSummary } from "../components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { MediaSetSummary } from "../types/auth";
import { getAllMediaSets } from "../services/mediaSetService";

export const ArtistDashboard = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context no disponible");
  }

  const { user } = context;

  const [mediaSets, setMediaSets] = useState<MediaSetSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMediaSets = async () => {
      setError(null);
      setLoading(true);

      try {
        const medias = await getAllMediaSets();
        setMediaSets(medias);
      } catch {
        setError("Error al cargar los conjuntos");
      } finally {
        setLoading(false);
      }
    };

    getMediaSets();
  }, [user]);

  return (
    <section className="bg-black min-h-screen flex flex-col gap-3 py-14 px-10">
      <p className="text-gray-500 text-xl">Espacio del artista</p>
      <h2 className="text-white uppercase text-5xl tracking-wider p-1">
        Hola, <span className="text-blue-600">{user?.name}</span>
      </h2>
      <p className=" text-gray-500 text-lg">
        Organiza tu conjuntos y ten tus fotografías listas para compartir.
      </p>
      {loading && <p>Cargando conjuntos</p>}
      {error && <p>{error}</p>}
      {!loading && !error && mediaSets?.length === 0 && (
        <p>Crea tu primer conjunto</p>
      )}
      {!loading && !error && mediaSets && mediaSets.length > 0 && (
        <SetsSummary total={mediaSets.length} title="Tus conjuntos" />
      )}

      <Link
        to={"/create"}
        className="bg-blue-600 w-full max-w-sm py-3 text-center text-white rounded-md text-lg mt-2"
      >
        Crear conjunto
      </Link>
      <section className="py-7">
        <p className="text-white text-xl font-bold tracking-wide">
          Mis conjuntos
        </p>
        <div>
          <ul>
            {mediaSets?.map((item) => (
              <MediaSet
                key={item.id}
                name={item.name}
                id={item.id}
                createdAt={item.createdAt}
                photoTotal={item.photoTotal}
              />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};
