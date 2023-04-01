import { ingredientDetailsReducer, setDetails, clearDetails } from "./ingredient-details-reducer";
import { fakeOneIngredient } from "../../utils/fakeData";

describe("ingredientDetailsReducer", () => {

   it("should return the initial state", () => {
     expect(ingredientDetailsReducer(undefined, { type: "" })).toEqual(null);
   });
 
   it("should handle setDetails", () => {
     const details = { fakeOneIngredient };
     expect(ingredientDetailsReducer(null, setDetails(details))).toEqual(details);
   });
 
   it("should handle clearDetails", () => {
     expect(ingredientDetailsReducer(undefined, clearDetails())).toEqual(null);
   });
   
 });