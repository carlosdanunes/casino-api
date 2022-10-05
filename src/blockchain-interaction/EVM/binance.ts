import { Injectable } from '@nestjs/common';
import { EVM } from './evm';

@Injectable()
export class Binance extends EVM {}
