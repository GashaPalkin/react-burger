import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
const dataURL = BASE_URL + "/ingredients";
export const getDataFromAPI = createAsyncThunk(
  // отображается в dev tools и должно быть уникально у каждого Thunk
  `ingredients/getDataFromAPI`,
  async () => await request(dataURL)
)
