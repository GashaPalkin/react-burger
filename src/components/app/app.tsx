import React from "react";
import { useEffect, useState } from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { DataContext } from "./data-context";

const dataURL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataFromAPI = async () => {
      const res = await fetch(dataURL);
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
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
        <DataContext.Provider value={{ data }}>
          <div className={`${appStyles.burgerIngredients} `}>            
            <BurgerIngredients />
          </div>
          <div className={`${appStyles.burgerConstructor} `}>            
            <BurgerConstructor />
          </div>
        </DataContext.Provider>
      </main>
    </React.Fragment>
  );
}

export default App;
