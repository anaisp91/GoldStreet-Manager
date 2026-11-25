import { useEffect, useState } from "react";
import {
  getMediaByID,
  updateMediaSetArtist,
} from "../services/mediaSetService";
import { useParams, useNavigate } from "react-router-dom";
import type { UpdateMediaSetArtist, MediaSetDetail } from "../types/mediaSet";

export const UpdateMediaArtist = () => {
  const { id } = useParams();
  const [mediaSet, setMediaSet] = useState<MediaSetDetail>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateMediaSetArtist>({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchMedia = async () => {
      setError(null);
      setLoading(true);
      if (!id) {
        setError("Id no encontrado");
        setLoading(false);
        return;
      }
      try {
        const media = await getMediaByID(id);
        setMediaSet(media);
        setFormData({ name: media.name, description: media.description ?? "" });
      } catch {
        setError("Error al cargar el conjunto");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [id]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setUpdating(true);
    if (!id) {
      setError("Id no encontrado");
      setUpdating(false);
      return;
    }
    try {
      await updateMediaSetArtist(id, formData);
      navigate(`/aset/${id}`);
    } catch {
      setError("Error al actualizar el conjunto");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Cargando conjunto</p>
      ) : (
        <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
          <p className="text-gray-400 uppercase text-lg">Panel de edición</p>
          <h2 className="text-blue-600 text-5xl uppercase pt-5 tracking-wider font-extrabold">
            {mediaSet?.name}
          </h2>
          <form
            className="w-full max-w-sm px-6 flex flex-col gap-5 my-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 text-white">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
              />
            </div>
            <div className="flex flex-col gap-2 text-white">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
              />
            </div>
            <button
              className="text-gray-500 text-xl font-bold group-hover:text-black active:text-black"
              type="submit"
              disabled={updating}
            >
              {updating ? "Guardando cambios..." : "Modificar"}
            </button>
          </form>
        </section>
      )}
    </>
  );
};
