import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import { seedDB, startDB } from '../utils/seed-db';
import { initializeWebServer } from '../../src';

export let axiosAPIClient: AxiosInstance;

export default async () => {
  await startDB();
  await seedDB();
  const port = initializeWebServer();

  const AxiosConfig: CreateAxiosDefaults = {
    baseURL: `http://127.0.0.1:${port.toString()}`,
    validateStatus: () => true,
  };

  axiosAPIClient = axios.create(AxiosConfig);
};
