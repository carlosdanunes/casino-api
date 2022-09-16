import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PriceService } from './price/price.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WssGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly priceService: PriceService) {}
  connectedCount = 0;
  handleConnection(@ConnectedSocket() client: Socket) {
    this.connectedCount++;
    if (this.connectedCount === 1)
      this.priceService.startMainLoop(this.server, [
        'BTCUSDT',
        'ETHUSDT',
        'BNBUSDT',
        'SOLUSDT',
      ]);
  }

  handleDisconnect() {
    this.connectedCount--;
    if (!this.connectedCount) this.priceService.stopMainLoop();
  }
}
