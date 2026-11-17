import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const ArtistLayout = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Contexto no disponible");
  }

  const { user } = context;
  const role = user?.role;

  return role !== "artist" ? <Navigate to={"/mdash"} /> : <Outlet />;
};
