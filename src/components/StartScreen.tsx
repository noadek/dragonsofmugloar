import React, { useContext } from 'react';

import PlayerAction from '../actions/PlayerAction';
import GameAPI from '../services/api.service';
import { Context } from './PlayerContext';

function StartScreen(): JSX.Element {
  const [player, dispatch] = useContext(Context);

  function startGame(): void {
    dispatch({ type: PlayerAction.LOAD_PLAYER });
    GameAPI.start()
      .then(response => dispatch({
        type: PlayerAction.LOAD_PLAYER_SUCCESS,
        payload: response.data,
      }))
      .catch(() => dispatch({ type: PlayerAction.LOAD_PLAYER_FAIL }));
  }

  return (
    <div id="start" className="container row flex-middle ">
      <div className="row">
        <div className="text-center">
          <img
            src="assets/dragon1.jpg"
            alt="Dragon"
            className="start-dragon"
          />
          <h1 className="article-title margin-none">Dragons of Mugloar</h1>

          <button
            type="button"
            onClick={startGame}
            className="normal margin-small heartbeat"
          >
            Start
          </button>
          <div className="section padding-small margin-none">
            Hint: Pay attention to your turn count, it may determine which
            quests you can take. Also, take note of what is required for a
            quests and you can go to the shop for necessary items.
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
