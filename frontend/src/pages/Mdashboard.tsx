import { ArtistCard } from "../components";
export const Mdashboard = () => {
  const artists = [
    { id: 1, name: "Anaïs" },
    { id: 2, name: "Aza" },
    { id: 3, name: "Irene" },
    { id: 4, name: "Borja" },
  ];
  return (
    <section className="bg-black flex flex-col gap-3 min-h-screen py-14 px-10">
      <p className="text-gray-400 text-xl">Panel de gestión</p>
      <h2 className="text-white text-5xl uppercase font-bold tracking-wider ">
        Tu Equipo
      </h2>
      <h3 className="text-white text-2xl p-4 tracking-wide">Artistas</h3>
      <ul>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} name={artist.name} />
        ))}
      </ul>
    </section>
  );
};
