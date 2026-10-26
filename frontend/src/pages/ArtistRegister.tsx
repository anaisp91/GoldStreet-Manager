export const ArtistRegister = () => {
  return (
    <section className="bg-black min-h-screen flex flex-col items-center py-14 px-10">
      <h2 className="text-white uppercase text-5xl self-start tracking-wider">
        Registro
        <br />
        de <span className="text-blue-600  tracking-wide">Artista</span>
      </h2>
      <form className="flex flex-col w-full py-10 gap-5 max-w-sm my-8 text-gray-400">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
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
          className="bg-blue-600 py-3 rounded-md text-white uppercase mt-4 border border-transparent hover:bg-transparent active:bg-transparent  hover:border-blue-600 active:border-blue-600 active:scale-95 transition-colors duration-300"
        >
          Registrar
        </button>
      </form>
    </section>
  );
};
