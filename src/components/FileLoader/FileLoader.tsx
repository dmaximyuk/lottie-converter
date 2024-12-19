import "./FileLoader.sass";

import {
  useState,
  type AllHTMLAttributes,
  type FC,
  type DragEvent,
  type ChangeEvent,
  useRef,
} from "react";
import { useDispatch } from "react-redux";

import { Placeholder, Text, Title } from "uikit";
import { Files } from "components";

import { dndFilesActions } from "store/dndFiles";

import { IconDragDrop } from "assets/icons";
import { generateUniqueId } from "utils";
import { useTranslation } from "i18nano";

interface FileLoaderProps extends AllHTMLAttributes<HTMLElement> {}

const FileLoader: FC<FileLoaderProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const d = useDispatch();
  const t = useTranslation();
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  const allowedExtensions = [".json", ".tgs"];

  const isFileAllowed = (file: File): boolean => {
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  const getFiles = (files: FileList | null): Array<File> => {
    if (!files || files.length < 1) {
      return [];
    }

    return Array.from(files).filter(isFileAllowed);
  };

  const uploadFiles = (files: Array<File>): boolean => {
    if (files.length >= 1) {
      d(
        dndFilesActions.loadFiles(
          files.map((f) => ({ id: generateUniqueId(), file: f })),
        ),
      );
    }

    return false;
  };

  const handleGetFiles = (
    event: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const dragFiles = (event as any).dataTransfer?.files;
    const selectFiles = (event?.target as any)?.files;
    const allFiles = (dragFiles || selectFiles || null) as FileList | null;

    event.preventDefault();
    setIsDraggedOver(false);

    const arrayAllFiles = getFiles(allFiles);
    if (arrayAllFiles.length >= 1) {
      uploadFiles(arrayAllFiles);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleWrapperClick = () => {
    const input = fileInputRef.current;
    if (input) {
      input.click();
    }
  };

  return (
    <div
      className="FileLoader"
      onDrop={handleGetFiles}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleWrapperClick}
      style={
        {
          "--color": isDraggedOver ? "var(--accent)" : "var(--text-secondary)",
        } as Record<string, unknown>
      }
    >
      <Placeholder
        icon={<IconDragDrop color="var(--color)" />}
        title={t("home.dnd.upload")}
        subtitle={t("home.dnd.alternative")}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={allowedExtensions.join(",")}
        style={{ display: "none" }}
        onChange={handleGetFiles}
      />
    </div>
  );
};

export default FileLoader;
