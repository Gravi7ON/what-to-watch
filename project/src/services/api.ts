import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {getToken} from './token';
import {HTTPStatusCode} from '../const';
import {toast} from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [HTTPStatusCode.BAD_REQUEST]: true,
  [HTTPStatusCode.NOT_FOUND]: true,
  [HTTPStatusCode.UNAUTHORIZED]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://10.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        if (error.response.status === HTTPStatusCode.UNAUTHORIZED) {
          toast.warn(error.response.data.error.slice(0, 18));
          throw error;
        }
        toast.dark(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};

export {createAPI};
