import "./Theme.sass";

import { type FC } from "react";

import { Card } from "uikit";

import { ThemeCard } from "components";

import { themes } from "vars";

const Theme: FC = () => {
  return (
    <Card className="Theme">
      {themes.map((t) => (
        <ThemeCard key={t} type={t} />
      ))}
    </Card>
  );
};

export default Theme;
