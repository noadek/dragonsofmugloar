import React, { useState, useContext, useEffect } from 'react';

import StartScreen from './StartScreen';
import MessagesScreen from './MessageScreen';
import { Context } from './PlayerContext';
import ShopScreen from './ShopScreen';
import Alert from './Alert';
import PlayerAction from '../actions/PlayerAction';

function MainScreen(): JSX.Element {
  const [player, dispatch, alert, setAlert] = useContext(Context);
  const [isShop, setIsShop] = useState(false);

  function toggleShop(): void {
    setIsShop(prev => !prev);
  }

  function dismissAlert(): void {
    setAlert(prev => { return { ...prev, show: false } });
  }

  function backToStart(): void {
    dismissAlert();
    dispatch({
      type: PlayerAction.LOAD_PLAYER_SUCCESS,
      payload: { gameId: '' },
    });
  }

  useEffect(() => {
    const content = document.getElementById('content');
    if (content) {
      content.scrollTop = 0;
    }
  }, [isShop]);

  if (!player.data.gameId) {
    return <StartScreen />;
  }
  return (
    <div id="main" className="container">

      <Alert
        show={alert.show}
        type={alert.type}
        message={alert.message}
        close={dismissAlert}
      />

      <div id="over">
        <input
          className="modal-state"
          id="modal-1"
          type="checkbox"
          checked={player.data.gameId.length > 1 && player.data.lives < 1}
          onChange={() => null}
        />
        <div className="modal">
          <div className="modal-body">
            <h4 className="modal-title">Game Over!</h4>
            <h5 className="modal-subtitle">Score: {player.data.score}</h5>
            <p className="modal-text">{alert.message} Better luck next time :D</p>
            <label
              htmlFor="modal-1"
              className="paper-btn"
              onClick={backToStart}
            >
              Try Again
            </label>
          </div>
        </div>
      </div>

      <div id="screen">
        <div className="header">
          <div className="row">
            <div id="top-left" className="col-6">
              <h4 className="margin-none">
                Lives <span className="badge danger">{player.data.lives}</span>
              </h4>
            </div>
            <div id="top-right" className="col-6 text-right">
              <h4 className="margin-none">
                Score <span className="badge primary">{player.data.score}</span>
              </h4>
            </div>
          </div>
        </div>

        <div id="content" className="content scroll">
          <div className={isShop ? '' : 'hidden'}>
            <ShopScreen shop={isShop} leaveShop={toggleShop} />
          </div>
          <div className={!isShop ? '' : 'hidden'}>
            <MessagesScreen />
          </div>
        </div>

        <div className="footer">
          <div className="row">
            <div className="col-4">
              <h4 className="margin-none">
                Turn&nbsp;
                <span className="badge secondary">
                  {player.data.turn - player.turnIndex}
                </span>
              </h4>
            </div>
            <div className="col-4">
              <h4 className="margin-none text-center">
                Gold <span className="badge warning">{player.data.gold}</span>
              </h4>
            </div>
            <div className="col-4 text-right">
              <button
                type="button"
                onClick={toggleShop}
                disabled={player.data.lives === 0}
              >
                {isShop ? 'Back' : 'Shop'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainScreen;
