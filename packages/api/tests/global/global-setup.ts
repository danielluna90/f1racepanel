import { initializeWebServer } from '../../src';

import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export let axiosAPIClient: AxiosInstance;

export default () => {
  const port = initializeWebServer();

  const AxiosConfig: CreateAxiosDefaults = {
    baseURL: `http://127.0.0.1:${port.toString()}`,
    validateStatus: () => true,
  };

  axiosAPIClient = axios.create(AxiosConfig);
};
