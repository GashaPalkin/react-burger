import headerStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch } from "react-router-dom";

function AppHeader() {
  const isConstructor = !!useRouteMatch({ path: "/", exact: true });
  const isOrderFeed = !!useRouteMatch("/notfound");
  const isProfile = !!useRouteMatch("/profile");

  return (
    <div className={`${headerStyles.headerWrap} `}>
      <header
        className={`${headerStyles.header} container centerBlock pt-4 pb-4 `}
      >
        <nav className={`${headerStyles.leftNavigation} `}>
          <NavLink to="/">
            <span>
              <BurgerIcon                
                type={isConstructor ? "primary" : "secondary"}
              />
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
          </span>
        </NavLink>
        <nav className={`${headerStyles.rightNavigation} `}>
          <NavLink to="/profile">
            <span>
              <ProfileIcon type={isProfile ? "primary" : "secondary"} />
              <p className="text text_type_main-default text_color_inactive">
                {" "}
                Личный кабинет
              </p>
            </span>
          </NavLink>
        </nav>
      </header>
    </div>
  );
}

export default AppHeader;