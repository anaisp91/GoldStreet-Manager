import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { registerUser, type RegisterData } from "../services/authService";

export const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerUser(formData);
      setOk(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        setError(error.response?.data?.message ?? "Error al registrarse");
      } else {
        setError("Ha ocurrido un error durante el registro");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-black py-4 text-blue-600 flex flex-row px-10  items-center">
        <p className="text-blue-600 uppercase tracking-widest text-2xl">
          [NOMBRE]
        </p>
      </header>
      <main className="min-h-screen bg-black text-gray-400 flex flex-col py-20 items-center">
        <h1 className="pb-10 text-5xl text-white uppercase tracking-wider font-bold">
          Registro
        </h1>
        <p className="px-10 text-center">
          <span className="text-blue-600 ">
            ¿Gestionas un estudio de tatuajes?{" "}
          </span>
          Regístrate para centralizar las fotografías de tu equipo.
        </p>
        <form
          className="w-full max-w-sm px-6 flex flex-col gap-5 my-8 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
            />
          </div>
          <button
            type="submit"
            disabled={loading || ok}
            className="bg-blue-600 py-3 text-white uppercase rounded-md mt-4 border border-transparent hover:bg-transparent active:bg-transparent  hover:border-blue-600 active:border-blue-600 active:scale-95 transition-colors duration-300"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
          {error && <p>{error}</p>}
          {ok && <p>Registro completado correctamente, redirigiendo</p>}
        </form>

        <div className="mt-4 text-center">
          <p className="text-base">¿Ya tienes cuenta?</p>
          <Link
            to="/login"
            className="text-blue-600 text-base hover:text-white"
          >
            Login
          </Link>
        </div>
      </main>
    </>
  );
};
