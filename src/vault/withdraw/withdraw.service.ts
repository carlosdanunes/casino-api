import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { checkValidAddress } from 'src/utils/checkAddress';
import { Repository } from 'typeorm';
import { WithdrawStatus } from './constants';
import { WithdrawStatusDto } from './dto/withdraw-status.dto';
import { WithdrawArgs } from './types';
import { Withdraw } from './withdraw.entity';

@Injectable()
export class WithdrawService {
  constructor(
    private readonly userBalanceService: UserBalanceService,
    @InjectRepository(Withdraw)
    private readonly withdrawRepository: Repository<Withdraw>,
  ) {}

  async isAvailable(userId: string) {
    return Boolean(
      await this.withdrawRepository.count({
        where: { userId: userId, status: WithdrawStatus.PENDING },
      }),
    );
  }
  async createWithdraw({
    address,
    amount,
    blockchain,
    currency,
    userId,
  }: WithdrawArgs) {
    this.checkAddress(address, blockchain);
    await this.checkUserBalance({ amount, blockchain, currency, userId });
    await this._createWithdraw({
      address,
      amount,
      blockchain,
      currency,
      userId,
    });

    return { message: 'Withdraw request created' };
  }

  private async checkUserBalance({
    amount,
    blockchain,
    currency,
    userId,
  }: Omit<WithdrawArgs, 'address'>) {
    const userBalance = await this.userBalanceService.getUserBalance(
      userId,
      currency,
      blockchain,
    );
    if (userBalance.amount < amount) {
      throw new BadRequestException('Not enough balance');
    }
  }

  private checkAddress(address: string, blockchain: Blockchains) {
    if (checkValidAddress(blockchain)(address)) return true;
    throw new BadRequestException('Invalid address');
  }

  private async _createWithdraw(withdrawRequest: WithdrawArgs) {
    // return this.withdrawRepository.create(withdrawRequest);
    return await this.withdrawRepository.save({
      address: withdrawRequest.address,
      amount: withdrawRequest.amount,
      blockchain: withdrawRequest.blockchain,
      currency: withdrawRequest.currency,
      userId: withdrawRequest.userId,
    });
  }
  async getAllWithdraws() {
    return await this.withdrawRepository.find({
      relations: {
        userId: true,
      },
    });
  } // TODO:  return only username from user entity !!!

  async withdrawStatus(action: WithdrawStatusDto) {
    await this.withdrawRepository.update(action.id, {
      status: action.status,
    });
    return HttpStatus.CREATED;
  }
}
