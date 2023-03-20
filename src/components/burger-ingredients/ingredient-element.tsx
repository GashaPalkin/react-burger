import { FC } from "react";
import { IngredientType } from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import ingredientsStyles from "./burger-ingredients.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  addIngredient,
  setBun,
} from "../../services/reducers/constructor-reducer";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface ElementProps {
  element: IngredientType;
  onClick: () => void;
}

export const IngredientElement: FC<ElementProps> = ({ element, onClick }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // деструктуризация данных из element
  const { image, price, name } = element;
  const _id = element._id;
  // чтобы считать количество в counter
  const { bun, ingredients } = useAppSelector(
    (store) => store.constructorReducer
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredients",
    // element - это payload
    item: element,  
    end: (item, monitor) => {     
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.type === "bun") {
          dispatch(setBun(element));
        } else {
          dispatch(addIngredient(element));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const dragStyle = isDragging ? { opacity: 0 } : {};

  const count =
    element.type === "bun"
      ? bun !== null && bun._id === element._id
        ? 2
        : 0
      : ingredients.filter((el: { _id: string }) => el._id === element._id)
          .length;

  return (    
    <Link
      key={_id}
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}
      className={`${ingredientsStyles.itemCard} ${ingredientsStyles.link} `}
    >
      <div
        className={`${ingredientsStyles.itemCard} `}
        onClick={onClick}
        ref={drag}
        style={dragStyle}
      >
        {!!count && <Counter count={count} size="default" />}
        <img className="centerBlock" src={image} alt={name} />
        <div className={`${ingredientsStyles.itemInfo} `}>
          <span
            className={`${ingredientsStyles.itemPrice} text text_type_digits-default `}
          >
            {price} <CurrencyIcon type="primary" />
          </span>
          <p
            className={`${ingredientsStyles.itemTitle} text text_type_main-default `}
          >
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
};
