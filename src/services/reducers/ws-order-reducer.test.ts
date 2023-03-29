
import { wsOrderReducer, initialState } from './ws-order-reducer';
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions/ws-orders-actions";
import { WebSocketStatus } from "../../utils/types";
import { fakeOrders } from "../../utils/fakeData";

describe('wsUserOrderReducer', () => {  

   it('should return the initial state', () => {
      expect(wsOrderReducer(undefined, {type: undefined})).toEqual(initialState);
   });

   it('should handle wsConnecting', () => {
      expect(wsOrderReducer(initialState, wsConnecting())).toEqual({
         ...initialState,
         status: WebSocketStatus.CONNECTING
      });
   });

   it('should handle wsOpen', () => {
      expect(wsOrderReducer(initialState, wsOpen())).toEqual({
         ...initialState,
         status: WebSocketStatus.ONLINE,
         connectionError: ''
      });
   });

   it('should handle wsClose', () => {
      expect(wsOrderReducer(initialState, wsClose())).toEqual({
         ...initialState,
         status: WebSocketStatus.OFFLINE
      });
   });

   it('should handle wsError', () => {
      const error = 'Test error';
      expect(wsOrderReducer(initialState, wsError(error))).toEqual({
         ...initialState,
         connectionError: error
      });
   });

   it('should handle wsMessage', () => {
      const payload = {
        orders: fakeOrders,
        total: 2,
        totalToday: 1
      };
      expect(wsOrderReducer(initialState, wsMessage(payload))).toEqual({
        ...initialState,
        orders: payload.orders,
        total: payload.total,
        totalToday: payload.totalToday
      });
    });

});