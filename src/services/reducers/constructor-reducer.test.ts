import { fakeOneIngredient } from "../../utils/fakeData";
import {
   constructorReducer,
   setBun,
   removeBun,
   addIngredient,
   deleteIngredient,
   moveIngredient,
   clearConstructor,
   IUuidType,
   initialState,
} from "./constructor-reducer";

describe("constructorReducer", () => {
   it("should return the initial state", () => {
      expect(constructorReducer(undefined, { type: undefined })).toEqual(
         initialState
      );
   });

   it("should handle setBun", () => {
      expect(constructorReducer(undefined, setBun(fakeOneIngredient))).toMatchObject({ bun: fakeOneIngredient });
   });

   it("should handle removeBun", () => {
      expect(
         constructorReducer(
            { ...initialState, bun: fakeOneIngredient },
            removeBun()
         )
      ).toEqual(initialState);
   });

   it("should handle add ingredient", () => {
      expect(
         constructorReducer(undefined, addIngredient(fakeOneIngredient))
      ).toMatchObject({
         ingredients: expect.arrayContaining([
            expect.objectContaining(fakeOneIngredient),
         ]),
      });
   });

   it("should handle delete ingredient", () => {
      const uuid = "uuid";
      const ingredientWithUuid: IUuidType = {
         ...fakeOneIngredient,
         uuid,
      };
      expect(
         constructorReducer(
            { ...initialState, ingredients: [ingredientWithUuid] },
            deleteIngredient(uuid)
         )
      ).toEqual(initialState);
   });

   it("should handle move ingredient", () => {
      const initialIngredients: IUuidType[] = Array.from(
         { length: 8 },
         (_, index) => ({ ...fakeOneIngredient, uuid: `uuid${index}` })
      );

      const dragIndex = 3;
      const hoverIndex = 6;

      const expectedIngredients = [
         initialIngredients[0],
         initialIngredients[3],
         initialIngredients[1],
         initialIngredients[2],
         initialIngredients[4],
         initialIngredients[5],
         initialIngredients[6],
         initialIngredients[7],
      ];

      expect(
         constructorReducer(
            { ...initialState, ingredients: initialIngredients },
            moveIngredient({ dragIndex, hoverIndex })
         )
      ).toMatchObject({
         ingredients: expect.arrayContaining(expectedIngredients),
      });
   });

   it("should handle clear Constructor", () => {
      expect(
         constructorReducer(
            {
               bun: fakeOneIngredient,
               ingredients: [{ ...fakeOneIngredient, uuid: "uuid" }],
            },
            clearConstructor()
         )
      ).toEqual(initialState);
   });
});
