import React from "react";
import PropTypes from "prop-types";
import imageDone from "../../images/done.png";

export const OrderDetails = ({ orderNumber  }) => {
  return (
    <React.Fragment>
        <p className="text text_type_digits-large mt-8">
           {orderNumber}
          </p>
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
  );
};

//Типизация компонентов
OrderDetails.propTypes = {
  orderNumber: PropTypes.number
}
