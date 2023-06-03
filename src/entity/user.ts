import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  key: string;

  @Column({
    nullable: true,
  })
  wxOpenid?: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  avatarUrl: string;
}
