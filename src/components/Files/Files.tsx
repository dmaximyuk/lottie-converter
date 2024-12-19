import "./Files.sass";

import { type FC } from "react";
import { useSelector } from "react-redux";
import { objectToArray } from "utils";
import { useTranslation } from "i18nano";

import { FilePreview } from "components";
import { Placeholder } from "uikit";

import { dndFilesSelector } from "store/dndFiles";

import { IconFile } from "assets/icons";

const Files: FC = () => {
  const t = useTranslation();
  const { files } = useSelector(dndFilesSelector);

  const filesWithArray = () => {
    return objectToArray(files);
  };

  if (filesWithArray().length < 1) {
    return (
      <div className="Files">
        <Placeholder
          icon={<IconFile />}
          title={t("home.files.empty.title")}
          subtitle={t("home.files.empty.text")}
          disabled
        />
      </div>
    );
  }

  return (
    <div className="Files">
      {filesWithArray()
        .reverse()
        .map((item) => {
          return <FilePreview key={item.id} file={item} />;
        })}
    </div>
  );
};

export default Files;
