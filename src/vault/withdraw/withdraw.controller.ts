import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { WithdrawStatusDto } from './dto/withdraw-status.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { WithdrawArgs } from './types';
import { Withdraw } from './withdraw.entity';
import { WithdrawService } from './withdraw.service';

@ApiTags('Withdraw')
@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}
  @ApiResponse({ type: Boolean, status: HttpStatus.OK })
  @ApiOperation({ summary: 'is available withdraw for user right now' })
  @Get()
  isAvailable(@CurrentUser('id') userId: string) {
    return this.withdrawService.isAvailable(userId);
  }
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Withdraw tokens or native crypto' })
  @Post()
  withdraw(
    @Body() withdrawDto: WithdrawDto,
    @CurrentUser('id') userId: string,
  ) {
    const args: WithdrawArgs = { ...withdrawDto, userId };
    return this.withdrawService.createWithdraw(args);
  }
  @Get('all')
  @ApiOperation({ summary: 'Get all withdraws' })
  @ApiResponse({ status: HttpStatus.OK, type: [WithdrawDto] })
  getAllWithdraws() {
    return this.withdrawService.getAllWithdraws();
  }
  @Post('status')
  @ApiOperation({ summary: 'Change status for withdraw' })
  @ApiResponse({ status: HttpStatus.CREATED })
  changeStatus(@Body() withdrawStatusDto: WithdrawStatusDto) {
    return this.withdrawService.withdrawStatus(withdrawStatusDto);
  }
}
