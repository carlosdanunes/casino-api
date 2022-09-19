import { Module } from '@nestjs/common';
import { SendTipsController } from './send-tips.controller';

@Module({
  controllers: [SendTipsController],
})
export class SendTipsModule {}
