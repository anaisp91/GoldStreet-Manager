import { Outlet } from "react-router-dom";
import { PrivateHeader } from "../components";

export const PrivateLayout = () => {
  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
};
