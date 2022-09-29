import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ length: 200, unique: true })
  seed: string;

  @Column({ type: 'varchar', length: 1000 })
  avatarUrl: string;

  @Column({ type: 'varchar', length: 10 })
  role: string;

  @Column({ type: 'boolean', default: false })
  is_deleted = false;

  @Column({ type: 'boolean', default: false })
  hide_statistic = false;

  @Column({ type: 'boolean', default: false })
  hide_activity = false;

  @Column({ type: 'boolean', default: false })
  hide_games = false;

  @Column({ type: 'boolean', default: false })
  hide_rewards = false;

  @Column({ type: 'boolean', default: false })
  hide_all_data = false;

  @Column({ type: 'varchar', length: 1000 })
  ban_message: string;

  @CreateDateColumn({ nullable: true })
  deleted_till: Date;

  @CreateDateColumn()
  created_at: Date;
}

export class UserEntity {
  id: string;
  username: string;
  email: string;
  @Exclude()
  password: string;
  @Exclude()
  seed: string;
  avatarUrl: string;
  role: string;
  access_token?: string;
  deleted_till: Date;
  ban_message: string;
  created_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
