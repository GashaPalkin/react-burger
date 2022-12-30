import { categoryPropType } from "../../utils/types";
import { useMemo, useCallback, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ingredientsStyles from "./burger-ingredients.module.css";
import { IngredientElement } from "./ingredient-element";

import { 
  setDetails,
} from "../../services/reducers/ingredient-details-reducer";

// Можно лучше: forwardRef достаточно вызвать в конце. То есть вы пишите компонент как всегда, а потом внизу, около импорта
// export const Category = forwardRef((props, ref) => <CategoryElement forwardRef={ref} {...props}/>)

// разобраться подробнее с forwardRef
export const Category = forwardRef(({ type }, ref) => {
  const dispatch = useDispatch();
  // данные из store
  const { data } = useSelector((store) => store.ingredientsReducer);

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
    </div>
  );
});

// Типизация
Category.propTypes = {
  type: categoryPropType.isRequired,
};
