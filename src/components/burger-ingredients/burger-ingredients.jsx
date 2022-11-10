import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import ingredientsStyles from "./burger-ingredients.module.css";
import {
  CurrencyIcon,
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

// Карточка товара.
const IngredientElement = ({ element, onClick }) => (
  <div className={`${ingredientsStyles.itemCard} `} onClick={onClick}>
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
  // Для Tabs
  const [current, setCurrent] = React.useState("Булки");

  // Для Modal
  const [isShow, setShow] = useState(false);
  const [detail, setDetail] = useState();

  function openDetail(value) {
    setShow(true);
    setDetail(value);
  }

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

      {/* Список карточек */}
      <div className={`${ingredientsStyles.ingredientCards} `}>
        <h3
          className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
        >
          Булки
        </h3>

        {data.map((element) => {
          if (element.type === "bun") {
            return (
              <IngredientElement
                key={element._id}
                element={element}
                onClick={() => openDetail(element)}
              />
            );
          }
        })}

        <h3
          className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
        >
          Соусы
        </h3>

        {data.map((element) => {
          if (element.type === "sauce") {
            return (
              <IngredientElement
                key={element._id}
                element={element}
                onClick={() => openDetail(element)}
              />
            );
          }
        })}

        <h3
          className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
        >
          Начинки
        </h3>

        {data.map((element) => {
          if (element.type === "main") {
            return (
              <IngredientElement
                key={element._id}
                element={element}
                onClick={() => openDetail(element)}
              />
            );
          }
        })}
      </div>

      {/* Modal. Условие - если в detail не undefined */}
      {detail && (
        <Modal
          title="Детали ингредиента"
          isShow={isShow}
          onClose={() => setShow(false)}
        >
          <React.Fragment>
            <img src={detail.image_large} alt={detail.name} />
            <p className="text text_type_main-medium mt-4">{detail.name}</p>
            <div className={`${ingredientsStyles.nutrients} flexRow mt-8`}>
              <div className="centerText">
                <p className="text text_type_main-default text_color_inactive">
                  Калории,ккал
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {detail.calories}
                </p>
              </div>
              <div className="centerText">
                <p className="text text_type_main-default text_color_inactive">
                  Белки,г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {detail.proteins}
                </p>
              </div>
              <div className="centerText">
                <p className="text text_type_main-default text_color_inactive">
                  Жиры,г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {detail.fat}
                </p>
              </div>
              <div className="centerText">
                <p className="text text_type_main-default text_color_inactive">
                  Углеводы,г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                  {detail.carbohydrates}
                </p>
              </div>
            </div>
          </React.Fragment>
        </Modal>
      )}
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
