import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { categoryPropType } from "../../utils/types";
import { useMemo, useCallback, forwardRef } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import ingredientsStyles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import { useDrag } from "react-dnd";
import {
  addIngredient,
  setBun,
} from "../../services/reducers/constructor-reducer";

import { IngredientDetails } from "../ingredient-details/ingredient-details";

import {
  clearDetails,
  setDetails,
} from "../../services/reducers/ingredient-details-reducer";

// карточка товара. dragElement здесь и надо использовать useDrag
const IngredientElement = ({ element, onClick }) => {
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

// без forwardRef не работает... консоль подсказала. Разобраться подробнее!
export const Category = forwardRef(({ type }, ref) => {
  const dispatch = useDispatch();
  // данные из store
  const { data } = useSelector((store) => store.ingredientsReducer);
  // для modal
  const details = useSelector((store) => store.ingredientDetailsReducer);

  const closeIngredientDetails = useCallback(() => {
    dispatch(clearDetails());
  }, [dispatch]);

  const openIngredientDetails = useCallback(
    (value) => {
      dispatch(setDetails(value));
    },
    [dispatch]
  );

  // перебор карточек ингредиентов по категоряи
  const cardsList = useMemo(
    () =>
      data
        .filter((el) => el.type === type.value)
        .map((element) => (
          <IngredientElement
            key={element._id}
            element={element}
            onClick={() => openIngredientDetails(element)}
          />
        )),
    [data, type, openIngredientDetails]
  );

  return (
    <div ref={ref}>
      <h2
        className={`${ingredientsStyles.typeTitle} text text_type_main-medium mt-10 mb-6`}
      >
        {type.text || type.value}
      </h2>
      <div className={`${ingredientsStyles.cardList} `}>{cardsList}</div>

      {details && (
        <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
          <IngredientDetails currentIngredient={details} />
        </Modal>
      )}
    </div>
  );
});

// Типизация
IngredientElement.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};

Category.propTypes = {
  type: categoryPropType.isRequired,
};
