import { Module } from '@nestjs/common';
import { WssGateway } from './wss.gateway';
import { PriceService } from './price/price.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [WssGateway, PriceService],
  imports: [HttpModule],
})
export class WssModule {}
