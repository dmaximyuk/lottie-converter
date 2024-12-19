import "./Files.sass";

import { type FC } from "react";
import { useSelector } from "react-redux";
import { objectToArray } from "utils";

import { FilePreview } from "components";

import { dndFilesSelector } from "store/dndFiles";

const Files: FC = () => {
  const { files } = useSelector(dndFilesSelector);

  const filesWithArray = () => {
    return objectToArray(files);
  };

  if (filesWithArray().length < 1) {
    return null;
  }

  return (
    <div className="Files">
      {filesWithArray().map((item) => {
        return <FilePreview key={item.id} file={item} />;
      })}
    </div>
  );
};

export default Files;
