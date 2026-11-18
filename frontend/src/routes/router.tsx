import { createBrowserRouter } from "react-router-dom";
import {
  ArtistDashboard,
  ArtistRegister,
  ArtistSetView,
  Home,
  Login,
  ManagerArtistView,
  ManagerSetView,
  Mdashboard,
  Register,
} from "../pages";
import {
  PublicLayout,
  PrivateLayout,
  ManagerLayout,
  ArtistLayout,
} from "../layouts";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        element: <ManagerLayout />,
        children: [
          {
            path: "/mdash",
            element: <Mdashboard />,
          },
          {
            path: "/add",
            element: <ArtistRegister />,
          },
          {
            path: "/artistView/:artistId",
            element: <ManagerArtistView />,
          },
          {
            path: "/mset",
            element: <ManagerSetView />,
          },
        ],
      },
      {
        element: <ArtistLayout />,
        children: [
          {
            path: "/adash",
            element: <ArtistDashboard />,
          },
          {
            path: "/aset",
            element: <ArtistSetView />,
          },
        ],
      },
    ],
  },
]);
