import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
}

const port = process.env.PORT || 80;

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = '' } = process.env;
console.log('object :>> ', MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS, port);
const [MYSQL_HOST, MYSQL_PORT] = MYSQL_ADDRESS.split(':');

export { MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME, port };
