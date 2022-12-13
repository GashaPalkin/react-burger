import { createSlice } from "@reduxjs/toolkit";
import { getDataFromAPI } from "../actions/ingredients-actions";

export const ingredients = createSlice({
  name: 'ingredients',
  initialState: {
    data: []
  },
  reducers: {
    // стандартная логика редуктора с авто-генерируемыми типами операции для каждого редуктора
    // см. https://reactdev.ru/libs/redux-toolkit/#createasyncthunk    
  },
  extraReducers: (builder) =>
    builder
      // Запрос успешно выполнился / надо еще другие случаи описать?
      .addCase(getDataFromAPI.fulfilled, (_draft, action) => {
        return {
          // !? payload.data правильнее ?
          data: action.payload,
        }
      })
})

export const ingredientsReducer = ingredients.reducer




