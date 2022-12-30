import { createSlice } from "@reduxjs/toolkit";
import { registerRequest, loginRequest, logoutRequest, getUserRequest, userPatchRequest, resetPasswordRequest, resetPassword } from "../actions/auth-actions";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

const initialState = {
  user: null,
  loading: false,
  error: false,
  sentResetSuccess: false,
  resetPassDone: false
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  // стандартная логика редуктора с авто-генерируемыми типами операции для каждого редуктора
  // см. https://reactdev.ru/libs/redux-toolkit/#createasyncthunk    
  reducers: {},
  extraReducers: (builder) =>
    builder
      // register cases
      .addCase(registerRequest.fulfilled, (_draft, action) => {
        let accessToken = action.payload.accessToken;
        let refreshToken = action.payload.refreshToken;
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return {
          user: action.payload.user,
          loading: false,
        }
      })
      .addCase(registerRequest.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(registerRequest.pending, (state) => {
        state.loading = true
      })
      // login cases
      .addCase(loginRequest.fulfilled, (_draft, action) => {
        let accessToken = action.payload.accessToken;
        let refreshToken = action.payload.refreshToken;
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return {
          user: action.payload.user,
          loading: false,

        }
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(loginRequest.pending, (state) => {
        state.loading = true
      })
      // logout cases
      .addCase(logoutRequest.fulfilled, (_draft, action) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        return {
          user: null,
          loading: false,
        }
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.error = true
        console.log(action.error)
      })
      .addCase(logoutRequest.pending, (state) => {
        state.loading = true
      })

      // getUser cases     
      .addCase(getUserRequest.fulfilled, (_draft, action) => {
        return {
          user: action.payload.user,
          loading: false,
        }
      })
      .addCase(getUserRequest.rejected, (state, action) => {
        state.error = true
        state.isAuthChecked = true
      })
      .addCase(getUserRequest.pending, (state) => {
        state.loading = true
      })

      // userPatch cases
      .addCase(userPatchRequest.fulfilled, (_draft, action) => {
        return {
          user: action.payload.user,
          loading: false,
        }
      })
      .addCase(userPatchRequest.rejected, (state) => {
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
      .addCase(resetPasswordRequest.fulfilled, (_draft, action) => {
        return {
          sentResetSuccess: true,
          loading: false,
        }
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
      .addCase(resetPassword.fulfilled, (_draft, action) => {
        return {
          resetPassDone: true,
          loading: false,
        }
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
