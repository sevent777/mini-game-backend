import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
@Unique(['wxOpenid', 'key'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  key: string;

  @Column()
  wxOpenid?: string;

  @Column()
  name: string;

  @Column()
  avatarUrl: string;
}
