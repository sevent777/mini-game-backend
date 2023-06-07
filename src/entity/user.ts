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
