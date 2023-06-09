import { MAIN_DATABASE_NAME } from '@app/constant';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Configuration } from './configuration';

@Entity({
  database: MAIN_DATABASE_NAME,
})
export class ConfigurationType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  path: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    type: 'json',
    nullable: true,
  })
  schema: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => [Configuration],
  })
  @OneToMany(() => Configuration, (config) => config.configType)
  configs: Configuration[];
}
