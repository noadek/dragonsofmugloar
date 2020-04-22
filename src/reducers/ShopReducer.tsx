import { IShopItem, IShopState, ITransactionState } from '../models/ShopModel';
import ShopAction from '../actions/ShopAction';

export interface IAction {
  type: string;
  payload?: IShopItem[];
}

export interface ITransactionAction {
  type: string;
  payload?: boolean;
}

function shopReducer(state: IShopState, action: IAction): IShopState {
  switch (action.type) {
  case ShopAction.LOAD_SHOP:
    return {
      ...state,
      loading: true,
    };

  case ShopAction.LOAD_SHOP_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      loaded: true,
    };

  case ShopAction.LOAD_SHOP_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
    };

  default:
    return state;
  }
}

function transactionReducer(
  state: ITransactionState,
  action: ITransactionAction,
): ITransactionState {
  switch (action.type) {
  case ShopAction.LOAD_TRANSACTION:
    return {
      ...state,
      loading: true,
    };

  case ShopAction.LOAD_TRANSACTION_SUCCESS:
    return {
      ...state,
      shoppingSuccess: action.payload,
      loading: false,
      loaded: true,
    };

  case ShopAction.LOAD_TRANSACTION_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
    };

  default:
    return state;
  }
}

export { shopReducer, transactionReducer };
