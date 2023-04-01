import { orderReducer, clearOrder, clearOrderDetails, initialState } from './order-reducer';
import { sentOrder, getOrderDetails } from '../actions/order-actions';
import { fakeOneOrder } from "../../utils/fakeData";

describe('order reducer', () => {

   it('should return the initial state', () => {
      expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
   });

   it('should handle clearOrder', () => {
      const state = {
         orderNumber: 123,
         orderDetails: null,
         loading: false,
         error: false,
      };
      expect(orderReducer(state, clearOrder())).toEqual(initialState);
   });

   it('should handle clearOrderDetails', () => {
      const state = {
         orderNumber: null,
         orderDetails: fakeOneOrder,
         loading: false,
         error: false,
      };
      expect(orderReducer(state, clearOrderDetails())).toEqual(initialState);
   });

   it('should handle sentOrder.fulfilled', () => {
      const payload = { order: { number: 123456 } };
      const action = { type: sentOrder.fulfilled.type, payload };
      const expectedState = {
         orderNumber: 123456,
         orderDetails: null,
         loading: false,
         error: false,
      };
      expect(orderReducer(initialState, action)).toEqual(expectedState);
   });

   it('should handle sentOrder.rejected', () => {
      const action = { type: sentOrder.rejected.type };
      const expectedState = {
         ...initialState,
         error: true,
      };
      expect(orderReducer(initialState, action)).toEqual(expectedState);
   });

   it('should handle sentOrder.pending', () => {
      const action = { type: sentOrder.pending.type };
      const expectedState = {
         ...initialState,
         loading: true,
      };
      expect(orderReducer(initialState, action)).toEqual(expectedState);
   });

   it('should handle getOrderDetails.fulfilled', () => {
      const payload = { orders: [fakeOneOrder] };
      const action = { type: getOrderDetails.fulfilled.type, payload };
      const expectedState = {
         orderNumber: null,
         orderDetails: fakeOneOrder,
         loading: false,
         error: false,
      };
      expect(orderReducer(initialState, action)).toEqual(expectedState);
   });

   it('should handle getOrderDetails.pending', () => {
      const action = { type: getOrderDetails.pending.type };
      const expectedState = {
         ...initialState,
         loading: true,
         error: false,
      };
      expect(orderReducer(initialState, action)).toEqual(expectedState);
   });

   it('should handle getOrderDetails.rejected', () => {
      const action = { type: getOrderDetails.rejected.type };
      const expectedState = {
         ...initialState,
         loading: false,
         error: true,
      };
      expect(orderReducer(initialState, action)).toEqual(expectedState);
   });

});