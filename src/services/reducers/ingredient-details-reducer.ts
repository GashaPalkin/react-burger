import { createSlice } from "@reduxjs/toolkit";

export const ingredientDetails = createSlice({
  name: 'ingredientDetails',
  initialState: null,
  reducers: {
    setDetails(_draft, { payload }) {
      return payload
    },
    clearDetails() {
      return null
    }
  }
})

export const {
  setDetails,
  clearDetails
} = ingredientDetails.actions

export const ingredientDetailsReducer = ingredientDetails.reducer
