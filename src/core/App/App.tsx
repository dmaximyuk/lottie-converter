import "./App.sass";

import { type FC } from "react";

import { Outlet } from "react-router-dom";
import { Header } from "components";

const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
