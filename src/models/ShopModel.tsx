export interface IShopItem {
  id: string;
  name: string;
  cost: number;
}

export interface IShopState {
  data: IShopItem[];
  loaded: boolean;
  loading: boolean;
}

export interface ITransactionState {
  shoppingSuccess: boolean;
  loaded: boolean;
  loading: boolean;
}

export const shopState = {
  data: [],
  loaded: false,
  loading: false,
};

export const transactionState = {
  shoppingSuccess: false,
  loaded: false,
  loading: false,
};
