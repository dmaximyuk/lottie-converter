import "./Header.sass";

import { type AllHTMLAttributes, type FC } from "react";
import { useTranslation } from "i18nano";

import { getRoutePath } from "utils";

import { Link } from "react-router-dom";
import { Title } from "uikit";

import { RouteID } from "models";

export interface HeaderProps extends AllHTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = () => {
  const t = useTranslation();

  return (
    <nav className="Header">
      <div className="Header__container">
        <Link to={getRoutePath(RouteID.Home)}>
          <Title className="Header__text" weight="1">
            ZLottie
          </Title>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
