import { createAsyncThunk } from "@reduxjs/toolkit";

const postURL = "https://norma.nomoreparties.space/api/orders";

export const sentOrder = createAsyncThunk(
  `order/sentOrder`,
  async (body) => {
    let res = await fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const response = await res.json();
      // console.log(response);
      // payload в order-reducer
      return response;
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
)