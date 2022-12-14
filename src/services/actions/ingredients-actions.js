import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDataFromAPI = createAsyncThunk(
  // отображается в dev tools и должно быть уникально у каждого Thunk
  `ingredients/getDataFromAPI`,
  async () => {
    const dataURL = "https://norma.nomoreparties.space/api/ingredients";
    const res = await fetch(dataURL);
    if (res.ok) {
      const response = await res.json();
      return response.data;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)
