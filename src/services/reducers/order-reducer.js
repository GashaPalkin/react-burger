import { createSlice } from "@reduxjs/toolkit";
import { sentOrder } from "../actions/order-actions";

const initialState = {
  orderNumber: null,
  loading: false,
  error: false
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
      .addCase(sentOrder.fulfilled, (_draft, { payload }) => {
        return {
          orderNumber: payload.order.number,
        }
      })
      .addCase(sentOrder.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(sentOrder.pending, (state) => {
        state.loading = true
      })
})

export const {
  clearOrder
} = order.actions


export const orderReducer = order.reducer
