import { FC } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import orderCardStyles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "../../utils/ui/formatted-date";
import { Order } from "../../utils/types";

interface ElementProps {
  element: Order;
  onClick: () => void;
}

export const OrderCard: FC<ElementProps> = ({ element, onClick }) => {
  const location = useLocation();
  const { path } = useRouteMatch();
  // деструктуризация данных из element
  const { name, number, createdAt } = element;
  const _id = element.number;
  // все ингредиенты из store
  const { data } = useAppSelector((store) => store.ingredientsReducer);
  // ингредиенты заказа
  const orderIngredients = data.filter((ingredient) =>
    element.ingredients.includes(ingredient._id)
  );
  // стоимость всех ингредиентов заказа
  let orderPrice = 0;
  for (const el of orderIngredients) {
    orderPrice += el.price;
  }

  return (
    <Link
      key={_id}
      to={{
        pathname: `${path}/${_id}`,
        state: { background: location },
      }}
    >
      <div className="container">
        <div className={`${orderCardStyles.orderCard} `} onClick={onClick}>
          <div className={`${orderCardStyles.orderCardHeader} `}>
            <div
              className={`${orderCardStyles.orderCardNumber} text text_type_digits-default `}
            >
              #{number}
            </div>
            <div
              className={`${orderCardStyles.orderCardDate} text_color_inactive `}
            >
              <FormattedDate date={new Date(createdAt)} />
            </div>
          </div>
          <div className={`text text_type_main-medium `}>{name}</div>
          <div className={`${orderCardStyles.orderCardFooter} `}>
            <div className={`${orderCardStyles.orderCardIngredients} `}>
              {/* перебираем первые пять ингредиенты заказа */}
              {orderIngredients.slice(0, 5).map((ingredient, idx) => (
                <div key={idx} className={orderCardStyles.ingredientImg}>
                  <img src={ingredient.image_mobile} alt="ingredient"></img>
                </div>
              ))}
              {/* выводим шестой + сколько еще в заказе */}
              {orderIngredients.slice(5).length ? (
                <div className={orderCardStyles.ingredientImg}>
                  <span className="text text_type_main-medium">
                    {`+${orderIngredients.slice(5).length}`}
                  </span>
                  <img src={orderIngredients[5].image_mobile} alt=""></img>
                </div>
              ) : null}
            </div>
            <div className={orderCardStyles.orderCardPrice}>
              <span className="text text_type_digits-default">
                {orderPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
