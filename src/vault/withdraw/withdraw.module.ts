import { Module } from '@nestjs/common';
import { WithdrawController } from './withdraw.controller';

@Module({
  controllers: [WithdrawController],
})
export class WithdrawModule {}
