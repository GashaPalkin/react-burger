import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from "./ingredients-reducer";
import { constructorReducer } from "./constructor-reducer";
import { orderReducer } from "./order-reducer";
import { ingredientDetailsReducer } from "./ingredient-details-reducer";
import { orderDetailsReducer } from "../../services/reducers/order-details-reducer";
import { authReducer } from "./auth-reducer";
import { wsOrderReducer } from "./ws-order-reducer";
import { wsUserOrderReducer } from "./ws-user-order-reducer";
import { createSocketMiddleware, TwsActionTypes } from "../middleware/socket-middleware";

import {
  connect as connectAllOrders,
  disconnect as disconnectAllOrders,
  wsConnecting as connectingAllOrders,
  wsOpen as openAllOrders,
  wsClose as closeAllOrders,
  wsMessage as messageAllOrders,
  wsError as errorAllOrders
} from "../actions/ws-orders-actions";

import {
  connect as connectUserOrders,
  disconnect as disconnectUserOrders,
  wsConnecting as connectingUserOrders,
  wsOpen as openUserOrders,
  wsClose as closeUserOrders,
  wsMessage as messageUserOrders,
  wsError as errorUserOrders
} from "../actions/ws-user-order-actions";

// ? в пачке написали что можно 2 middleware делать / наверное можно какой то хук сочинить / но пока так
const wsActions: TwsActionTypes = {
  wsConnect: connectAllOrders,
  wsDisconnect: disconnectAllOrders,
  wsConnecting: connectingAllOrders,
  onOpen: openAllOrders,
  onClose: closeAllOrders,
  onError: errorAllOrders,
  onMessage: messageAllOrders,
  // 
  wsConnectUser: connectUserOrders,
  wsDisconnectUser: disconnectUserOrders,
  wsConnectingUser: connectingUserOrders,
  onOpenUser: openUserOrders,
  onCloseUser: closeUserOrders,
  onErrorUser: errorUserOrders,
  onMessageUser: messageUserOrders,
};

const reducer = {
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
  authReducer,
  wsOrderReducer,
  wsUserOrderReducer
}

const ordersSocketMiddleware = createSocketMiddleware(wsActions);

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(ordersSocketMiddleware);
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

