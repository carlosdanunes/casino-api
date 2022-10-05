import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { User } from 'src/users/users.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SendTipsService {
  logger: Logger;
  constructor(
    private userBalanceService: UserBalanceService,
    private dataSource: DataSource,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.logger = new Logger('SendTipsService');
  }
  async transfer(
    from: string,
    amount: number,
    blockchain: Blockchains,
    currency: Currency,
    to: string,
  ) {
    const receiver = await this.usersRepository.findOne({
      where: { username: to },
    });

    if (!receiver) throw new NotFoundException('receiver not found');
    const sender = await this.usersRepository.findOne({ where: { id: from } });
    const senderBalance = await this.userBalanceService.getUserBalance(
      from,
      currency,
      blockchain,
    );
    if (senderBalance.amount < amount)
      throw new BadRequestException('Not enough balance');

    let receiverBalance = await this.userBalanceService.getUserBalance(
      sender.id,
      currency,
      blockchain,
    );
    if (!receiverBalance) {
      receiverBalance = await this.userBalanceService.createrUserBalance(
        receiver.id,
        currency,
        blockchain,
      );
    }
    senderBalance.amount -= amount;
    receiverBalance.amount += amount;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(senderBalance);
      await queryRunner.manager.save(receiverBalance);
      await queryRunner.commitTransaction();
      return { message: 'Transfer successful' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw new InternalServerErrorException('Error while making transaction');
    } finally {
      await queryRunner.release();
    }
  }
}
