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
import { PublicLayout } from "../layouts/PublicLayout";
import { PrivateLayout } from "../layouts/PrivateLayout";

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
        path: "/mdash",
        element: <Mdashboard />,
      },
      {
        path: "/add",
        element: <ArtistRegister />,
      },
      {
        path: "/adash",
        element: <ArtistDashboard />,
      },
      {
        path: "/artistView",
        element: <ManagerArtistView />,
      },
      {
        path: "/mset",
        element: <ManagerSetView />,
      },
      {
        path: "/aset",
        element: <ArtistSetView />,
      },
    ],
  },
]);
