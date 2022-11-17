import React from "react";
import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import constructorStyles from "./burger-constructor.module.css";
import { OrderDetails } from "../order-details/order-details";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import { DataContext } from "../app/data-context";

function BurgerConstructor() {
  // Данные из контекста
  const { data } = useContext(DataContext);

  const onlyBun = (data) => data.find((element) => element.type === "bun");
  const [bun, setBun] = useState(onlyBun(data));

  const onlyIngredients = (data) =>
    data.filter((element) => element.type !== "bun");
  const [ingredients, setIngredients] = useState(onlyIngredients(data));

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const Bun = onlyBun(data);
    // console.log(Bun);

    const Ingredients = onlyIngredients(data);
    // console.log(Ingredients);

    // Считаем стоимость булки
    let bunPrice = null;
    if (Bun) {
      bunPrice = Bun.price * 2;
    } else {
      bunPrice = 0;
    }
    // Считаем  стоимость остальных ингредиентов
    const ingredientsPrice = Array.isArray(Ingredients)
      ? Ingredients.reduce((sum, current) => sum + current.price, 0)
      : 0;
    setBun(Bun);
    setIngredients(Ingredients);
    setTotalPrice(bunPrice + ingredientsPrice);
  }, [data, totalPrice]);

  // Состояние Modal
  const [isShow, setShow] = useState(false);

  // Для OrderDetails
  const [orderNumber, setOrderNumber] = useState(0);

  // Отправка запроса POST
  const postURL = "https://norma.nomoreparties.space/api/orders";

  const sentOrder = async () => {
    let res = await fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: [
          bun._id,
          ...ingredients.map((element) => element._id),
          bun._id,
        ],
      }),
    });
    if (res.ok) {
      let result = await res.json();
      console.log(result);
      // Присваиваем номер заказа из ответа
      setOrderNumber(result.order.number);
      // Открытие Modal
      setShow(true);
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  };

  return (
    <div className={`${constructorStyles.burgerConstructorWrap} pl-4 pr-4 `}>
      {/* Верхняя булка bun */}
      {bun && (
        <ConstructorElement
          text={bun.name + " (верх)"}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type="top"
        />
      )}

      <div className={`${constructorStyles.contstructorCenter} `}>
        {/* Перебор массива без булок ingredients */}
        {ingredients &&
          ingredients.map((element, idx) => {           
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
              )          
          })}
      </div>

      {/* Нижняя булка bun */}
      {bun && (
        <ConstructorElement
          text={bun.name + " (низ)"}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type="bottom"
        />
      )}

      <div className={`${constructorStyles.checkout} pt-10 mr-4 `}>
        <div className="totalPrice">
          <span
            className={`${constructorStyles.total} text text_type_digits-medium `}
          >
            {totalPrice}
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={sentOrder}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Modal */}
      {isShow && (
        <Modal onClose={() => setShow(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

// Типизация компонентов
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};

export default BurgerConstructor;
