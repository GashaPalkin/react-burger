import { createSlice } from "@reduxjs/toolkit";
import { getDataFromAPI } from "../actions/ingredients-actions";

export const ingredients = createSlice({
  name: 'ingredients',
  initialState: {
    data: [],
    loading: false,
    error: false
  },
  reducers: {
    // стандартная логика редуктора с авто-генерируемыми типами операции для каждого редуктора
    // см. https://reactdev.ru/libs/redux-toolkit/#createasyncthunk    
  },
  extraReducers: (builder) =>
    builder
      .addCase(getDataFromAPI.fulfilled, (_draft, action) => {
        return {
          data: action.payload.data,
        }
      })
      .addCase(getDataFromAPI.rejected, (state, action) => {
        state.error = true
      })
      .addCase(getDataFromAPI.pending, (state) => {
        state.loading = true
      })
})

export const ingredientsReducer = ingredients.reducer




