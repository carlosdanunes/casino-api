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

  @Column({ type: 'varchar', length: 1000 })
  avatarUrl: string;

  @Column({ type: 'varchar', length: 10 })
  role: string;

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

  @CreateDateColumn()
  created_at: Date;
}
