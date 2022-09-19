import { Controller, Get, Post, UseGuards } from '@nestjs/common';
@Controller('deposit')
export class DepositController {
  @Get()
  deposit() {
    return 'deposit';
  }
}
