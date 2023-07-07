import { DBName } from '@app/constant';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  database: DBName.detective,
  synchronize: true,
})
export class AnswerRecord {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userID: number;

  @ApiProperty()
  @Column()
  testID: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({
    type: 'json',
  })
  content: object;

  @ApiProperty()
  @Column({
    type: 'int',
  })
  duration: number;

  @ApiProperty()
  @Column({
    type: 'int',
  })
  score: number;
}
