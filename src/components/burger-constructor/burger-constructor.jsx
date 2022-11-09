import React from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data }) {
  return (
    <div className={`${constructorStyles.burgerConstructorWrap} pl-4 pr-4 `}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      />
      <div className={`${constructorStyles.contstructorCenter} `}>
        {/* Перебираем весь массив */}
        {data.map((element, idx) => {
          // Условие что не булка
          if (element.type !== "bun") {
            return (
              <div
                className={`${constructorStyles.constructorElementCenter} `}
                key={idx}
              >
                <DragIcon />
                <ConstructorElement
                  isLocked={false}
                  key={element._id}
                  text={element.name}
                  type={element.type}
                  thumbnail={element.image}
                  price={element.price}
                />
              </div>
            );
          }
        })}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      />
      <div className={`${constructorStyles.checkout} pt-10 mr-4 `}>
        <div className="totalPrice">
          <span
            className={`${constructorStyles.total} text text_type_digits-medium `}
          >
            610
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

// Типизация компонентов
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
};

export default BurgerConstructor;
