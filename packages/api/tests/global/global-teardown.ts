import { connection } from '../../src';

export default () => {
  connection.close(() => {
    console.log('Closing down server.');
  });
};
