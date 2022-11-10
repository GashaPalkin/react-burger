import React from "react";
import { useEffect, useState } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
const dataURL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataFromAPI = async () => {
      try {
        const res = await fetch(dataURL);
        const data = await res.json();
        setData(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDataFromAPI();
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <div className="container centerBlock">
        <h2 className="text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      </div>
      <main className={`${appStyles.contentWrap} container `}>
        <div className={`${appStyles.burgerIngredients} `}>
          <BurgerIngredients data={data} />
        </div>
        <div className={`${appStyles.burgerConstructor} `}>
          <BurgerConstructor data={data} />
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
