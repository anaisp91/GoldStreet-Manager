import { Link } from "react-router-dom";
import { MediaSet, SetsSummary } from "../components";
export const ArtistDashboard = () => {
  const mediaSets = [
    { id: 1, name: "Flores", createdAt: "20/8/2026", photoTotal: 6 },
    { id: 2, name: "Dragón", createdAt: "21/7/2026", photoTotal: 2 },
    { id: 3, name: "Mujer", createdAt: "8/6/2026", photoTotal: 4 },
    { id: 4, name: "Medusa", createdAt: "18/5/2026", photoTotal: 1 },
  ];
  return (
    <section className="bg-black min-h-screen flex flex-col gap-3 py-14 px-10">
      <p className="text-gray-500 text-xl">Espacio del artista</p>
      <h2 className="text-white uppercase text-5xl tracking-wider p-1">
        Hola, <span className="text-blue-600">[nombre]</span>
      </h2>
      <p className=" text-gray-500 text-lg">
        Organiza tu conjuntos y ten tus fotografías listas para compartir.
      </p>

      <SetsSummary total={mediaSets.length} title="Tus conjuntos" />

      <Link
        to={""}
        className="bg-blue-600 w-full max-w-sm py-3 text-center text-white rounded-md text-lg mt-2"
      >
        Crear conjunto
      </Link>
      <section className="py-7">
        <p className="text-white text-xl font-bold tracking-wide">
          Mis conjuntos
        </p>
        <div>
          <ul>
            {mediaSets.map((item) => (
              <MediaSet
                key={item.id}
                name={item.name}
                createdAt={item.createdAt}
                photoTotal={item.photoTotal}
              />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};
