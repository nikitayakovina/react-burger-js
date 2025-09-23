export type TOrder = {
  number: number;
};

export type TWSOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt?: string;
  updatedAt: string;
};

export type TCreateOrder = {
  name: string;
  order: { number: number };
  number: number;
  success: boolean;
};

export type TFetchOrderNumber = {
  success: boolean;
  order: TWSOrder;
};
