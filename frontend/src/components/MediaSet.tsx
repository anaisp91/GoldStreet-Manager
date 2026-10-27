export type MediaSetProps = {
  name: string;
  createdAt: string;
  photoTotal: number;
};

export const MediaSet = ({ name, createdAt, photoTotal }: MediaSetProps) => {
  return (
    <li className="bg-gray-900 py-4 my-4 border rounded-lg">
      <div className="flex flex-row justify-between items-center px-7">
        <div className="flex flex-row items-center gap-6">
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
          <div className="flex flex-col ">
            <p className="font-bold text-lg text-white uppercase">{name}</p>
            <p className="text-gray-400">{createdAt}</p>
            <p className="text-gray-400">{photoTotal} fotografías</p>
          </div>
        </div>

        <svg
          className="w-7 h-7 text-gray-800 dark:text-white"
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
            d="m10 16 4-4-4-4"
          />
        </svg>
      </div>
    </li>
  );
};
