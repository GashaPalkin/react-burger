import React from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import ingredientsStyles from "../burger-ingredients/burger-ingredients.module.css";

export const IngredientDetails = ({ currentIngredient }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

//Типизация компонентов
IngredientDetails.propTypes = {
  currentIngredient: PropTypes.shape(ingredientType)
}
