import axios, { AxiosInstance } from 'axios';
import { describe, expect, inject, it } from 'vitest';
import { DatabaseTypes } from 'f1racepanel-common';
import { getAxiosConfig } from './utils/axios';

const axiosAPIClient: AxiosInstance = axios.create(
  getAxiosConfig(inject('port'))
);

describe('/driver', () => {
  describe('[POST] /', () => {
    it('should response with status `200` and driver details', async () => {
      const result = await axiosAPIClient.post('/driver', {
        name: 'Test Name',
        nationality: 'US',
        dob: '2000-01-01',
      });

      expect(result.status).toBe(200);
      expect(result.data).not.toBeNull();

      const { success } = DatabaseTypes.Driver.safeParse(result.data);
      expect(success).toBe(true);
    });
  });

  describe('[POST] /:driverID', () => {
    it('should response with status `200` and driver details', () => {
      expect(true).toBe(true);
    });
  });

  describe('[GET] /:driverID', () => {
    it('should response with status `200` and driver details', () => {
      expect(true).toBe(true);
    });
  });
});
