import React from "react";
import headerStyles from "./app-header.module.css";
import appStyles from "../app/app.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
function AppHeader() {
  return (
    <div className={`${headerStyles.headerWrap} `}>
      <header
        className={`${headerStyles.header} ${appStyles.container} ${appStyles.centerBlock} pt-4 pb-4 `}
      >
        <nav className={`${headerStyles.leftNavigation} `}>
          <span>
            <BurgerIcon className="mr-10" type="primary" />
            Конструктор
          </span>
          <span>
            <ListIcon type="primary" />
            Лента заказов
          </span>
        </nav>

        <span className={`${headerStyles.logo} `}>
          <Logo />
        </span>

        <nav className={`${headerStyles.rightNavigation} `}>
          <span>
            <ProfileIcon type="primary" />
            Личный кабинет
          </span>
        </nav>
      </header>
    </div>
  );
}

export default AppHeader;
