import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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
    default: 'momo',
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  avatarUrl: string;
}
