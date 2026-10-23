import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Mdashboard, Register } from "../pages";
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
    ],
  },
]);
