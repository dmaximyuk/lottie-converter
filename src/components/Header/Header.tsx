import "./Header.sass";

import { type AllHTMLAttributes, type FC } from "react";
import { useTranslation } from "i18nano";

import { Flex, Title } from "uikit";
import { Link } from "react-router-dom";

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
        <Link to={"/"}>
          <Title weight="1">ZLottie</Title>
        </Link>
        <Title weight="1">Payments</Title>
      </Flex>
    </nav>
  );
};

export default Header;
