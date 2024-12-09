import { type FC } from "react";
import { useTranslation } from "i18nano";

import { Container, Typography } from "uikit";
import { Helmet } from "react-helmet";

import type { HeaderProps } from "./Header.interface";

export const Header: FC<HeaderProps> = () => {
  const t = useTranslation();

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "ru",
        }}
      >
        <meta name="description" content={t("app.description")} />
        <title>{t("app.name")}</title>
      </Helmet>
      <Container.Outer tagName="header">
        <Container.Inner>
          <Typography tagName="h1" isBold>
            Header
          </Typography>
        </Container.Inner>
      </Container.Outer>
    </>
  );
};
