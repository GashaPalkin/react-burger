import { createSlice } from "@reduxjs/toolkit";
import { sentOrder } from "../actions/order-actions";

const initialState = {
  orderNumber: null,
}

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder() {
      return { ...initialState }
    }
  },
  extraReducers: (builder) =>
    builder
      // надо еще другие случаи описать?
      .addCase(sentOrder.fulfilled, (_draft, { payload }) => {
        return {
          orderNumber: payload.order.number,
        }
      })
})

export const {
  clearOrder
} = order.actions


export const orderReducer = order.reducer
