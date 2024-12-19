import { type FC } from "react";

import { useTranslation } from "i18nano";

import { Helmet } from "react-helmet";

import { LANG, THEME } from "vars";

const SEO: FC = () => {
  const t = useTranslation();

  return (
    <Helmet
      htmlAttributes={{
        lang: LANG,
      }}
    >
      <meta name="description" content={t("app.description")} />
      <body data-theme={THEME} />
    </Helmet>
  );
};

export default SEO;
