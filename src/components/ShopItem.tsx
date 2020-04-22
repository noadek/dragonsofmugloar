import React from 'react';
import { IShopItem } from '../models/ShopModel';

interface IProp {
  content: IShopItem;
  buyItem(itemId: string): void;
}

function ShopItem({ content, buyItem }: IProp): JSX.Element {
  const { id, name, cost } = content;

  return (
    <tr id={id}>
      <td>{name}</td>
      <td>{cost}</td>
      <td className="text-right">
        <button type="button" onClick={() => buyItem(id)}>
          Buy
        </button>
      </td>
    </tr>
  );
}

export default ShopItem;
