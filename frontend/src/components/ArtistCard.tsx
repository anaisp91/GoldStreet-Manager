import { Link } from "react-router-dom";
export type ArtistCardProps = {
  name: string;
};

export const ArtistCard = ({ name }: ArtistCardProps) => {
  return (
    <li className="bg-gray-900 border  rounded-lg p-4 mb-4">
      <Link to={"/artistView"}>
        <div className="flex justify-between text-white py-3 px-2">
          <div className="flex gap-4">
            <svg
              className="w-7 h-7 text-blue-600"
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
            <p className="text-2xl text-white">{name}</p>
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
      </Link>
    </li>
  );
};
