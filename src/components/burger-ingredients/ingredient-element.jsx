import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import ingredientsStyles from "./burger-ingredients.module.css";
import { useDrag } from "react-dnd";
import {
  addIngredient,
  setBun,
} from "../../services/reducers/constructor-reducer";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientElement = ({ element, onClick }) => {
  const dispatch = useDispatch();
  // деструктуризация данных из element
  const { image, price, name } = element;
  // чтобы считать количество в counter
  const { bun, ingredients } = useSelector((store) => store.constructorReducer);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredients",
    // element - это payload
    item: element,
    // ? разобраться подробнее с end
    end: (item, monitor) => {
      // ? разобраться подробнее с getDropResult()
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
      ? (bun || 0) && (bun._id === element._id) * 2
      : ingredients.filter((el) => el._id === element._id).length;

  return (
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
  );
};

// Типизация
IngredientElement.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};
