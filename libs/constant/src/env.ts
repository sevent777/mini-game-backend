import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
  dotenv.config({ path: '.env.secret' });
}

const port = process.env.PORT || 80;

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = '', JWT_SECRET } = process.env;
const [MYSQL_HOST, MYSQL_PORT] = MYSQL_ADDRESS.split(':');

export { JWT_SECRET, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME, port };
