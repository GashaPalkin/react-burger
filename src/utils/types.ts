export interface IngredientType {
  // uuid: string | null | undefined;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface CategoryType {
  value: string;
  text: string;
}

export interface IUserAuth {
  name: string;
  email: string;
}

export type Order = {
  ingredients: string[]
  name: string,
  number: number,
  status: string,
  createdAt: string,
  updatedAt: string,
  _id: string
}

export type TAllOrdersData = {
  orders: Order[];
  totalToday: number;
  total: number;
}

export enum WebSocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}



