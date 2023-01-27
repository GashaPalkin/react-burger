import { useDispatch } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import { ProfileForm } from "./profile-form";
import { ProfileHistory } from "./profile-history";
import { logoutRequest } from "../../services/actions/auth-actions";
import profilePageStyles from "./profile.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const logout = () => {
    // @ts-ignore
    dispatch(logoutRequest());
  };
  return (
    <div
      className={`${profilePageStyles.profileWrapper} container dFlex flexRow  mt-10 `}
    >
      <div className={`${profilePageStyles.profileLeftSide} `}>
        <nav className={`${profilePageStyles.profileNav} `}>
          <NavLink
            to="/profile"
            exact={true}
            className={`text text_type_main-medium text_color_inactive`}
            activeClassName={`${profilePageStyles.activeLink} `}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact={true}
            className={`text text_type_main-medium text_color_inactive`}
            activeClassName={`${profilePageStyles.activeLink} `}
          >
            История заказов
          </NavLink>

          <NavLink
            to={{ pathname: `/login` }}
            className={`text text_type_main-medium text_color_inactive`}
            activeClassName={`${profilePageStyles.activeLink} `}
            onClick={logout}
          >
            Выход
          </NavLink>
        </nav>
        <div className="text text_type_main-small text_color_inactive mt-15">
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <div className={`${profilePageStyles.profileRightSide} `}>
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileForm />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProfileHistory />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
