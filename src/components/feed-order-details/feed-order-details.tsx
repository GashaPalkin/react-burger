import orderDetailsStyles from "./order-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "../../utils/ui/formatted-date";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { useParams } from "react-router";
import { useEffect } from "react";
import { IngredientType } from "../../utils/types";
import { getOrderDetails } from "../../services/actions/order-actions";
import { clearOrderDetails } from "../../services/reducers/order-reducer";
import { OrderIngredient } from "./feed-order-ingredient";

type ParamsType = {
  id: string;
};
export const FeedOrderDetails = () => {
  const dispatch = useAppDispatch();
  // детали ордера из store
  const { orderDetails } = useAppSelector((store) => store.orderReducer);
  // id - это number ордера
  const { id } = useParams<ParamsType>();
  // все ингредиенты из store
  const { data } = useAppSelector((store) => store.ingredientsReducer);

  useEffect(() => {
    // получаем данные ордера
    dispatch(getOrderDetails(id || ""));
    return () => {
      // обнуляем данные ордера
      dispatch(clearOrderDetails());
    };
  }, [dispatch, id]);

  const status =
    orderDetails?.status === "created"
      ? "Создан"
      : orderDetails?.status === "pending"
      ? "Готовится"
      : orderDetails?.status === "done"
      ? "Выполнен"
      : orderDetails?.status;

  const ingredients = Array.from(
    orderDetails?.ingredients.reduce((acc, id) => {
      const ingredient = data.find((el) => el._id === id);
      if (ingredient) {
        acc.set(ingredient, (acc.get(ingredient) ?? 0) + 1);
      }
      return acc;
    }, new Map<IngredientType, number>()) ?? []
  );

  const totalPrice = ingredients.reduce(
    (acc, [ingredient, count]) => acc + ingredient.price * count,
    0
  );

  if (!orderDetails) return <></>;

  return (
    <>
      <div className={orderDetailsStyles.wrapper}>
        <h1 className="text text_type_digits-default">{`#${orderDetails.number}`}</h1>
        <p className="text text_type_main-medium mt-5 mb-2">
          {orderDetails.name}
        </p>
        <span className={orderDetailsStyles.status}>{status}</span>
        <div className="mt-8">
          <h2 className="mt-2 mb-4">Состав:</h2>
          <div className={orderDetailsStyles.ingredients}>
            {orderDetails &&
              ingredients.map(([ingredient, count]) => (
                <OrderIngredient
                  ingredient={ingredient}
                  count={count}
                  key={ingredient._id}
                />
              ))}
          </div>
          <div className={orderDetailsStyles.info}>
            <div className="text_color_inactive">
              <FormattedDate date={new Date(orderDetails.createdAt)} />
            </div>
            <div className={orderDetailsStyles.orderCardPrice}>
              <span className="text text_type_digits-default">
                {totalPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
