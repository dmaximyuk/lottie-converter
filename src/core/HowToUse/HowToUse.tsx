import "./HowToUse.sass";

import { type FC } from "react";
import { useTranslation } from "i18nano";

import { Page } from "components";

interface HowToUseProps {}

const HowToUse: FC<HowToUseProps> = () => {
  return <Page>How to use</Page>;
};

export default HowToUse;
