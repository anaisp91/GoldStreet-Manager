import { Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export const ManagerLayout = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context no disponible");
  }

  const { user } = context;
  const role = user?.role;

  return role !== "manager" ? <Navigate to={"/adash"} /> : <Outlet />;
};
