import * as DefaultConfig from 'lib/config';

import axios, { type AxiosInstance } from 'axios';
import { describe, expect, inject, it } from 'vitest';
// import { APIErrorCodes } from 'lib/middleware';
import { getAxiosConfig } from './utils/axios';
import { prepareAPIServer } from 'lib/createServer';

import request from 'supertest';

const axiosAPIClient: AxiosInstance = axios.create(
  getAxiosConfig(inject('port'))
);

const connection = (await prepareAPIServer(DefaultConfig.config)).app;

describe('/driver', () => {
  describe('[POST] /', () => {
    describe('[Axios]', () => {
      it('should respond with status `200` and driver details', async () => {
        const res = await axiosAPIClient.post('/driver', {
          name: 'Test Name 2',
          nationality: 'US',
          dob: '2000-01-01',
        });

        expect(res.status).toBe(200);
        expect(res.data).not.toBeNull();

        const { success } = DatabaseTypes.Driver.safeParse(res.data);
        expect(success).toBe(true);
      });
    });

    describe('[Supertest]', () => {
      it('should respond with status `200` and driver details', async () => {
        const res = await request(connection).post('/v1/driver').send({
          name: 'Test Name',
          nationality: 'US',
          dob: '2000-01-01',
        });

        expect(res.status).toBe(200);
        expect(res.body).not.toBeNull();

        const { success } = DatabaseTypes.Driver.safeParse(res.body);
        expect(success).toBe(true);
      });
    });

    it('should respond with status `400`', async () => {
      const result = await axiosAPIClient.post('/driver', {});

      expect(result.status).toBe(400);
      expect(result.data).not.toBeNull();

      const { success, data } = ErrorResponse.safeParse(result.data);

      expect(success).toBe(true);
      expect(data?.internal_code).toBe(APIErrorCodes.SCHEMA_VALIDATION_FAILED);
    });
  });

  describe('[POST] /:driverID', () => {
    it('should respond with status `200` and driver details', () => {
      expect(true).toBe(true);
    });
  });

  describe('[GET] /:driverID', () => {
    it('should respond with status `200` and driver details', () => {
      expect(true).toBe(true);
    });
  });
});
