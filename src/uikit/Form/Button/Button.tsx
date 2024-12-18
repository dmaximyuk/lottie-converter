import "./Button.sass";

import {
  useId,
  type AllHTMLAttributes,
  type FC,
  type ChangeEventHandler,
} from "react";
import cn from "clsx";

import { motion, MotionProps } from "motion/react";

interface ButtonProps
  extends Omit<
    AllHTMLAttributes<HTMLButtonElement>,
    "onChange" | "size" | "id"
  > {
  type?: "default" | "accent";
  mode?: "default" | "file-loader";
  size?: "s" | "m" | "l";
  stretched?: boolean;
  allowExtensions?: Array<string>;
  isSquare?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Button: FC<ButtonProps> = ({
  type = "default",
  mode = "default",
  size = "s",
  stretched = false,
  allowExtensions,
  onChange,
  isSquare = false,
  className,
  ...props
}) => {
  const id = useId();
  const fileInputId = `file-input-${id}`;
  const DynamicMotionComponent = motion(
    mode === "file-loader" ? "label" : "button",
  );

  return (
    <>
      <DynamicMotionComponent
        // ! any - was used due to compatibility issues
        // ! with the AllHTMLAttributes and Framer-Motion types
        {...(props as any)}
        whileHover={{
          opacity: 0.6,
        }}
        whileTap={{
          opacity: 0.9,
          scale: 1.05,
        }}
        className={cn(
          "Button",
          `Button_color--${type}`,
          `Button_size--${size}`,
          isSquare && `Button_square`,
          stretched && "Button_stretched",
          className,
        )}
        {...(mode === "file-loader" && { htmlFor: fileInputId })}
        children={props.children}
      />
    </>
  );
};
