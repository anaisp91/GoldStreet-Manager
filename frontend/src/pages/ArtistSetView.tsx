import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { MediaSetDetail } from "../types";
import { getMediaByID, deleteMedia } from "../services/mediaSetService";

export const ArtistSetView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mediaSet, setMediaSet] = useState<MediaSetDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  useEffect(() => {
    const fetchMediaSet = async () => {
      setLoading(true);
      setError(null);
      if (!id) {
        setError("Id no encontrado");
        setLoading(false);
        return;
      }
      try {
        const mediaSet = await getMediaByID(id);
        setMediaSet(mediaSet);
      } catch {
        setError("Error al cargar el conjunto");
      } finally {
        setLoading(false);
      }
    };
    fetchMediaSet();
  }, [id]);

  const deleteMediaSet = async () => {
    setError(null);
    setDeleting(true);
    if (!id) {
      setError("Id no encontrado");
      setDeleting(false);
      return;
    }
    try {
      await deleteMedia(id);
      navigate("/adash");
    } catch {
      setError("Error en la eliminacion del conjunto");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {loading && <p>Procesando la petición</p>}
      {error && <p>{error}</p>}

      {!loading && !error && mediaSet && (
        <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
          <p className="text-gray-400 uppercase text-lg">Panel de gestión</p>
          <h2 className="text-white text-4xl uppercase tracking-wider">
            Conjunto <span className="text-blue-600">{mediaSet?.name}</span>
          </h2>
          <p className="text-gray-400 text-xl">
            Creado el {mediaSet?.createdAt}
          </p>
          <div className="flex flex-row gap-5 border border-gray-700 rounded-md bg-gray-900 py-3 px-7 my-4 items-center">
            <svg
              className="w-9 h-9 text-blue-600"
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
                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <div>
              <p className="text-gray-400 text-lg uppercase">Fotografías</p>
              <p className="text-white text-xl">
                {mediaSet?.files.length} Imagenes
              </p>
            </div>
          </div>

          <section className="py-6">
            <p className="text-white text-2xl font-bold">Fotografías</p>
            <ul className="text-white text-lg font-bold grid grid-cols-2 gap-4 py-8 ">
              {mediaSet.files.map((file) => (
                <li key={file.publicId}>
                  <div className="w-full aspect-square rounded-lg bg-gray-900">
                    <img src={file.url} alt="fotografia del conjunto" />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <button
            className="flex flex-col gap-3 bg-transparent  w-full border border-red-500 rounded-lg py-5 px-10 items-center justify-center hover:bg-red-500 active:bg-red-500 group"
            onClick={deleteMediaSet}
            disabled={deleting}
          >
            <div className="flex flex-row gap-2">
              <svg
                className="w-6 h-6 text-red-500 group-hover:text-white group-active:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-red-500 text-xl font-bold group-hover:text-white group-active:text-white">
                {deleting ? "Eliminando conjunto" : "Eliminar conjunto"}
              </p>
            </div>
          </button>
          <Link
            to={"/adash"}
            className="flex flex-row gap-2 justify-center py-5"
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

            <p className="text-gray-400 text-xl">Volver a mis conjuntos</p>
          </Link>
        </section>
      )}
    </>
  );
};
