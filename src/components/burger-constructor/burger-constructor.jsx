import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import constructorStyles from "./burger-constructor.module.css";
import imageDone from "../../images/done.png";
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
      <Modal isShow={isShow} onClose={() => setShow(false)}>
        <React.Fragment>
          <p className="text text_type_digits-large mt-8">034536</p>
          <p className="text text_type_main-medium mt-8">
            идентификатор заказа
          </p>
          <img
            className="m-15"
            src={imageDone}
            alt="done"
            height={120}
            width={120}
          />
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mt-2 mb-10">
            Дождитесь готовности на орбитальной станции
          </p>
        </React.Fragment>
      </Modal>
    </div>
  );
}

// Типизация компонентов
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
};

export default BurgerConstructor;
