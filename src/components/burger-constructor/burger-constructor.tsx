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
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { useDrop } from "react-dnd";
import { sentOrder } from "../../services/actions/order-actions";
import { clearOrder } from "../../services/reducers/order-reducer";
import { clearConstructor } from "../../services/reducers/constructor-reducer";
import { useHistory } from "react-router-dom";
import { IngredientType } from "../../utils/types";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { bun, ingredients } = useAppSelector(
    (store) => store.constructorReducer
  );

  // для preloader получить значение loading
  const { orderNumber, loading } = useAppSelector(
    (store) => store.orderReducer
  );
  const { user } = useAppSelector((store) => store.authReducer);

  const [{ isHover }, drop] = useDrop(() => ({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  }));

  const borderColor = isHover ? "green" : "transparent";

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
    dispatch(clearConstructor());
  }

  // получаем подробности заказа
  const getOrderDedails = () => {
    if (!bun) return;
    const INGRIDIENTS = [
      bun._id,
      ...ingredients.map((el: IngredientType) => el._id),
      bun._id,
    ];

    if (user) {
      dispatch(sentOrder({ ingredients: INGRIDIENTS }));
      // INGRIDIENTS - массив с ID - тип string
      // console.log(INGRIDIENTS);
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
      data-testid="dropContainer"
    >
      <div
      data-testid="dropBunTop"
      >
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
      </div>

      <div
        className={`${constructorStyles.contstructorCenter} `}
        data-testid="dropIngredients"
      >
        {/* перебор массива без булок ingredients */}
        {ingredients &&
          ingredients.map((element, idx) => {
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

      <div
        data-testid="dropBunBottom"
      >
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
      </div>

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
          // ? двойное отрицание! иначе не работает
          // ? см. https://ru.stackoverflow.com/questions/188946/%D0%94%D0%B2%D0%BE%D0%B9%D0%BD%D0%BE%D0%B5-%D0%BE%D1%82%D1%80%D0%B8%D1%86%D0%B0%D0%BD%D0%B8%D0%B5
          disabled={!!disableButton}
          onClick={getOrderDedails}
          data-testid="sentOrderButton"
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

      {/* preloader */}
      {loading ? (
        <div className={`${constructorStyles.load} `}>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      ) : null}
    </div>
  );
}

export default BurgerConstructor;
