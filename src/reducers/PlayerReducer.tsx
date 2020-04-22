import PlayerAction from '../actions/PlayerAction';
import { IPlayerState, IPlayer } from '../models/PlayerModel';

export interface IAction {
  type: string;
  payload?: Partial<IPlayer>;
}

function playerReducer(state: IPlayerState, action: IAction): IPlayerState {
  switch (action.type) {
  case PlayerAction.LOAD_PLAYER:
    return {
      ...state,
      loading: true,
    };

  case PlayerAction.LOAD_PLAYER_SUCCESS:
    return {
      ...state,
      data: { ...state.data, ...action.payload },
      loading: false,
      loaded: true,
    };

  case PlayerAction.LOAD_PLAYER_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
    };

  case PlayerAction.MARK_PLAYER_TURN:
    return {
      ...state,
      turnIndex: state.data.turn,
    };

  default:
    return state;
  }
}

export default playerReducer;
