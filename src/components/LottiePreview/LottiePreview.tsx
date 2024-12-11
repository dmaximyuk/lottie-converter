import { useSelector } from "react-redux";
import "./LottiePreview.sass";

import { type AllHTMLAttributes, type FC } from "react";
import { dndFilesSelector } from "store/dndFiles";
import { LottieWeb } from "uikit";
import { downloadFile } from "utils";

interface LottiePreviewProps extends AllHTMLAttributes<HTMLElement> {}

const LottiePreview: FC<LottiePreviewProps> = () => {
  const { isProcessing, files, parsedFiles } = useSelector(dndFilesSelector);
  return (
    <div>
      {parsedFiles.map((f) => {
        return (
          <div key={`lottie-preview-item-${f.file.name}`}>
            {/* <LottieWeb animationData={} /> */}
            {`${(f.file.prevSize / 1024).toFixed(1)} KB`}
            {`${(f.file.newSize / 1024).toFixed(1)} KB`}
            <div
              onClick={() => downloadFile(f.data.compressed, "test", "zlottie")}
            >
              download btn
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LottiePreview;
