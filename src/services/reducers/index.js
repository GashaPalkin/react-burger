import { configureStore } from '@reduxjs/toolkit';

import { ingredientsReducer } from "./ingredients-reducer";
import { constructorReducer } from "./constructor-reducer";
import { orderReducer } from "./order-reducer";
import { ingredientDetailsReducer } from "./ingredient-details-reducer";

const reducer = {
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  ingredientDetailsReducer
}

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

