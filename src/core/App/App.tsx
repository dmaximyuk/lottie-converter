import "./App.sass";

import { type FC } from "react";

import { Outlet } from "react-router-dom";
import { Header } from "components";

export const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
