import { createAction } from '@reduxjs/toolkit';
import { TAllOrdersData } from "../../utils/types";

export const connect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
export const disconnect = createAction('ORDERS_DISCONNECT');

export const wsConnecting = createAction('WS_ORDERS_CONNECTING');
export const wsOpen = createAction('WS_ORDERS_OPEN');
export const wsClose = createAction('WS_ORDERS_CLOSE');
export const wsMessage = createAction<TAllOrdersData, 'WS_ORDERS_MESSAGE'>('WS_ORDERS_MESSAGE');
export const wsError = createAction<string, 'WS_ORDERS_ERROR'>('WS_ORDERS_ERROR');


