import "./Button.sass";

import { useId, type AllHTMLAttributes, type FC } from "react";
import cn from "clsx";

interface ButtonProps
  extends Omit<AllHTMLAttributes<HTMLButtonElement>, "size"> {
  type?: "default" | "accent";
  mode?: "default" | "file-loader";
  size?: "s" | "m" | "l";
  stretched?: boolean;
  allowExtensions?: Array<string>;
  isSquare?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = "default",
  mode = "default",
  size = "s",
  stretched = false,
  allowExtensions,
  isSquare = false,
  className,
  ...props
}) => {
  const id = useId();
  const fileInputId = `file-input-${id}`;

  return (
    <button
      {...props}
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
  );
};

export default Button;
