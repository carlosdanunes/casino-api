import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PriceService } from '../crypto-price/price.service';
import Currency from '../crypto-price/symbols';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WssGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly priceService: PriceService) {}
  connectedCount = 0;
  handleConnection() {
    this.connectedCount++;
    if (this.connectedCount === 1)
      this.priceService.startMainLoop(this.server, [
        Currency.BTCUSDT,
        Currency.ETHUSDT,
        Currency.BNBUSDT,
        Currency.SOLUSDT,
      ]);
  }

  handleDisconnect() {
    this.connectedCount--;
    if (!this.connectedCount) this.priceService.stopMainLoop();
  }
}
