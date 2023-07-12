import { DBName } from '@app/constant';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { User } from '../user.base';

@Entity({
  database: DBName.detective,
})
export class DetectiveUser extends User {
  @ApiProperty()
  @Column({
    type: 'int',
    default: 0,
  })
  totalScore: number;
}
