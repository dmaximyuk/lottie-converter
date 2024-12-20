import "./Home.sass";

import { type FC } from "react";
import { useTranslation } from "i18nano";
import { useSelector } from "react-redux";
import { objectToArray } from "utils";

import { FileLoader, Files, Help, Page, ResourceCell } from "components";
import { Caption, Separator, Title, Text, Cell } from "uikit";

import { dndFilesSelector } from "store/dndFiles";

import { RouteID } from "models";

import {
  IconArrowDown,
  IconBrush,
  IconDatabaseDollar,
  IconLanguage,
} from "assets/icons";

import { LANG, THEME } from "vars";

const saveCells = ["prev", "next", "all"] as const;

const Home: FC = () => {
  const t = useTranslation();
  const { files } = useSelector(dndFilesSelector);

  const getFilesSize = (type: "compressed" | "default") => {
    const arr = objectToArray(files);

    if (arr.length < 1) return 0;

    return arr.reduce(
      (acc, curr) => acc + (curr?.processed?.data[type]?.length || 0),
      0,
    );
  };

  const getSize = () => {
    const next = getFilesSize("compressed");
    const prev = getFilesSize("default");

    return {
      next,
      prev,
      all: prev - next,
    };
  };

  return (
    <Page className="Home" containerClassName="Home_grid">
      <div className="Home__aside">
        <Help
          to={"https://github.com/dmaximyuk/zlottie"}
          title={t("home.aside.whyIs.title")}
          text={t("home.aside.whyIs.text")}
        />
      </div>
      <div className="Home__aside">
        <Help
          to={
            "https://github.com/dmaximyuk/zlottie/tree/master/src/uikit/Service/LottieWeb"
          }
          title={t("home.aside.howUse.title")}
          text={t("home.aside.howUse.text")}
        />
      </div>
      <div className="Home__aside Home__saving">
        <div className="Home__saving-wrapper">
          <div className="Home__saving-caption">
            <Title weight="1">{t("home.aside.saved.title")}</Title>
            <Text isDescription>{t("home.aside.saved.subtitle")}</Text>
          </div>

          <div className="Home_flex">
            {saveCells.map((key) => {
              const cN = { className: `Home__icon-${key}` };
              return (
                <ResourceCell
                  key={key}
                  icon={
                    key === "all" ? (
                      <IconDatabaseDollar {...cN} />
                    ) : (
                      <IconArrowDown {...cN} />
                    )
                  }
                  size={getSize()[key]}
                  title={t(`home.aside.saved.${key}`)}
                />
              );
            })}
          </div>
        </div>
        <div className="Home_flex">
          <Cell
            onClick={() => {}}
            icon={<IconBrush />}
            title={t(`app.theme.title`)}
            text={t(`app.theme.${THEME}`)}
          />
          <Cell
            onClick={() => {}}
            icon={<IconLanguage />}
            title={t(`app.language.title`)}
            text={t(`app.language.${LANG}`)}
          />
        </div>
      </div>
      <div className="Home__content">
        <FileLoader />
        <div className="Home__warning">
          <Caption weight="2" isDescription>
            {t(`home.dnd.support.before`)}
          </Caption>
          <Caption weight="2" isDescription>
            {t(`home.dnd.support.after`)}
          </Caption>
        </div>
        <Separator />
        <Files />
      </div>
    </Page>
  );
};

export default Home;
