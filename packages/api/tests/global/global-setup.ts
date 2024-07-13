import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import { connection, initializeWebServer } from '../../src';
import { seedDB, startDB, stopDB } from '../utils/seed-db';

export let axiosAPIClient: AxiosInstance;

export async function setup() {
  await startDB();
  await seedDB();
  const port = initializeWebServer();

  const AxiosConfig: CreateAxiosDefaults = {
    baseURL: `http://127.0.0.1:${port.toString()}`,
    validateStatus: () => true,
  };

  axiosAPIClient = axios.create(AxiosConfig);
}

export async function teardown() {
  connection.close(() => {
    console.log('Closing down server.');
  });

  await stopDB();
}
