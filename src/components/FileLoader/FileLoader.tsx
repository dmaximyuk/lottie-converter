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

import { motion } from "motion/react";
import { Flex, Text, Title } from "uikit";
import { Files } from "components";

import { dndFilesActions } from "store/dndFiles";

import { IconDragDrop } from "assets/icons";
import { generateUniqueId } from "utils";
import { useTranslation } from "i18nano";

interface FileLoaderProps extends AllHTMLAttributes<HTMLElement> {}

const FileLoader: FC<FileLoaderProps> = () => {
  const dndFileLoadingId = `dnd-file-loading-id`;
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
    <div className="FileLoader">
      <Flex
        className="FileLoader__container"
        horizontal="start"
        vertical="start"
        direction="column"
        gap={15}
      >
        <Title className="FileLoader__title" weight="1">
          {t("home.dnd.title")}
        </Title>
        <motion.div
          className="FileLoader__wrapper"
          style={
            {
              "--color": isDraggedOver
                ? "var(--accent)"
                : "var(--text-secondary)",
            } as Record<string, unknown>
          }
          onDrop={handleGetFiles}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleWrapperClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Flex
            className="FileLoader__content"
            vertical="center"
            horizontal="center"
            direction="column"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={allowedExtensions.join(",")}
              style={{ display: "none" }}
              id={dndFileLoadingId}
              onChange={handleGetFiles}
            />

            <IconDragDrop
              className="FileLoader__icon"
              width={32}
              height={32}
              color="var(--color)"
            />
            <Text className="FileLoader__dnd-text">{t("home.dnd.upload")}</Text>
            <Text className="FileLoader__dnd-text">
              {t("home.dnd.warning")}
            </Text>
          </Flex>
        </motion.div>

        <Files />
      </Flex>
    </div>
  );
};

export default FileLoader;
