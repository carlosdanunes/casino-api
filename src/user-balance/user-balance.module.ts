import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UserBalanceController } from './user-balance.controller';
import { UserBalance } from './user-balance.entity';
import { UserBalanceService } from './user-balance.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBalance, User])],
  providers: [UserBalanceService],
  controllers: [UserBalanceController],
  exports: [UserBalanceService],
})
export class UserBalanceModule {}
