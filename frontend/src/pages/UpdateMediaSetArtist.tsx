export const UpdateMediaSetArtist = () => {
  return (
    <section className="bg-black min-h-screen py-14 px-10 flex flex-col gap-3">
      <p className="text-gray-400 uppercase text-lg">Panel de edición</p>
      <h2 className="text-blue-600 text-5xl uppercase pt-5 tracking-wider font-extrabold">
        Nombre media
      </h2>
      <form className="w-full max-w-sm px-6 flex flex-col gap-5 my-8">
        <div className="flex flex-col gap-2 text-white">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          />
        </div>
        <div className="flex flex-col gap-2 text-white">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          />
        </div>
      </form>
    </section>
  );
};
