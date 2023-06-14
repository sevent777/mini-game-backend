import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConfigurationType } from './configuration-type';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConfigurationType, (configType) => configType.configs)
  configType: ConfigurationType;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    type: 'json',
  })
  content: object;

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

  @Column({ type: 'datetime' })
  effectiveTime: Date;
}
