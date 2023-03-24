import { createSlice } from "@reduxjs/toolkit";
import { registerRequest, loginRequest, logoutRequest, getUserRequest, userPatchRequest, resetPasswordRequest, resetPassword } from "../actions/auth-actions";
import { setCookie, deleteCookie } from "../../utils/utils";
import { IUserAuth } from "../../utils/types";

interface IAuthState {
  user: IUserAuth | null;
  loading: boolean;
  error: boolean;
  sentResetSuccess: boolean;
  resetPassDone: boolean;
  isAuthChecked: boolean;
}

const initialState: IAuthState = {
  user: null,
  loading: false,
  error: false,
  sentResetSuccess: false,
  resetPassDone: false,
  isAuthChecked: false
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  // стандартная логика редуктора с авто-генерируемыми типами операции для каждого редуктора
  // см. https://reactdev.ru/libs/redux-toolkit/#createasyncthunk    
  reducers: {},
  extraReducers: (builder) =>
    builder     
      // login cases 
      .addCase(loginRequest.fulfilled, (state, { payload: { accessToken, refreshToken, user } }) => {
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        state.user = user;
        state.loading = false;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(loginRequest.pending, (state) => {
        state.loading = true
      })

      // register cases  
      .addCase(registerRequest.fulfilled, (state, { payload: { accessToken, refreshToken, user } }) => {
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        state.user = user;
        state.loading = false;
      })
      .addCase(registerRequest.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(registerRequest.pending, (state) => {
        state.loading = true
      })  
      .addCase(logoutRequest.fulfilled, () => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        return initialState;
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(logoutRequest.pending, (state) => {
        state.loading = true
      })
      
      .addCase(getUserRequest.fulfilled, (state, { payload: { user } }) => {
        state.user = user;
        state.loading = false;
      })
      .addCase(getUserRequest.rejected, (state) => {
        state.error = true        
        state.isAuthChecked = true
      })
      .addCase(getUserRequest.pending, (state) => {
        state.loading = true
      })
      // userPatch cases
      .addCase(userPatchRequest.fulfilled, (state, { payload: { user } }) => {
        state.user = user;
        state.loading = false;
      })
      .addCase(userPatchRequest.rejected, () => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        return {
          ...initialState,
          error: true,
        };
      })
      .addCase(userPatchRequest.pending, (state) => {
        state.loading = true
      })
      // reset password request cases
      .addCase(resetPasswordRequest.fulfilled, (state) => {
        state.sentResetSuccess = true;
        state.loading = false;
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.sentResetSuccess = false
        state.error = true
        console.log(action.error)
      })
      .addCase(resetPasswordRequest.pending, (state) => {
        state.sentResetSuccess = false
        state.loading = true
      })
    
      // reset password cases
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPassDone = true;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassDone = false
        state.error = true
        console.log(action.error)
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPassDone = false
        state.loading = true
      })

})

export const authReducer = auth.reducer
