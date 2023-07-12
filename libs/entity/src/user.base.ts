import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn } from 'typeorm';

export abstract class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
    unique: true,
  })
  wxOpenid?: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  avatarUrl: string;
}
