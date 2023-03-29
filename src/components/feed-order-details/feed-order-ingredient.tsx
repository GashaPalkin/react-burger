import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientType } from "../../utils/types";
import orderDetailsStyles from "./order-details.module.css";
import { FC } from "react";

interface IOrderIngredient {
  ingredient: IngredientType;
  count?: number;
}

export const OrderIngredient: FC<IOrderIngredient> = ({
  ingredient,
  count = 1,
}) => {
  return (
    <div className={orderDetailsStyles.ingredientWrapper}>
      <div>
        <div className={orderDetailsStyles.ingredientImg}>
          <img src={ingredient.image_mobile} alt=""></img>
        </div>
        <div>{ingredient.name}</div>
      </div>
      <div className={orderDetailsStyles.orderCardPrice}>
        <span className="text text_type_digits-default">{count}</span>
        <span className="text text_type_digits-default">X</span>
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
