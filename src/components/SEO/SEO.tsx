import { FC } from "react";

import { useTranslation } from "i18nano";

import { Helmet } from "react-helmet";

const SEO: FC = () => {
  const t = useTranslation();

  return (
    <Helmet
      htmlAttributes={{
        lang: "ru",
      }}
    >
      <meta name="description" content={t("app.description")} />
      <title>{t("app.name")}</title>
    </Helmet>
  );
};

export default SEO;
