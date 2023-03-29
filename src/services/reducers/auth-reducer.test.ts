import {
   IUserAuth, IAuthRequest, ILogin, IRegister, IResponseMessage
} from "../../utils/types";
import {
   loginRequest,
   registerRequest,
   logoutRequest,
   getUserRequest,
   userPatchRequest,
   resetPasswordRequest,
   resetPassword,

} from "../actions/auth-actions";

import { authReducer, initialState } from "./auth-reducer";

describe("auth reducer", () => {

   const id = "id";
   const testUser: IUserAuth = { email: "email", name: "name" };
   const testDataAuth: IAuthRequest = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      success: true,
      user: testUser,
   };

   const testLogin: ILogin = {
      email: "email",
      password: "password",
   };

   const testRegister: IRegister = {
      ...testLogin,
      name: "name",
   };
   const mockDataMessage: IResponseMessage = {
      message: "error",
   };

   it("should return the initial state", () => {
      expect(authReducer(undefined, { type: undefined })).toEqual(
         initialState
      );
   });

   //  login cases
   it("should handle loginRequest.pending", () => {
      const state = authReducer(undefined, loginRequest.pending(id, testLogin));
      expect(state.loading).toBe(true);
   });

   it("should handle loginRequest.fulfilled", () => {
      const state = authReducer(
         undefined,
         loginRequest.fulfilled(testDataAuth, id, testLogin)
      );
      expect(state.user).toEqual(testUser);
   });

   it("should handle loginRequest.rejected", () => {
      const state = authReducer(
         undefined,
         loginRequest.rejected(null, id, testLogin)
      );
      expect(state.error).toBe(true);
   });

   // register cases  
   it("should handle registerRequest.pending", () => {
      const state = authReducer(
         undefined,
         registerRequest.pending(id, testRegister)
      );
      expect(state.loading).toBe(true);
   });

   it("should handle registerRequest.fulfilled", () => {
      const state = authReducer(
         undefined,
         registerRequest.fulfilled(testDataAuth, id, testRegister)
      );
      expect(state.user).toEqual(testUser);
   });

   it("should handle registerRequest.rejected", () => {
      const state = authReducer(
         undefined,
         registerRequest.rejected(null, id, testRegister)
      );
      expect(state.error).toBe(true);
   });

   // logout cases  
   it("should handle logoutRequest.pending", () => {
      const state = authReducer(undefined, logoutRequest.pending(id));
      expect(state.loading).toBe(true);
   });

   it("should handle logoutRequest.fulfilled", () => {
      const state = authReducer(
         undefined,
         logoutRequest.fulfilled(mockDataMessage, id)
      );
      expect(state).toEqual(initialState);
   });

   it("should handle logoutRequest.rejected", () => {
      const state = authReducer(undefined, logoutRequest.rejected(null, id));
      expect(state.error).toBe(true);
   });

   // getUserRequest cases  
   it("should handle getUserRequest.pending", () => {
      const state = authReducer(undefined, getUserRequest.pending(id));
      expect(state.loading).toBe(true);
   });

   it("should handle getUserRequest.fulfilled", () => {
      const state = authReducer(
         undefined,
         getUserRequest.fulfilled(testDataAuth, id)
      );
      expect(state.user).toEqual(testUser);
      expect(state.loading).toBe(false);
   });

   it("should handle getUserRequest.rejected", () => {
      const state = authReducer(undefined, getUserRequest.rejected(null, id));
      expect(state.error).toBe(true);
      expect(state.isAuthChecked).toBe(true);
   });

   // userPatch cases   
   it("should handle userPatch.pending", () => {
      const state = authReducer(
         undefined,
         userPatchRequest.pending(id, testRegister)
      );
      expect(state.loading).toBe(true);
   })

   it("should handle userPatch.fulfilled", () => {
      const state = authReducer(
         undefined,
         userPatchRequest.fulfilled(testDataAuth, id, testRegister)
      );
      expect(state.user).toEqual(testUser);
   });

   it("should handle userPatch.rejected", () => {
      const state = authReducer(
         undefined,
         userPatchRequest.rejected(null, id, testRegister)
      );
      expect(state.error).toBe(true);
   });

   // reset password request cases
   it("should handle resetPasswordRequest.pending", () => {
      const state = authReducer(undefined, resetPasswordRequest.pending(id, testUser));
      expect(state.sentResetSuccess).toBe(false);
      expect(state.loading).toBe(true);
   });

   it("should handle resetPasswordRequest.fulfilled", () => {
      const state = authReducer(undefined, resetPasswordRequest.fulfilled(null, id, testUser));
      expect(state.sentResetSuccess).toBe(true);
      expect(state.loading).toBe(false);
   });

   it("should handle resetPasswordRequest.rejected", () => {
      const state = authReducer(undefined, resetPasswordRequest.rejected(null, id, testUser));
      expect(state.sentResetSuccess).toBe(false);
      expect(state.error).toBe(true);
   });

   // reset password cases
   it("should handle resetPassword.pending", () => {
      const state = authReducer(undefined, resetPassword.pending(id, testRegister));
      expect(state.resetPassDone).toBe(false);
      expect(state.loading).toBe(true);
   });

   it("should handle resetPassword.fulfilled", () => {
      const state = authReducer(undefined, resetPassword.fulfilled(testDataAuth, id, testRegister));
      expect(state.resetPassDone).toBe(true);
      expect(state.loading).toBe(false);
   });

   it("should handle resetPassword.rejected", () => {
      const state = authReducer(undefined, resetPassword.rejected(null, id, testRegister));
      expect(state.resetPassDone).toBe(false);
      expect(state.error).toBe(true);
   });



})


