import { Module } from '@nestjs/common';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { ExchangeModule } from './exchange/exchange.module';
import { SendTipsModule } from './send-tips/send-tips.module';

@Module({
  imports: [DepositModule, WithdrawModule, ExchangeModule, SendTipsModule],
  providers: [],
})
export class VaultModule {}
