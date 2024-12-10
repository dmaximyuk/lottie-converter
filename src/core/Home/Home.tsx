import "./Home.sass";

import { type AllHTMLAttributes, type FC } from "react";
import { useTranslation } from "i18nano";

import { FileLoader, Page } from "components";

export interface HomeProps extends AllHTMLAttributes<HTMLElement> {}

export const Home: FC<HomeProps> = () => {
  const t = useTranslation();

  return (
    <Page>
      <FileLoader />
    </Page>
  );
};
