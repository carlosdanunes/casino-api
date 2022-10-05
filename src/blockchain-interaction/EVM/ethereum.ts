import { Injectable } from '@nestjs/common';
import { EVM } from './evm';
@Injectable()
export class Ethereum extends EVM {}
