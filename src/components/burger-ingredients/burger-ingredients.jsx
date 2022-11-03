import React from "react";
import PropTypes from "prop-types";
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
      <span className={`${ingredientsStyles.itemPrice} text text_type_digits-default `}>
        {element.price} <CurrencyIcon type="primary" />
      </span>
      <p className={`${ingredientsStyles.itemTitle} text text_type_main-default `}>{element.name}</p>
    </div>
  </div>
);
const burgerIngredientsPropTypes = PropTypes.shape({
  // number? в Data.js - string
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
};

function BurgerIngredients({ data }) {  
  const [current, setCurrent] = React.useState("one");
  return (
    <>
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
        <h3 className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}>
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
    </>
  );
}

export default BurgerIngredients;
