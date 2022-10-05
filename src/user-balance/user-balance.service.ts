import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';
import { DepositType } from 'src/vault/types';
import { Repository } from 'typeorm';
import { UserBalance } from './user-balance.entity';

@Injectable()
export class UserBalanceService {
  constructor(
    @InjectRepository(UserBalance)
    private userBalanceRepository: Repository<UserBalance>,
  ) {}

  getUserBalance(
    userId: string,
    currency: Currency,
    blockchain: Blockchains,
  ): Promise<UserBalance>;

  getUserBalance(userid: string): Promise<UserBalance[]>;

  async getUserBalance(
    userId: string,
    currency?: Currency,
    blockchain?: Blockchains,
  ) {
    const userBalance = await this.userBalanceRepository.find({
      where: { user: { id: userId } },
    });
    if (!userBalance) return null;
    if (currency && blockchain) {
      return userBalance.find(
        balance =>
          balance.currency === currency && balance.blockchain === blockchain,
      );
    }
    return userBalance;
  }

  async createrUserBalance(
    userId: string,
    currency: Currency,
    blockchain: Blockchains,
    amount?: number,
  ) {
    return await this.userBalanceRepository.save({
      user: { id: userId },
      currency,
      blockchain,
      amount: amount || 0,
    });
  }

  // async changeUserBalance(
  //   { amount, blockchain, currency, userId }: DepositType,
  //   action: 'add' | 'sub',
  // ) {
  //   const userBalance = await this.getUserBalance(userId, currency, blockchain);
  //   if (!userBalance)
  //     return await this.createrUserBalance(
  //       userId,
  //       currency,
  //       blockchain,
  //       amount,
  //     );
  //   if (action === 'add') userBalance.amount += amount;
  //   else if (action === 'sub') userBalance.amount -= amount;
  //   else return null;
  //   await this.userBalanceRepository.save(userBalance);
  // }
}
