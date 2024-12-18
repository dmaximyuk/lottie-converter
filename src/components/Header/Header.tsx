import "./Header.sass";

import { type AllHTMLAttributes, type FC } from "react";
import { useTranslation } from "i18nano";

import { getRoutePath } from "utils";

import { Link } from "react-router-dom";
import { Flex, Title, Text } from "uikit";

import { RouteID } from "models";

export interface HeaderProps extends AllHTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = () => {
  const t = useTranslation();

  return (
    <nav className="Header">
      <Flex
        className="Header__container"
        horizontal="space-between"
        vertical="center"
      >
        <Link to={getRoutePath(RouteID.Home)}>
          <Title className="Header__text" weight="1">
            ZLottie
          </Title>
        </Link>
        <Flex horizontal="end" vertical="center">
          <Link to={getRoutePath(RouteID.HowToUse)}>
            <Text className="Header__text">Docs</Text>
          </Link>
        </Flex>
      </Flex>
    </nav>
  );
};

export default Header;
