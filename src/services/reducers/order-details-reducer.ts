import { createSlice } from "@reduxjs/toolkit";

export const orderDetails = createSlice({
   name: 'orderDetails',
   initialState: null,
   reducers: {
      setOrderDetails(_draft, { payload }) {
         return payload
      },
      clearOrderDetails() {
         return null
      }
   }
})

export const {
   setOrderDetails,
   clearOrderDetails
} = orderDetails.actions

export const orderDetailsReducer = orderDetails.reducer
