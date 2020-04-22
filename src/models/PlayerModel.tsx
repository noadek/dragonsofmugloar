export interface IPlayer {
  gameId: string;
  lives: number;
  gold: number;
  level: number;
  score: number;
  highScore: number;
  turn: number;
}

export interface IPlayerState {
  data: IPlayer;
  turnIndex: number;
  loaded: boolean;
  loading: boolean;
}

export const playerState = {
  data: {
    gameId: '',
    lives: 0,
    gold: 0,
    level: 0,
    score: 0,
    highScore: 0,
    turn: 0,
  },
  turnIndex: 0,
  loaded: false,
  loading: false,
};
