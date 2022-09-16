import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseFromBinance } from './dto/responseFromBinance';
import { CryptoPrice } from './dto/crypto-price';
import { Server } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PriceService {
  symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT'];
  private _interval = 1000;
  private _mainLoopInterval: NodeJS.Timer;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  startMainLoop(server: Server, symbols: string[] = this.symbols) {
    this._mainLoopInterval = setInterval(async () => {
      const freshPrice = await this._getPrice(symbols);
      server.emit('price', freshPrice);
    }, this._interval);
  }

  private async _getPrice(symbols: string[]): Promise<CryptoPrice[]> {
    try {
      const url = this.configService.get('BINANCE_PRICE_URL');
      const response = await lastValueFrom(
        this.httpService.get<ResponseFromBinance[]>(
          this._encodeURL(url, symbols, 'symbols'),
        ),
      );

      return response.data.map(price => {
        return {
          symbol: price.symbol,
          priceChange: price.priceChange,
          priceChangePercent: price.priceChangePercent,
          prevPrice: price.prevClosePrice,
          currentPrice: price.lastPrice,
          volume: price.quoteVolume,
        };
      });
    } catch (error) {
      Logger.error(error);
    }
  }
  stopMainLoop() {
    clearInterval(this._mainLoopInterval);
  }

  private _encodeURL(url: string, params: string[], paramName: string) {
    let temp = url + '?' + paramName + '=';
    temp += '%5B';
    for (let i = 0; i < params.length; i++) {
      temp += '%22' + params[i] + '%22';
      if (i != params.length - 1) temp += ',';
    }
    return (temp += '%5D');
  }
}
