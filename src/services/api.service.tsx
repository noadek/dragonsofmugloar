import http from './http.service';

const url = 'https://dragonsofmugloar.com';
const endpoint = {
  start: `${url}/api/v2/game/start`,
  messages: `${url}/api/v2/:gameId/messages`,
  solve: `${url}/api/v2/:gameId/solve/:adId`,
  shopItems: `${url}/api/v2/:gameId/shop`,
  buy: `${url}/api/v2/:gameId/shop/buy/:itemId`,
};

const GameAPI = {
  start(): Promise<any> {
    return http.request({ method: 'POST', url: endpoint.start });
  },

  getMessages(gameId: string): Promise<any> {
    return http.request({
      method: 'GET',
      url: endpoint.messages.replace(':gameId', gameId),
    });
  },

  solveMessage(gameId: string, adId: string): Promise<any> {
    return http.request({
      method: 'POST',
      url: endpoint.solve.replace(':gameId', gameId).replace(':adId', adId),
    });
  },

  getShopItems(gameId: string): Promise<any> {
    return http.request({
      method: 'GET',
      url: endpoint.shopItems.replace(':gameId', gameId),
    });
  },

  buyItem(gameId: string, itemId: string): Promise<any> {
    return http.request({
      method: 'POST',
      url: endpoint.buy.replace(':gameId', gameId).replace(':itemId', itemId),
    });
  },
};

export default GameAPI;
