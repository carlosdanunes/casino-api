import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserBalanceService } from './user-balance.service';
import { UserAdminGuard } from '../users/users.guard';
import { UserBalance } from './user-balance.entity';
@ApiTags('User balance')
@Controller('balance')
export class UserBalanceController {
  constructor(private readonly userBalanceService: UserBalanceService) {}

  @ApiOperation({ summary: 'Get user balance for author' })
  @ApiResponse({ status: 200, type: [UserBalance] })
  @Get()
  getBalance(@CurrentUser('id') userId: string) {
    return this.userBalanceService.getUserBalance(userId);
  }

  @ApiOperation({ summary: 'Get user balance for admin' })
  @UseGuards(UserAdminGuard)
  @Post()
  getBalanceForAdmin(@Body('userId') userId: string) {
    return this.userBalanceService.getUserBalance(userId);
  }
}
