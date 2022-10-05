import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { DepositService } from './deposit.service';
import { DepositDto } from './dto/deposit.dto';
@ApiTags('Deposit')
@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService) {}
  @ApiOperation({ summary: 'Make deposit' })
  @ApiQuery({ name: 'blockchain', enum: Blockchains })
  @ApiResponse({ type: String, status: HttpStatus.OK })
  @Get()
  async deposit(@Query() query: DepositDto, @CurrentUser('id') userId: string) {
    return { address: await this.depositService.deposit({ ...query, userId }) };
  }
}
