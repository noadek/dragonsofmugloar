import React, {
  useEffect, useContext, useReducer,
} from 'react';

import GameAPI from '../services/api.service';
import { Context } from './PlayerContext';
import { shopReducer, transactionReducer } from '../reducers/ShopReducer';
import { shopState, transactionState } from '../models/ShopModel';
import ShopAction from '../actions/ShopAction';
import PlayerAction from '../actions/PlayerAction';
import ShopItem from './ShopItem';

interface IProp {
  shop: boolean;
  leaveShop(): void;
}

function ShopScreen({ shop, leaveShop }: IProp): JSX.Element {
  const [player, dispatch, alert, setAlert] = useContext(Context);
  const [items, itemDispatch] = useReducer(shopReducer, shopState);
  const [transaction, transactionDispatch] = useReducer(
    transactionReducer,
    transactionState,
  );

  function buyItem(itemId: string): void {
    transactionDispatch({ type: ShopAction.LOAD_TRANSACTION });
    GameAPI.buyItem(player.data.gameId, itemId)
      .then(response => {
        const {
          shoppingSuccess, lives, gold, level, turn,
        } = response.data;
        transactionDispatch({
          type: ShopAction.LOAD_TRANSACTION_SUCCESS,
          payload: shoppingSuccess,
        });
        dispatch({ type: PlayerAction.MARK_PLAYER_TURN });
        dispatch({
          type: PlayerAction.LOAD_PLAYER_SUCCESS,
          payload: {
            lives, gold, level, turn,
          },
        });
      })
      .catch(() => transactionDispatch({
        type: ShopAction.LOAD_TRANSACTION_FAIL,
      }));
  }

  useEffect(() => {
    if (player.data.gameId.length > 0) {
      itemDispatch({ type: ShopAction.LOAD_SHOP });
      GameAPI.getShopItems(player.data.gameId)
        .then(response => {
          itemDispatch({
            type: ShopAction.LOAD_SHOP_SUCCESS,
            payload: response.data,
          });
        })
        .catch(() => itemDispatch({ type: ShopAction.LOAD_SHOP_FAIL }));
    }
  }, [player.data.gameId]);

  useEffect(() => {
    if (transaction.loaded) {
      setAlert({
        show: true,
        message: transaction.shoppingSuccess
          ? 'Thank you for shopping'
          : 'Sorry, you cannot afford this item',
        type: transaction.shoppingSuccess ? 'success' : 'danger',
      });
    }
  }, [transaction]);


  const ItemList = items.data.map(item => (
    <ShopItem key={item.id} content={item} buyItem={buyItem} />
  ));

  return (
    <div id="shop" className={shop ? '' : 'hidden'}>
      <div className="row">
        <div className="col-6 padding-small">
          <h4 className="margin-none">shop</h4>
        </div>
      </div>

      <table className="table-hover">
        <thead>
          <tr>
            <th>Items</th>
            <th>Cost</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {ItemList}
        </tbody>
      </table>
    </div>
  );
}

export default ShopScreen;
