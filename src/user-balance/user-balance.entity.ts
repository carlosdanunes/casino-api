import { ApiProperty } from '@nestjs/swagger';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_balance')
export class UserBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, user => user.id)
  user: User;
  @ApiProperty({ enum: Blockchains })
  @Column({ type: 'enum', enum: Blockchains })
  blockchain: Blockchains;
  @ApiProperty({ enum: Currency, description: 'native or another token' })
  @Column({ type: 'enum', enum: Currency })
  currency: Currency;
  @ApiProperty()
  @Column({ type: 'int' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
