import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column({
    type: 'json',
  })
  content: string;

  @ApiProperty()
  @Column({
    type: 'json',
    nullable: true,
  })
  schema: string;
}
