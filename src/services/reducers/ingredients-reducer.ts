import { createSlice } from "@reduxjs/toolkit";
import { getDataFromAPI } from "../actions/ingredients-actions";
import { IngredientType } from "../../utils/types";

interface IAllIngredientsState {
  data: IngredientType[];
  loading: boolean;
  error: boolean;
}
const initialState: IAllIngredientsState = {
  data: [],
  loading: false,
  error: false,
};

export const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder    
      .addCase(getDataFromAPI.fulfilled, (_draft, { payload: { data } }) => {
        return {
          data,
          error: false,
          loading: false,
        };
      })
      .addCase(getDataFromAPI.rejected, (state, action) => {
        state.error = true
      })
      .addCase(getDataFromAPI.pending, (state) => {
        state.loading = true
      })
})

export const ingredientsReducer = ingredients.reducer




