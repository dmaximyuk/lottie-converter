import "./ThemeCard.sass";

import { FC } from "react";
import cn from "clsx";

import { Text } from "uikit";

import { THEME, themes } from "vars";

const ThemeCard: FC<{ type: (typeof themes)[number] }> = (props) => {
  const handleChangeTheme = () => {
    if (props.type === THEME) return;
    localStorage.setItem("theme", props.type);
    location.reload();
  };

  return (
    <div className="ThemeCard" onClick={handleChangeTheme}>
      <div
        className={cn(
          "ThemeCard__content",
          `ThemeCard_${props.type}`,
          props.type === THEME && "ThemeCard_active",
        )}
      />
      <Text isDescription>{props.type}</Text>
    </div>
  );
};

export default ThemeCard;
