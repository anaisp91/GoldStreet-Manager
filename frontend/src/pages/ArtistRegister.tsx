import type { RegisterData } from "../types/auth";
import { useState } from "react";
import { createArtist } from "../services/artistService";
import { useNavigate } from "react-router-dom";

export const ArtistRegister = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createArtist(formData);

      navigate("/mdash");
    } catch {
      setError("Error en la creación del Artista");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-black min-h-screen flex flex-col items-center py-14 px-10">
      <h2 className="text-white uppercase text-5xl self-start tracking-wider">
        Registro
        <br />
        de <span className="text-blue-600  tracking-wide">Artista</span>
      </h2>
      <form
        className="flex flex-col w-full py-10 gap-5 max-w-sm my-8 text-gray-400"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            required
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 py-3 rounded-md text-white uppercase mt-4 border border-transparent hover:bg-transparent active:bg-transparent  hover:border-blue-600 active:border-blue-600 active:scale-95 transition-colors duration-300"
        >
          {!loading ? "Registrar" : "Creando Artista"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};
