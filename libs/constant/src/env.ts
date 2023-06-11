import dotenv from 'dotenv';

export const IS_PROD = process.env.NODE_ENV !== 'development';

if (!IS_PROD) {
  dotenv.config({ path: '.env.local' });
  dotenv.config({ path: '.env.secret' });
}

const port = process.env.PORT || 80;

const {
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_ADDRESS = '',
  JWT_SECRET,
  ADMIN_TOKEN = '',
} = process.env;
const [MYSQL_HOST, MYSQL_PORT] = MYSQL_ADDRESS.split(':');

export { ADMIN_TOKEN, JWT_SECRET, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME, port };
