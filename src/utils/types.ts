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

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}

export interface IAuthRequest {
  success: boolean;
  user: IUserAuth;
  accessToken: string;
  refreshToken: string;
}

export type TUserPatch = {
  email?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
};

export interface IResponseMessage {
  message: string;
}

export type TResetPass = {
  password?: string | undefined;
  token?: string | undefined;
};

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



