<<<<<<< Updated upstream:src/components/app/app.jsx
import React from "react";
import { useEffect, useState } from "react";
=======
import { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
>>>>>>> Stashed changes:src/components/app/app.tsx
import "@ya.praktikum/react-developer-burger-ui-components";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
<<<<<<< Updated upstream:src/components/app/app.jsx
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

// ! Данные из store
import { useDispatch } from 'react-redux';
import { getDataFromAPI } from "../../services/actions/ingredients-actions";

function App() { 
  
 // ! Данные из store
const dispatch = useDispatch()
useEffect(() => {
    dispatch(getDataFromAPI())
}, [dispatch])
=======
import { MainPage } from "../../pages/main";
import { LoginPage } from "../../pages/login/login";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { RegisterPage } from "../../pages/register/register";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { PageNotFound } from "../../pages/page-not-found";
import { ProfilePage } from "../../pages/profile/profile";
import { getUserRequest } from "../../services/actions/auth-actions";
import { ProtectedRoute } from "../protected-route/protected-route";
import { useDispatch } from "react-redux";
import { getDataFromAPI } from "../../services/actions/ingredients-actions";
import { getCookie } from "../../utils/utils";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { Location } from "history";

function App() {
  const location = useLocation<{ background: Location }>();
  const history = useHistory();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const handleModalClose = () => history.goBack();

  useEffect(() => {
    // @ts-ignore
    dispatch(getDataFromAPI());
    if (getCookie("accessToken")) {
      // @ts-ignore
      dispatch(getUserRequest());
    }
  }, [dispatch]);
>>>>>>> Stashed changes:src/components/app/app.tsx

  return (
    <>
      <AppHeader />
<<<<<<< Updated upstream:src/components/app/app.jsx
      <div className="container centerBlock">
        <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      </div>
      <main className={`${appStyles.contentWrap} container `}>      
          <div className={`${appStyles.burgerIngredients} `}>
            <BurgerIngredients />
          </div>
          <div className={`${appStyles.burgerConstructor} `}>
            <BurgerConstructor />
          </div>       
      </main>
    </React.Fragment>
=======
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>

        <ProtectedRoute onlyNotAuth={true} path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute onlyNotAuth={true} path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute onlyNotAuth={true} path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute onlyNotAuth={true} path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" onlyNotAuth={false}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <div className="container centerBlock mt-10">
            <IngredientDetails />
          </div>
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>

      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal title="Детали ингредиента" onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
>>>>>>> Stashed changes:src/components/app/app.tsx
  );
}

export default App;
