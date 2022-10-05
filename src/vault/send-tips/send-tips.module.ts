import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';
import { User } from 'src/users/users.entity';
import { SendTipsController } from './send-tips.controller';
import { SendTipsService } from './send-tips.service';

@Module({
  imports: [UserBalanceModule, TypeOrmModule.forFeature([User])],
  controllers: [SendTipsController],
  providers: [SendTipsService],
})
export class SendTipsModule {}
