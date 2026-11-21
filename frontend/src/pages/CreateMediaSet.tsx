import { useState } from "react";
import type { MediaSetFromData } from "../types/auth";
import { createMediaSet } from "../services/mediaSetService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateMediaSet = () => {
  const [formData, setFormData] = useState<MediaSetFromData>({
    name: "",
    description: "",
    files: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setFormData((prev) => ({ ...prev, files: filesArray }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.set("name", formData.name);
      data.set("description", formData.description);
      formData.files.forEach((file) => data.append("files", file));

      console.log("Name:", data.get("name"));
      console.log("Description:", data.get("description"));
      console.log("Files:", data.getAll("files"));
      await createMediaSet(data);

      navigate("/adash");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error al crear el conjunto");
      } else {
        setError("Ha ocurrido un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen flex flex-col items-center py-14 px-10">
      <h2 className="text-white uppercase text-5xl self-start tracking-wider">
        <span className="text-blue-600 tracking-wide">Crea</span> tu conjunto
      </h2>

      <form
        className="flex flex-col w-full py-7 gap-5 max-w-sm my-8 text-gray-400"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            cols={8}
            placeholder=" Añade info extra para el manager..."
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="file">Añade tus fotografías</label>
          <input
            type="file"
            id="file"
            onChange={handleFilesChange}
            accept="image/jpeg, image/png, image/webp"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-3 rounded-md text-white uppercase mt-4 border border-transparent hover:bg-transparent active:bg-transparent  hover:border-blue-600 active:border-blue-600 active:scale-95 transition-colors duration-300"
        >
          {loading ? "Creando MediaSet" : "Crear"}
          {error && <p>{error}</p>}
        </button>
      </form>
    </section>
  );
};
