import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { getCookie } from "../../utils/utils";
const postURL = BASE_URL + "/orders";

export interface IOrderSentRequest {
  ingredients: string[];
}

export const sentOrder = createAsyncThunk(
  `order/sentOrder`,
  async (body: IOrderSentRequest) => request(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie('accessToken') || "",
    },
    body: JSON.stringify(body),

  })
)


