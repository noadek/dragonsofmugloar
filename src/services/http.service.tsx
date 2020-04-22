import axios, { AxiosRequestConfig } from 'axios';

const req = new Map();

const http = {
  request(config: AxiosRequestConfig) {
    const { url, method } = config;
    let cancelToken;
    // cancel duplicate get requests
    if (method && method.toLowerCase() === 'get') {
      let source = req.get(url);
      if (source) {
        source.cancel('Duplicate request canceled.');
      }
      source = axios.CancelToken.source();
      req.set(url, source);
      cancelToken = source.token;
    }

    const result = axios({ ...config, ...{ cancelToken } })
      .catch(error => {
        if (axios.isCancel(error)) {
          // console.log('Request canceled', error);
        } else {
          throw error;
        }
      })
      .finally(() => {
        // memory cleanup: remove requests stored in dictionary
        setTimeout(() => {
          req.delete(url);
        });
      });

    return result;
  },
};

export default http;
