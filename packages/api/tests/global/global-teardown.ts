import { connection } from '../../src';
import { stopDB } from '../utils/seed-db';

export default async () => {
  connection.close(() => {
    console.log('Closing down server.');
  });

  await stopDB();
};
