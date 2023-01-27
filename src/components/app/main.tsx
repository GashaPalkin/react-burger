import React from "react";
import mainPageStyles from "./main.module.css";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
export const MainPage = () => {
  return (
    <React.Fragment>
      <div className="container centerBlock">
        <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      </div>
      <main className={`${mainPageStyles.contentWrap} container `}>
        <div className={`${mainPageStyles.burgerIngredients} `}>
          <BurgerIngredients />
        </div>
        <div className={`${mainPageStyles.burgerConstructor} `}>
          <BurgerConstructor />
        </div>
      </main>
    </React.Fragment>
  );
};
