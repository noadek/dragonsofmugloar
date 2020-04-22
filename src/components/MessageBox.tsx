import React from 'react';
import { IMessage } from '../models/MessageModel';

interface IProp {
  content: IMessage;
  turn: number;
  solveMessage(x: string): void;
}

function MessageBox({ content, turn, solveMessage }: IProp): JSX.Element {
  const {
    adId, message, reward, expiresIn, probability,
  } = content;
  const disabled = expiresIn <= turn;
  const suggest = !disabled && probability.toLowerCase() === 'sure thing';

  return (
    <div id={adId} className="sm-12 md-6 col">
      <div className={`card ${(suggest) ? 'background-success' : ''}`}>
        <div className="card-body">
          <h4 className="card-title">{probability}</h4>
          <h5 className="card-subtitle">Reward: {reward}</h5>
          <p className="card-text">{message}</p>
          <p>
            <span className="badge">Expires on turn: {expiresIn}</span>
          </p>
          <button
            type="button"
            disabled={disabled}
            onClick={() => solveMessage(adId)}
            className={suggest ? 'pulsate-bck' : ''}
          >
            Solve
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
