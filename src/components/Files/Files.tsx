import "./Files.sass";

import { type FC } from "react";
import { useSelector } from "react-redux";
import { objectToArray } from "utils";

import { motion } from "motion/react";
import { FilePreview } from "components";

import { dndFilesSelector } from "store/dndFiles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Files: FC = () => {
  const { files } = useSelector(dndFilesSelector);

  const filesWithArray = () => {
    return objectToArray(files);
  };

  if (filesWithArray().length <= 1) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="Files"
    >
      {filesWithArray().map((item) => {
        return <FilePreview key={item.id} file={item} />;
      })}
    </motion.div>
  );
};

export default Files;
