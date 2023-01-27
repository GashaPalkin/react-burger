import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import { OrderDetails } from "../order-details/order-details";
import { deleteIngredient } from "../../services/reducers/constructor-reducer";
import { DragIngridient } from "./drag-ingridient";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { sentOrder } from "../../services/actions/order-actions";
import { clearOrder } from "../../services/reducers/order-reducer";
import { clearConstructor } from "../../services/reducers/constructor-reducer";
import { useHistory } from "react-router-dom";
import { IngredientType } from "../../utils/types";

interface IngredientUUIDType extends IngredientType {
  uuid: string;
}

function BurgerConstructor() {
  const dispatch = useDispatch();
  // ! типизировать store в следующем спринте
  // @ts-ignore
  const { bun, ingredients } = useSelector((store) => store.constructorReducer);

  const [{ isHover }, drop] = useDrop(() => ({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  }));

  const borderColor = isHover ? "green" : "transparent";

  // ! типизировать store в следующем спринте
  // @ts-ignore
  const { orderNumber } = useSelector((store) => store.orderReducer);

  // считаем полную стоимость
  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (acc: number, value: IngredientType) => acc + value.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  // очистка заказа и конструктора
  function onCloseClearOrder() {
    dispatch(clearOrder());
    // @ts-ignore
    dispatch(clearConstructor());
  }
  const history = useHistory();
  // ! типизировать store в следующем спринте
  // @ts-ignore
  const { user } = useSelector((store) => store.authReducer);
  // получаем подробности заказа
  const getOrderDedails = () => {
    const INGRIDIENTS = [
      bun._id,
      ...ingredients.map((el: IngredientType) => el._id),
      bun._id,
    ];
    if (user) {
      // @ts-ignore
      dispatch(sentOrder({ ingredients: INGRIDIENTS }));
    } else {
      history.replace({ pathname: "/login" });
    }
  };

  // отключение кнопки если нет булки и ингредиентов
  const disableButton = useMemo(
    () => !bun || !ingredients.length || orderNumber,
    [bun, ingredients, orderNumber]
  );

  return (
    <div
      ref={drop}
      style={{ borderColor }}
      className={`${constructorStyles.burgerConstructorWrap} pl-4 pr-4 `}
    >
      <>
        {/* верхняя булка bun */}
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
          {/* перебор массива без булок ingredients */}
          {ingredients &&
            ingredients.map((element: IngredientUUIDType, idx: number) => {
              return (
                <React.Fragment key={element.uuid}>
                  <DragIngridient id={element.uuid} index={idx}>
                    <div
                      className={`${constructorStyles.constructorElementCenter} `}
                    >
                      <DragIcon type={"primary"} />
                      <ConstructorElement
                        isLocked={false}
                        key={element._id}
                        text={element.name}
                        thumbnail={element.image}
                        price={element.price}
                        // обязательно handleClose / не onClick
                        handleClose={() =>
                          dispatch(deleteIngredient(element.uuid))
                        }
                      />
                    </div>
                  </DragIngridient>
                </React.Fragment>
              );
            })}
        </div>  

      {/* нижняя булка bun */}
      {bun && (
        <ConstructorElement
          text={bun.name + " (низ)"}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type="bottom"
        />
      )}
      </>
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
          disabled={disableButton}
          onClick={getOrderDedails}
        >
          Оформить заказ
        </Button>
      </div>

      {/* modal */}
      {orderNumber && (
        <Modal onClose={onCloseClearOrder}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
