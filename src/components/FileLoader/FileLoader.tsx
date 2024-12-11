import "./FileLoader.sass";

import {
  useState,
  type AllHTMLAttributes,
  type FC,
  type DragEvent,
  type ChangeEvent,
} from "react";

import { Button, Flex, Text, Title } from "uikit";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { dndFilesActions } from "store/dndFiles";

interface FileLoaderProps extends AllHTMLAttributes<HTMLElement> {}

const FileLoader: FC<FileLoaderProps> = () => {
  const d = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false); // Состояние для анимации при наведении

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
      d(dndFilesActions.loadFiles(files));
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
      const isUploadedAllFiles = uploadFiles(arrayAllFiles);
      console.log("status:", isUploadedAllFiles);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  return (
    <motion.div
      className="FileLoader"
      style={{
        "--br-color": isDraggedOver ? "var(--green)" : "var(--accent)",
      }}
      onDrop={handleGetFiles}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="FileLoader__wrapper"
        initial={{ scale: 1 }}
        animate={{ scale: isDraggedOver ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Flex
          className="FileLoader__content"
          vertical="center"
          horizontal="center"
          direction="column"
        >
          <Title weight="1">Drag'n'Drop</Title>
          <Text>Files Here. Or Use Button</Text>

          <Button
            className="FileLoader__btn"
            size="m"
            type="accent"
            mode="file-loader"
            onChange={handleGetFiles}
          >
            <Text>Select Files</Text>
          </Button>
        </Flex>
      </motion.div>
    </motion.div>
  );
};

export default FileLoader;
