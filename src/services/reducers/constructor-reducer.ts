import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { IngredientType } from "../../utils/types";

export interface IUuidType extends IngredientType {
  uuid: string;
}

type TBunType = IngredientType | null;

export interface IConstructorState {
  bun: TBunType;
  ingredients: IUuidType[];
}

export const initialState: IConstructorState = {
  bun: null,
  ingredients: []
}

export const constructor = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TBunType>) {
      state.bun = action.payload;
    },
    removeBun(state) {
      state.bun = null
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<IUuidType>) => {
        state.ingredients.push(action.payload)
      },
      prepare: (ingredient: IngredientType) => ({ payload: { ...ingredient, uuid: uuidv4() } })
    },
    deleteIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(el => el.uuid !== action.payload)
    },
    moveIngredient(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      const { dragIndex, hoverIndex } = action.payload
      // меняем местами элементы
      state.ingredients.splice(hoverIndex, 0, state.ingredients.splice(dragIndex, 1)[0])
    },
    clearConstructor() {
      return { ...initialState }
    }
  }
})

export const {
  setBun,
  removeBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor
} = constructor.actions

export const constructorReducer = constructor.reducer
