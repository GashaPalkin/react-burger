import { createSlice } from "@reduxjs/toolkit";
import { sentOrder, getOrderDetails } from "../actions/order-actions";
import { Order } from "../../utils/types"

interface OrderStore {
  orderNumber: number | null;
  orderDetails: Order | null,
  loading: boolean;
  error: boolean;
}

export const initialState: OrderStore = {
  orderNumber: null,
  orderDetails: null,
  loading: false,
  error: false
}

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder() {
      return { ...initialState }
    },
    clearOrderDetails() {
      return { ...initialState }
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(sentOrder.fulfilled, (_draft, { payload }) => {
        return {
          orderNumber: payload.order.number,
          orderDetails: null,
          error: false,
          loading: false,
        };
      }
      )
      .addCase(sentOrder.rejected, (state, action) => {
        state.error = true
        // console.log(action.error)
      })
      .addCase(sentOrder.pending, (state) => {
        state.loading = true
      })
      // детали ордера 
      .addCase(getOrderDetails.fulfilled, (_draft, { payload: { orders } }) => {
        return {
          orderNumber: null,
          orderDetails: orders.length ? orders[0] : null,
          error: false,
          loading: false,
        };
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
})

export const {
  clearOrder,
  clearOrderDetails
} = order.actions

export const orderReducer = order.reducer
