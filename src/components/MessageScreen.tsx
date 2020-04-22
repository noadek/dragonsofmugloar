import React, {
  useEffect, useContext, useReducer,
} from 'react';

import GameAPI from '../services/api.service';
import { messageState, solutionState } from '../models/MessageModel';
import PlayerAction from '../actions/PlayerAction';
import { Context } from './PlayerContext';
import { messageReducer, solutionReducer } from '../reducers/MessageReducers';
import MessageAction from '../actions/MessageAction';
import MessageBox from './MessageBox';

function MessagesScreen(): JSX.Element {
  const [player, dispatch, alert, setAlert] = useContext(Context);
  const [messages, messageDispatch] = useReducer(messageReducer, messageState);
  const [solution, solutionDispatch] = useReducer(solutionReducer, solutionState);

  function getMessages(): void {
    messageDispatch({ type: MessageAction.LOAD_MESSAGE });
    GameAPI.getMessages(player.data.gameId)
      .then(response => {
        messageDispatch({
          type: MessageAction.LOAD_MESSAGE_SUCCESS,
          payload: response.data,
        });
        dispatch({ type: PlayerAction.MARK_PLAYER_TURN });
      })
      .catch(() => messageDispatch({ type: MessageAction.LOAD_MESSAGE_FAIL }));
  }

  function solveMessage(adId: string): void {
    solutionDispatch({ type: MessageAction.LOAD_SOLUTION });
    GameAPI.solveMessage(player.data.gameId, adId)
      .then(response => {
        const {
          success, message, lives, gold, score, highScore, turn,
        } = response.data;
        solutionDispatch({
          type: MessageAction.LOAD_SOLUTION_SUCCESS,
          payload: { success, message, adId },
        });
        dispatch({
          type: PlayerAction.LOAD_PLAYER_SUCCESS,
          payload: {
            lives, gold, score, highScore, turn,
          },
        });
        messageDispatch({ type: MessageAction.REMOVE_MESSAGE, id: adId });
      })
      .catch(() => solutionDispatch({ type: MessageAction.LOAD_SOLUTION_FAIL }));
  }

  useEffect(() => {
    if (player.data.gameId.length > 0) {
      getMessages();
    }
  }, [player.data.gameId]);

  useEffect(() => {
    if (solution.loaded) {
      setAlert({
        show: true,
        message: solution.data.message,
        type: solution.data.success ? 'success' : 'danger',
      });
    }
  }, [solution]);

  const messageList = messages.data.map(message => (
    <MessageBox
      key={message.adId}
      content={message}
      turn={player.data.turn - player.turnIndex}
      solveMessage={solveMessage}
    />
  ));

  return (
    <div id="messages">
      <div className="row margin-none">
        <div className="col-6 padding-small">
          <h4 className="margin-none">Quests</h4>
        </div>
        <div className="col-6 padding-small text-right">
          <button
            type="button"
            onClick={getMessages}
          >
            More Quests
          </button>
        </div>
      </div>

      <div className="row">
        {messageList}
      </div>
    </div>
  );
}

export default MessagesScreen;
