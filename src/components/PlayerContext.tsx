import React, {
  createContext, useReducer, Dispatch, useState,
} from 'react';

import { playerState, IPlayerState } from '../models/PlayerModel';
import playerReducer, { IAction } from '../reducers/PlayerReducer';

interface IAlert {
  show: boolean;
  message: string;
  type: string;
}

export const Context = createContext({} as [
  IPlayerState,
  Dispatch<IAction>,
  IAlert,
  any
]);

function PlayerContext({ children }: any): any {
  const [player, dispatch] = useReducer(playerReducer, playerState);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  return (
    <Context.Provider value={[player, dispatch, alert, setAlert]}>
      {children}
    </Context.Provider>
  );
}

export default PlayerContext;
