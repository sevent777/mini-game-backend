import { DBName } from '@app/constant';
import { Entity } from 'typeorm';

import { User } from '../user.base';

@Entity({
  database: DBName.detective,
})
export class DetectiveUser extends User {}
