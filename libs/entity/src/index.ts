import { IS_PROD, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME } from '@app/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

export * from './configuration';
export * from './configuration-type';
export * from './detective';
export * from './user';

export const getTypeormRootModule = (database, entities: BaseDataSourceOptions['entities'] = []) =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database,
    entities,
    logging: true,
    synchronize: !IS_PROD,
  });
