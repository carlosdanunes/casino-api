import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TransferDto } from './dto/transfer.dto';
import { SendTipsService } from './send-tips.service';
@ApiTags('Send to user')
@Controller('send')
export class SendTipsController {
  constructor(private sendTipsService: SendTipsService) {}
  @ApiCreatedResponse({ description: 'Transfer successful' })
  @ApiBadRequestResponse({ description: 'Not enough balance' })
  @ApiOperation({ summary: 'Transfer tokens or native crypto' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async sendTips(
    @Body() sendTipsDto: TransferDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.sendTipsService.transfer(
      userId,
      sendTipsDto.amount,
      sendTipsDto.blockchain,
      sendTipsDto.currency,
      sendTipsDto.username,
    );
  }
}
