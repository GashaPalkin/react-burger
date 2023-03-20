import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { request } from "../../utils/request";
import { IngredientType } from "../../utils/types";
const dataURL = BASE_URL + "/ingredients";

export interface IAllIngridients {
  data: IngredientType[];
}

export const getDataFromAPI = createAsyncThunk<IAllIngridients>(
  // отображается в dev tools и должно быть уникально у каждого Thunk
  `ingredients/getDataFromAPI`,
  async () => await request(dataURL)
)
