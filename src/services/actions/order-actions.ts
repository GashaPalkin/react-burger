import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, DETAIL_ORDER } from "../../utils/constants";
import { request } from "../../utils/request";
import { getCookie } from "../../utils/utils";
import { Order } from "../../utils/types";

const postURL = BASE_URL + "/orders";

// перенести все в types?
export interface IOrderSentRequest {
  ingredients: string[];
}

export interface RequestDataStatus {
  success: boolean;
}

export interface RequestOneOrder extends RequestDataStatus {
  order: Order;
}

export interface RequestAllOrders extends RequestDataStatus {
  orders: Order[];
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

  }))

export const getOrderDetails = createAsyncThunk(
  `order/getOrderDetails`,
  async (number: string) =>
    request(`${DETAIL_ORDER}/${number}`)
);



