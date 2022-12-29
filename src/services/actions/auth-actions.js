import { createAsyncThunk } from "@reduxjs/toolkit";
const registerURL = "https://norma.nomoreparties.space/api/auth/register";
const loginURL = "https://norma.nomoreparties.space/api/auth/login";
const logoutURL = "https://norma.nomoreparties.space/api/auth/logout";
const refreshTokenURL = "https://norma.nomoreparties.space/api/auth/token";
const userURL = "https://norma.nomoreparties.space/api/auth/user"
const resetPassURL = "https://norma.nomoreparties.space/api/password-reset"
const resetPassResetURL = "https://norma.nomoreparties.space/api/password-reset/reset"

export const registerRequest = createAsyncThunk(
  `auth/registerRequest`,
  async (body) => {
    let res = await fetch(registerURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const response = await res.json();
      // response - это payload в auth-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)

export const loginRequest = createAsyncThunk(
  `auth/loginRequest`,
  async (body) => {
    let res = await fetch(loginURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const response = await res.json();
      // payload в auth-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)

export const logoutRequest = createAsyncThunk(
  `auth/logoutRequest`,
  async () => {
    let res = await fetch(logoutURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    if (res.ok) {
      const response = await res.json();
      // payload в auth-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = createAsyncThunk(
  `auth/refreshToken`,
  async (body) => {
    let res = await fetch(refreshTokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    });
    if (res.ok) {
      const response = await res.json();
      // payload в auth-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)

const fetchWithRefresh = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(err)
    }
  }
};

export const getUserRequest = createAsyncThunk(
  // отображается в dev tools и должно быть уникально у каждого Thunk
  `auth/user/get`,
  async () => {
    const res = await fetchWithRefresh(userURL, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem('accessToken')
      },
    });
    if (res.ok) {
      const response = await res.json();
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)

export const userPatchRequest = createAsyncThunk(
  `auth/user/patch`,
  async (body) =>
    await fetchWithRefresh(userURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify(body),
    })
);

export const resetPasswordRequest = createAsyncThunk(
  `auth/resetPasswordRequest`,
  async (body) => {
    let res = await fetch(resetPassURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const response = await res.json();
      // payload в auth-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)

export const resetPassword = createAsyncThunk(
  `auth/resetPassword`,
  async (body) => {
    let res = await fetch(resetPassResetURL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const response = await res.json();
      // payload в auth-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)

