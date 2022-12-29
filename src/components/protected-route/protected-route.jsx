import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ onlyNotAuth = false, ...rest }) => {
  const { user } = useSelector((store) => store.authReducer);
  const location = useLocation();
  // console.log(location)

  if (onlyNotAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
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
