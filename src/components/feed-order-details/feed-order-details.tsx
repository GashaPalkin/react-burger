import { useAppSelector } from "../../hooks/useStore";
import { useParams } from "react-router";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "../../utils/ui/formatted-date";
import orderDetailsStyles from "./order-details.module.css";
import { IngredientType } from "../../utils/types";

type ParamsType = {
  id: string;
};
export const FeedOrderDetails = () => {
  // все ордеры из store
  const { orders } = useAppSelector((store) => store.wsOrderReducer);
  // все ингредиенты из store
  const { data } = useAppSelector((store) => store.ingredientsReducer);
  // id - это number ордера
  const { id } = useParams<ParamsType>();
  const currentOrder = orders.find((el: any) => el.number == id);
  // console.log(currentOrder)
  const status =
    currentOrder?.status === "created"
      ? "Создан"
      : currentOrder?.status === "pending"
      ? "Готовится"
      : currentOrder?.status === "done"
      ? "Выполнен"
      : currentOrder?.status;

  const ingredients = Array.from(
    currentOrder?.ingredients.reduce((acc, id) => {
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

  // на время пока ищет нужный элемент
  if (!currentOrder) return <></>;

  return (
    <>
      <div className={orderDetailsStyles.wrapper}>
        <h1 className="text text_type_digits-default">{`#${currentOrder.number}`}</h1>
        <p className="text text_type_main-medium mt-5 mb-2">
          {currentOrder.name}
        </p>
        <span className={orderDetailsStyles.status}>{status}</span>
        <div className="mt-8">
          <h2 className="mt-2 mb-4">Состав:</h2>
          <div className={orderDetailsStyles.ingredients}>
            {currentOrder &&
              ingredients.map(([ingredient, count]) => {
                return (
                  <div className={orderDetailsStyles.ingredientWrapper}>
                    <div>
                      <div className={orderDetailsStyles.ingredientImg}>
                        <img src={ingredient.image_mobile} alt=""></img>
                      </div>
                      <div>{ingredient.name}</div>
                    </div>
                    <div className={orderDetailsStyles.orderCardPrice}>
                      <span className="text text_type_digits-default">
                        {count}
                      </span>
                      <span className="text text_type_digits-default">X</span>
                      <span className="text text_type_digits-default">
                        {ingredient.price}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={orderDetailsStyles.info}>
            <div className="text_color_inactive">
              <FormattedDate date={new Date(currentOrder.createdAt)} />
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
