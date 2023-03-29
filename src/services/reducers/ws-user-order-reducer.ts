import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions/ws-user-order-actions";
import { WebSocketStatus, Order } from "../../utils/types";

type TInitialUserOrdersState = {
  status: WebSocketStatus,
  connectionError: string,
  userOrders: Order[]
  total: number,
  totalToday: number
}

export const initialState: TInitialUserOrdersState = {
  status: WebSocketStatus.OFFLINE,
  connectionError: '',
  userOrders: [],
  total: 0,
  totalToday: 0
};

export const wsUserOrderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebSocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.userOrders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
})

