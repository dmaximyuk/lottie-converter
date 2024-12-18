import "./HowToUse.sass";

import { type FC } from "react";
import { useTranslation } from "i18nano";

import { Page } from "components";
import { Text, Title, Caption } from "uikit";

interface HowToUseProps {}

const HowToUse: FC<HowToUseProps> = () => {
  const t = useTranslation();

  return (
    <Page className="HowToUse" containerClassName="HowToUse__container">
      <Title weight="1" Component="h1">
        {t("howToUse.title")}
      </Title>
      <a
        href="https://github.com/dmaximyuk/zloottie/blob/master/src/uikit/Service/LottieWeb/LottieWeb.tsx"
        target="_blank"
      >
        <Caption>{t("howToUse.openInGitHub")}</Caption>
      </a>
      <Text>{t("howToUse.subtitle")}</Text>
      <Text>{t("howToUse.text")}</Text>
      <ol>
        {Array.from(Array(3), (_, i) => {
          return (
            <li key={`how-to-use-usages-${i}`}>
              <Text>{t(`howToUse.usages.${i}`)}</Text>
            </li>
          );
        })}
      </ol>
      <pre>
        <code>{t("howToUse.code")}</code>
      </pre>
    </Page>
  );
};

export default HowToUse;
