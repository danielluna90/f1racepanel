import type { CreateAxiosDefaults } from 'axios';

export const getAxiosConfig = (port: number): CreateAxiosDefaults => {
  return {
    baseURL: `http://127.0.0.1:${port.toString()}/v1`,
    validateStatus: () => true,
  };
};
