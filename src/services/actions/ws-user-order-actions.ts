import { createAction } from '@reduxjs/toolkit';
import { TAllOrdersData }  from "../../utils/types";

export const connect = createAction<string, 'USER_ORDERS_CONNECT'>('USER_ORDERS_CONNECT');
export const disconnect = createAction('USER_ORDERS_DISCONNECT');

export const wsConnecting = createAction('WS_USER_ORDERS_CONNECTING');
export const wsOpen = createAction('WS_USER_ORDERS_OPEN');
export const wsClose = createAction('WS_USER_ORDERS_CLOSE');
export const wsMessage = createAction<TAllOrdersData, 'WS_USER_ORDERS_MESSAGE'>('WS_USER_ORDERS_MESSAGE');
export const wsError = createAction<string, 'WS_USER_ORDERS_ERROR'>('WS_USER_ORDERS_ERROR');


