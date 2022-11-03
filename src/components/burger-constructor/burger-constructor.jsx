import React from "react";
import PropTypes from "prop-types";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const burgerСonstructorPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerСonstructorPropTypes).isRequired,
};

function BurgerConstructor({ data }) {
  return (
    <>
      <div
        className="pl-4 pr-4"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "100vh",
        }}
      >
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <div
          className={`${constructorStyles.contstructorCenter} `}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "right",
            gap: "16px",
          }}
        >
          {data.map((element, idx) => {
            return (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "16px",
                }}
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
    </>
  );
}

export default BurgerConstructor;
