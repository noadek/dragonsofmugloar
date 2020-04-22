export interface IMessage {
  adId: string;
  message: string;
  reward: string;
  expiresIn: number;
  probability: string;
}

export interface IMessageState {
  data: IMessage[];
  loaded: boolean;
  loading: boolean;
}

export interface ISolution {
  success: boolean;
  message: string;
  adId: string;
}

export interface ISolutionState {
  data: ISolution;
  loaded: boolean;
  loading: boolean;
}

export const messageState = {
  data: [],
  loaded: false,
  loading: false,
};

export const solutionState = {
  data: {
    success: false,
    message: '',
    adId: '',
  },
  loaded: false,
  loading: false,
};
