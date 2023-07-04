import { IS_PROD, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME } from '@app/constant';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export * from './configuration';
export * from './configuration-type';
export * from './detective';
export * from './user';

export const BaseTypeOrmModuleOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  logging: true,
  synchronize: !IS_PROD,
};
