import { type FC } from "react";

import { LANG } from "vars";
import { useTranslation } from "i18nano";

import { Helmet } from "react-helmet";

const SEO: FC = () => {
  const t = useTranslation();

  return (
    <Helmet
      htmlAttributes={{
        lang: LANG,
      }}
    >
      <meta name="description" content={t("app.description")} />
    </Helmet>
  );
};

export default SEO;
