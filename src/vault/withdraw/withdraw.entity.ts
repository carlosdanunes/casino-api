import { ApiProperty } from '@nestjs/swagger';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WithdrawStatus } from './constants';

@Entity('withdraw')
export class Withdraw {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, user => user.id)
  userId: string;
  @Column({ type: 'enum', enum: Blockchains })
  blockchain: Blockchains;
  @Column({ type: 'enum', enum: Currency })
  currency: Currency;
  @Column({ type: 'int' })
  amount: number;
  @Column({ type: 'varchar' })
  address: string;
  @Column({
    type: 'enum',
    enum: WithdrawStatus,
    default: WithdrawStatus.PENDING,
  })
  status: WithdrawStatus;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
