export const CreateMediaSet = () => {
  return (
    <section className="bg-black min-h-screen flex flex-col items-center py-14 px-10">
      <h2 className="text-white uppercase text-5xl self-start tracking-wider">
        <span className="text-blue-600 tracking-wide">Crea</span> tu conjunto
      </h2>

      <form className="flex flex-col w-full py-7 gap-5 max-w-sm my-8 text-gray-400">
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
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows={6}
            cols={8}
            placeholder=" Añade info extra para el manager..."
            className="w-full border border-gray-600 bg-black rounded-md px-4 py-3 text-white "
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="file">Añade tus fotografías</label>
          <input
            type="file"
            id="file"
            accept="image/jpeg, image/png"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-3 rounded-md text-white uppercase mt-4 border border-transparent hover:bg-transparent active:bg-transparent  hover:border-blue-600 active:border-blue-600 active:scale-95 transition-colors duration-300"
        >
          Crear
        </button>
      </form>
    </section>
  );
};
