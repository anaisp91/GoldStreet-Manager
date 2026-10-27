export type SetsSummaryProps = {
  total: number;
};

export const SetsSummary = ({ total }: SetsSummaryProps) => {
  return (
    <div className=" bg-gray-900 border rounded-lg py-4 flex flex-row gap-6 px-8 items-center my-3">
      <svg
        className="w-8 h-8 text-blue-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z"
          clipRule="evenodd"
        />
      </svg>

      <div className="flex flex-col">
        <p className="text-gray-500 uppercase text-lg">Tus conjuntos</p>
        <p className="text-white text-xl font-bold">{total} conjuntos</p>
      </div>
    </div>
  );
};
