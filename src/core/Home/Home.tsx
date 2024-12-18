import "./Home.sass";

import { type FC } from "react";

import { FileLoader, Page } from "components";

const Home: FC = () => {
  return (
    <Page containerClassName="Home_flex">
      <FileLoader />
    </Page>
  );
};

export default Home;
