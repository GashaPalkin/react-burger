import ingredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
<<<<<<< Updated upstream:src/components/ingredient-details/ingredient-details.jsx

export const IngredientDetails = ({ currentIngredient }) => {
  return (
    <React.Fragment>
=======
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { IngredientType } from "../../utils/types";

type ParamsType = {
  id: string;
};

export const IngredientDetails = () => {
  // ! типизировать store в следующем спринте
  // @ts-ignore
  const { data } = useSelector((store) => store.ingredientsReducer);

  const { id } = useParams<ParamsType>();
  const currentIngredient = data.find((el: IngredientType) => el._id === id);
  // на время пока ищет нужный элемент
  if (!currentIngredient) return <></>;
  return (
    <div className={`${ingredientsStyles.detailWrapper} `}>
>>>>>>> Stashed changes:src/components/ingredient-details/ingredient-details.tsx
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <p className="text text_type_main-medium mt-4">
        {currentIngredient.name}
      </p>
      <div className={`${ingredientsStyles.nutrients} flexRow mt-8`}>
        <div className="centerText">
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </p>
        </div>
        <div className="centerText">
          <p className="text text_type_main-default text_color_inactive">
            Белки,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </p>
        </div>
        <div className="centerText">
          <p className="text text_type_main-default text_color_inactive">
            Жиры,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.fat}
          </p>
        </div>
        <div className="centerText">
          <p className="text text_type_main-default text_color_inactive">
            Углеводы,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </p>
        </div>
      </div>
<<<<<<< Updated upstream:src/components/ingredient-details/ingredient-details.jsx
    </React.Fragment>
  );
};

//Типизация компонентов
IngredientDetails.propTypes = {
  currentIngredient: PropTypes.shape(ingredientType),
};
=======
    </div>
  );
};
>>>>>>> Stashed changes:src/components/ingredient-details/ingredient-details.tsx
