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

  @Column()
  name: string;

  @Column()
  avatarUrl: string;
}
