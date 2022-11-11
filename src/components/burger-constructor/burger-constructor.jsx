import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import constructorStyles from "./burger-constructor.module.css";
import imageDone from "../../images/done.png";
import { OrderDetails } from "../order-details/order-details";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

function BurgerConstructor({ data }) {
  // Для Modal
  const [isShow, setShow] = useState(false);
  function openOrder() {
    setShow(true);    
  }
  // Для OrderDetails
  const [orderNumber, setOrderNumber] = useState(123456);
  function getOrderNumber() {
    // Сеттер для номера заказа. Пока не используется
    setOrderNumber(654321) 
  }
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
        {/* Перебор массива */}
        {data.map((element, idx) => {
          // Условие - не булка
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
        <Button
          htmlType="button"
          onClick={() => openOrder()}
          type="primary"
          size="large"
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
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
};

export default BurgerConstructor;
