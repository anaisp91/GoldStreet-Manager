import { useState } from "react";
import { Link } from "react-router-dom";

export const PrivateHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-black py-4 text-gray-400 flex flex-row justify-between px-10 items-center relative">
        <p className="text-blue-600 uppercase tracking-widest text-2xl">
          [NOMBRE]
        </p>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6 text-gray-400 hover:text-blue-600 action:text-blue-600"
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
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute top-full  bg-blue-800 text-white inset-x-0 py-10 uppercase ">
            <nav className="pl-10">
              <ul>
                <li className="text-lg pb-3">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    Inicio
                  </Link>
                </li>
                <li className="text-lg">
                  <button className="uppercase">Cerrar sesión</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
