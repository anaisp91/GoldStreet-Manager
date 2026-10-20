import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <header className="bg-black py-4 text-gray-400 flex flex-row justify-between px-10 items-center">
        <p className="text-blue-600 uppercase tracking-widest text-2xl">
          [NOMBRE]
        </p>
        <Link to="/login" className="hover:text-white">
          Login
        </Link>
      </header>
      <main className="bg-black min-h-screen py-20 px-16 flex flex-col items-start gap-6">
        <p className="bg-blue-600 text-black text-[0.8rem] py-1 px-2 tracking-wide uppercase">
          Diseñado para Gold Street Tattoo
        </p>
        <h1 className="text-gray-400 text-4xl uppercase tracking-wide pt-4 pb-4 font-bold leading-none">
          Tus fotografías, listas para{" "}
          <span className="text-blue-600">compartir</span>
        </h1>
        <div className="flex flex-col gap-3">
          <p className="text-gray-400">
            Organiza las fotografías de tus tatuajes en{" "}
            <span className=" text-blue-600">colecciones</span>.
          </p>
          <p className="text-gray-400">
            Centraliza el material, mejora la comunicación y olvídate de las
            interrupciones.
          </p>
          <p className="text-gray-400 text-[1rem] uppercase font-bold tracking-widest">
            Tú tatúas, el manager se encarga del resto.
          </p>
        </div>

        <div className=" flex flex-row gap-6">
          <Link
            to="/register"
            className="px-7 py-2 text-white text-[1.2rem] uppercase rounded-2xl bg-blue-600 hover:text-blue-600 hover:bg-gray-400"
          >
            Registro
          </Link>
          <Link
            to="/login"
            className="px-7 py-2 text-white text-[1.2rem] uppercase rounded-2xl bg-blue-600 hover:text-blue-600 hover:bg-gray-400"
          >
            Login
          </Link>
        </div>
      </main>
    </>
  );
};
