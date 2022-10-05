import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdraw } from './withdraw.entity';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';

@Module({
  imports: [TypeOrmModule.forFeature([Withdraw]), UserBalanceModule],
  controllers: [WithdrawController],
  providers: [WithdrawService],
})
export class WithdrawModule {}
