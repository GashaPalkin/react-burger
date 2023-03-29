import { fakeIngredients } from "../../utils/fakeData";
import { configureStore } from "@reduxjs/toolkit";
import {
  ingredientsReducer,
} from "./ingredients-reducer";
import {
  getDataFromAPI,
} from "../actions/ingredients-actions";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

describe("store", () => {

  it("should return the initial state", () => {
    const expectedState = {
      data: [],
      loading: false,
      error: false,
    };
    expect(store.getState().ingredients).toEqual(expectedState);
  });
});

describe("ingredients reducer", () => {
  it("should handle getDataFromAPI.pending", () => {
    const initialState = {
      data: [],
      loading: false,
      error: false,
    };
    const action = { type: getDataFromAPI.pending.type };
    const newState = ingredientsReducer(initialState, action);
    const expectedState = {
      data: [],
      loading: true,
      error: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it("should handle getDataFromAPI.fulfilled", () => {
    const initialState = {
      data: [],
      loading: true,
      error: false,
    };
    const action = {
      type: getDataFromAPI.fulfilled.type,

      payload: { data: [fakeIngredients] },
    };
    const newState = ingredientsReducer(initialState, action);
    const expectedState = {
      data: [fakeIngredients],
      loading: false,
      error: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it("should handle getDataFromAPI.rejected() action", () => {
    const state = ingredientsReducer(
      undefined,
      getDataFromAPI.rejected(null, "id")
    );
    expect(state.error).toBe(true);
  });
});

