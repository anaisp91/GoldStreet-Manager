import { Link } from "react-router-dom";

export const Register = () => {
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
        <form className="w-full max-w-sm px-6 flex flex-col gap-5 my-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
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
              className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              required
              className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 py-3 text-white uppercase rounded-md mt-4 border border-transparent hover:bg-transparent active:bg-transparent  hover:border-blue-600 active:border-blue-600 active:scale-95 transition-colors duration-300"
          >
            Crear cuenta
          </button>
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
