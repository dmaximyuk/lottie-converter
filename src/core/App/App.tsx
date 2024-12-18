import "./App.sass";

import { type FC } from "react";

import { Outlet } from "react-router-dom";
import { Header, SEO } from "components";

const App: FC = () => {
  return (
    <>
      <SEO />
      <Header />
      <Outlet />
    </>
  );
};

export default App;
