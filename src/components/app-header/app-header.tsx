import React from "react";
import headerStyles from "./app-header.module.css";
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
        className={`${headerStyles.header} container centerBlock pt-4 pb-4 `}
      >
        <nav className={`${headerStyles.leftNavigation} `}>
<<<<<<< Updated upstream:src/components/app-header/app-header.jsx
          <span>
            <BurgerIcon className="mr-10" type="primary" />
            Конструктор
          </span>
          <span>
            <ListIcon type="primary" />
            Лента заказов
=======
          <NavLink to="/">
            <span>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
              <p className="text text_type_main-default text_color_inactive">
                Конструктор
              </p>
            </span>
          </NavLink>
          <NavLink to="/notfound">
            <span>
              <ListIcon type={isOrderFeed ? "primary" : "secondary"} />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </span>
          </NavLink>
        </nav>
        <NavLink to="/">
          <span className={`${headerStyles.logo} `}>
            <Logo />
>>>>>>> Stashed changes:src/components/app-header/app-header.tsx
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
