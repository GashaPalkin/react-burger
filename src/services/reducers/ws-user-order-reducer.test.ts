
import { wsUserOrderReducer, initialState } from './ws-user-order-reducer';
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions/ws-user-order-actions";
import { WebSocketStatus } from "../../utils/types";
import { fakeOrders } from "../../utils/fakeData";

describe('wsUserOrderReducer', () => {  

   it('should return the initial state', () => {
      expect(wsUserOrderReducer(undefined, {type: undefined})).toEqual(initialState);
   });

   it('should handle wsConnecting', () => {
      expect(wsUserOrderReducer(initialState, wsConnecting())).toEqual({
         ...initialState,
         status: WebSocketStatus.CONNECTING
      });
   });

   it('should handle wsOpen', () => {
      expect(wsUserOrderReducer(initialState, wsOpen())).toEqual({
         ...initialState,
         status: WebSocketStatus.ONLINE,
         connectionError: ''
      });
   });

   it('should handle wsClose', () => {
      expect(wsUserOrderReducer(initialState, wsClose())).toEqual({
         ...initialState,
         status: WebSocketStatus.OFFLINE
      });
   });

   it('should handle wsError', () => {
      const error = 'Test error';
      expect(wsUserOrderReducer(initialState, wsError(error))).toEqual({
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
      expect(wsUserOrderReducer(initialState, wsMessage(payload))).toEqual({
        ...initialState,
        userOrders: payload.orders,
        total: payload.total,
        totalToday: payload.totalToday
      });
    });

});