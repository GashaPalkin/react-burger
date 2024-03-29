import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request, checkResponse } from "../../utils/request";
import { setCookie, getCookie } from "../../utils/utils";
import { IAuthRequest, ILogin, IRegister, TUserPatch, IResponseMessage, TResetPass  } from "../../utils/types";

const registerURL = BASE_URL + "/auth/register";
const loginURL = BASE_URL + "/auth/login";
const logoutURL = BASE_URL + "/auth/logout";
const refreshTokenURL = BASE_URL + "/auth/token";
const userURL = BASE_URL + "/auth/user"
const resetPassURL = BASE_URL + "/password-reset"
const resetPassResetURL = BASE_URL + "/password-reset/reset"

export const registerRequest = createAsyncThunk(
  `auth/registerRequest`,
  async (body: IRegister) =>
    await request(registerURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
)

export const loginRequest = createAsyncThunk(
  `auth/loginRequest`,
  async (body:ILogin) =>
    await request(loginURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
)

export const logoutRequest = createAsyncThunk<IResponseMessage>(
  `auth/logoutRequest`,
  async () =>
    await request(logoutURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie('refreshToken') }),
    })
)

const refreshToken = () => {
  return request(refreshTokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  });
};

const fetchWithRefresh = async (url: string, options: RequestInit | undefined | any) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie('refreshToken', refreshData.refreshToken);      
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(err)
    }
  }
};

export const getUserRequest = createAsyncThunk<IAuthRequest>(
  // отображается в dev tools и должно быть уникально у каждого Thunk
  `auth/user/get`,
  async () => {
    return await fetchWithRefresh(userURL, {
      method: "GET",
      headers: {
        authorization: getCookie('accessToken'),
      },
    });
  }
)

export const userPatchRequest = createAsyncThunk(
  `auth/user/patch`,
  async (body: TUserPatch) =>
    await fetchWithRefresh(userURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify(body),
    })
);

export const resetPasswordRequest = createAsyncThunk(
  `auth/resetPasswordRequest`,
  async (body: TUserPatch) =>
    await request(resetPassURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
)

export const resetPassword = createAsyncThunk(
  `auth/resetPassword`,
  async (body: TResetPass) =>
    await request(resetPassResetURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
)

