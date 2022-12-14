import React from "react";
import { useEffect, useState } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
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

  return (
    <React.Fragment>
      <AppHeader />
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
  );
}

export default App;
