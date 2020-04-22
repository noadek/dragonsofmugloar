import MessageAction from '../actions/MessageAction';
import {
  IMessageState, IMessage, ISolution, ISolutionState,
} from '../models/MessageModel';

export interface IAction {
  type: string;
  payload?: IMessage[];
  id?: string;
}

export interface ISolutionAction {
  type: string;
  payload?: ISolution;
}

function messageReducer(state: IMessageState, action: IAction): IMessageState {
  switch (action.type) {
  case MessageAction.LOAD_MESSAGE:
    return {
      ...state,
      loading: true,
    };

  case MessageAction.LOAD_MESSAGE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      loaded: true,
    };

  case MessageAction.LOAD_MESSAGE_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
    };

  case MessageAction.REMOVE_MESSAGE:
    return {
      ...state,
      data: state.data.filter(message => message.adId !== action.id),
    };

  default:
    return state;
  }
}

function solutionReducer(
  state: ISolutionState,
  action: ISolutionAction,
): ISolutionState {
  switch (action.type) {
  case MessageAction.LOAD_SOLUTION:
    return {
      ...state,
      loading: true,
    };

  case MessageAction.LOAD_SOLUTION_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      loaded: true,
    };

  case MessageAction.LOAD_SOLUTION_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
    };

  default:
    return state;
  }
}


export { messageReducer, solutionReducer };
