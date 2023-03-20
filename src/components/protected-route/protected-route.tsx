import { useAppSelector } from "../../hooks/useStore";
import { Route, Redirect, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";

interface ProtectedRouteProps {
  onlyNotAuth: boolean;
  from?: string;
  children?: ReactElement;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyNotAuth = false,
  ...rest
}) => {
  
  const { user } = useAppSelector((store) => store.authReducer);
  const location = useLocation();

  if (onlyNotAuth && user) {
    const from = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyNotAuth && !user) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  // Если onlyUnAuth && isAuthenticated
  return <Route {...rest} />;
};
