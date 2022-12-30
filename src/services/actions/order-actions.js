import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
const postURL = BASE_URL + "/orders";

export const sentOrder = createAsyncThunk(
  `order/sentOrder`,  
  async (body) => request(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

)