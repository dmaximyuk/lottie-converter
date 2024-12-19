import "./ThemeChange.sass";

import { type FC } from "react";
import { Dropdown } from "uikit";

import { THEME } from "vars";

const ThemeChange: FC = () => {
  /**
   * <select
      className="ThemeChange"
      value={THEME}
      onChange={(event) => {
        localStorage.setItem("theme", event.target.value);
        window.location.reload();
      }}
    >
      {["light", "dark"].map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
   */
  return <Dropdown title="Theme" items={[]}></Dropdown>;
};

export default ThemeChange;
