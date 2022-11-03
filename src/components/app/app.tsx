import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.js";

import appStyles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() { 
  return (
    <React.Fragment>   
        <AppHeader />
       
        <div className={`${appStyles.container} ${appStyles.centerBlock} `}>
          <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
        </div> 
       
        <div className={`${appStyles.contentWrap} ${appStyles.container} `}>
          <div className={`${appStyles.burgerIngredients} `}>
            <BurgerIngredients data={data} />
          </div>
          
          <div className={`${appStyles.burgerConstructor} `}>
            <BurgerConstructor data={data} />
          </div>
        </div>     
      </React.Fragment>
  );
}

export default App;
