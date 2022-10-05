import { Module } from '@nestjs/common';
import { WssGateway } from './wss.gateway';
import { PriceService } from '../crypto-price/price.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [WssGateway, PriceService],
  imports: [HttpModule, ConfigModule],
})
export class WssModule {}
