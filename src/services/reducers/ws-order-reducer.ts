import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions/ws-orders-actions";
import { WebSocketStatus, Order } from "../../utils/types";

type TInitialOrdersState = {
  status: WebSocketStatus,
  connectionError: string,
  orders: Order[],
  total: number,
  totalToday: number
}

const initialState: TInitialOrdersState = {
  status: WebSocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsOrderReducer = createReducer(initialState, (builder) => {
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
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
})

