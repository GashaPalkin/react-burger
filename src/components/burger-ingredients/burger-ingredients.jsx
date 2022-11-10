import React from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import ingredientsStyles from "./burger-ingredients.module.css";
import {
  CurrencyIcon,
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientElement = ({ element }) => (
  // Карточка товара
  <div className={`${ingredientsStyles.itemCard} `}>
    <Counter count={1} size="default" />
    <img className="centerBlock" src={element.image} alt={element.name} />
    <div className={`${ingredientsStyles.itemInfo} `}>
      <span
        className={`${ingredientsStyles.itemPrice} text text_type_digits-default `}
      >
        {element.price} <CurrencyIcon type="primary" />
      </span>
      <p
        className={`${ingredientsStyles.itemTitle} text text_type_main-default `}
      >
        {element.name}
      </p>
    </div>
  </div>
);

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <React.Fragment>
      {/* Tabs */}
      <div className={`${ingredientsStyles.ingredientsTabs} `}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      {/* End Tabs */}

      <div className={`${ingredientsStyles.ingredientCards} `}>
        <h3
          className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
        >
          Булки
        </h3>
        {data.map((element) => {
          if (element.type === "bun") {
            return <IngredientElement key={element._id} element={element} />;
          }
        })}

        <h3
          className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
        >
          Соусы
        </h3>
        {data.map((element) => {
          if (element.type === "sauce") {
            return <IngredientElement key={element._id} element={element} />;
          }
        })}

        <h3
          className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
        >
          Начинки
        </h3>
        {data.map((element) => {
          if (element.type === "main") {
            return <IngredientElement key={element._id} element={element} />;
          }
        })}
      </div>
    </React.Fragment>
  );
}

// Типизация компонентов
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
};

IngredientElement.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};

export default BurgerIngredients;
