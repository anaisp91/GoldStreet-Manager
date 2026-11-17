import { Outlet, Navigate } from "react-router-dom";
import { PrivateHeader } from "../components";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateLayout = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext no esta disponible");
  }

  const { user, loading } = context;

  return (
    <>
      {loading ? (
        <p>Cargando Usuario</p>
      ) : !user ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <PrivateHeader />
          <Outlet />
        </>
      )}
    </>
  );
};
