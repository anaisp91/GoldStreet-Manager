import { Link } from "react-router-dom";
export const ManagerSetView = () => {
  return (
    <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
      <p className="text-gray-400 uppercase text-lg">
        Panel de gestión / [Nombre Artista]
      </p>
      <h2 className="text-white text-4xl uppercase tracking-wider">
        Conjunto <span className="text-blue-600">[Nombre]</span>
      </h2>
      <p className="text-gray-400 text-xl">Creado el [fecha de creado]</p>
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
          <p className="text-white text-xl">[numero] Imagenes</p>
        </div>
      </div>

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

          <p className="text-white text-xl font-bold">Descargar conjunto</p>
        </div>

        <p className="text-white text-lg">Descargar todas las fotografías</p>
      </button>
      <section className="py-6">
        <p className="text-white text-2xl font-bold">Fotografías</p>
        <ul className="text-white text-lg font-bold grid grid-cols-2 gap-4 py-8 ">
          <li>
            <div className="w-full aspect-square rounded-lg bg-gray-900"></div>
          </li>
          <li>
            <div className="w-full aspect-square rounded-lg bg-gray-900"></div>
          </li>
          <li>
            <div className="w-full aspect-square rounded-lg bg-gray-900"></div>
          </li>
          <li>
            <div className="w-full aspect-square rounded-lg bg-gray-900"></div>
          </li>
          <li>
            <div className="w-full aspect-square rounded-lg bg-gray-900"></div>
          </li>
        </ul>
      </section>
      <Link
        to={"/artistView"}
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

        <p className="text-gray-400 text-lg">
          Volver a los conjuntos de [Nombre]
        </p>
      </Link>
    </section>
  );
};
