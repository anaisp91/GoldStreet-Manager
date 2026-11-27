import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MediaSetDetail } from "../types";
import { getMediaByID } from "../services/mediaSetService";
export const ManagerSetView = () => {
  const { id } = useParams();
  const [mediaSet, setMediaSet] = useState<MediaSetDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediaSet = async () => {
      setMediaSet(undefined);
      setError(null);
      setLoading(true);
      if (!id) {
        setError("Id no disponible");
        setLoading(false);
        return;
      }
      try {
        const media = await getMediaByID(id);
        setMediaSet(media);
      } catch {
        setError("Error al cargar el conjunto");
      } finally {
        setLoading(false);
      }
    };
    fetchMediaSet();
  }, [id]);

  return (
    <>
      {loading && <p>Cargando conjunto</p>}
      {error && <p>{error}</p>}
      {!loading && !error && mediaSet && (
        <>
          <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
            <p className="text-gray-400 uppercase text-lg">Panel de gestión</p>
            <h2 className="text-white text-4xl uppercase tracking-wider">
              Conjunto <span className="text-blue-600">{mediaSet.name}</span>
            </h2>
            <p className="text-gray-400 text-xl pb-5">
              Creado el {mediaSet.createdAt}
            </p>
            {mediaSet.description && (
              <div className="bg-gray-900 rounded-lg py-5 px-4 flex flex-col gap-3 mb-5">
                <p className="text-white uppercase w-full ">Descripción:</p>
                <p className="text-gray-400 text-lg w-full">
                  {mediaSet.description}
                </p>
              </div>
            )}

            <button className="flex flex-col gap-3 bg-blue-600  w-full border rounded-lg py-5 px-10 items-center justify-center hover:bg-transparent active:bg-transparent active:border-blue-600 hover:border-blue-600 transition-colors duration-300">
              <div className="flex flex-row gap-2">
                <svg
                  className="w-7 h-7 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
                  />
                </svg>

                <p className="text-white text-xl font-bold">
                  Descargar conjunto
                </p>
              </div>

              <p className="text-white text-lg">
                Descargar todas las fotografías
              </p>
            </button>
            <section className="py-10">
              <p className="text-white text-2xl font-bold">Fotografías</p>
              <ul className="text-white text-lg font-bold grid grid-cols-1 gap-4 py-8 ">
                {mediaSet.files.map((file) => (
                  <li>
                    <div className="w-full aspect-square rounded-lg bg-gray-900 ">
                      <img
                        src={file.url}
                        alt="fotografia del conjunto"
                        className="w-full aspect-square object-contain"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <Link
              to={`/artistView/${mediaSet.artistId}`}
              className="flex flex-row gap-2 justify-center py-2"
            >
              <svg
                className="w-7 h-7 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>

              <p className="text-gray-400 text-lg">Volver a los conjuntos</p>
            </Link>
          </section>
        </>
      )}
    </>
  );
};
