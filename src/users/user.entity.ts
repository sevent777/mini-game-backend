import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // @Generated('uuid')
  // key: string;

  @Column()
  wxOpenid?: string;

  @Column()
  name: string;

  @Column()
  avatarUrl: string;
}
