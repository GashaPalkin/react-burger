import { useMemo, useCallback, forwardRef } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import ingredientsStyles from "./burger-ingredients.module.css";
import { IngredientElement } from "./ingredient-element";
import { setDetails } from "../../services/reducers/ingredient-details-reducer";
import { CategoryType } from "../../utils/types";
import { IngredientType } from "../../utils/types";

interface CategoryProps {
  type: CategoryType;
}

export const Category = forwardRef<HTMLDivElement, CategoryProps>(
  ({ type }, ref) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((store) => store.ingredientsReducer);
    const openIngredientDetails = useCallback(
      (value: IngredientType) => {
        dispatch(setDetails(value));
      },
      [dispatch]
    );
    // перебор карточек ингредиентов по категоряи
    const cardsList = useMemo(
      () =>
        data
          .filter((el: IngredientType) => el.type === type.value)
          .map((element: IngredientType) => (
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
  }
);
