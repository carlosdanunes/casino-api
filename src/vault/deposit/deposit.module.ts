import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { Solana } from '../../blockchain-interaction/solana';
import { Ethereum } from '../../blockchain-interaction/EVM/ethereum';
import { Tron } from '../../blockchain-interaction/tron';
import { Binance } from '../../blockchain-interaction/EVM/binance';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';
import { Bitcoin } from 'src/blockchain-interaction/bitcoin';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserBalanceModule],
  controllers: [DepositController],
  providers: [DepositService, Solana, Ethereum, Tron, Binance, Bitcoin],
})
export class DepositModule {}
