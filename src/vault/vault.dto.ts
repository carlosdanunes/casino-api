import { ApiProperty } from '@nestjs/swagger';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';

export abstract class VaultDto {
  @ApiProperty({ enum: Blockchains })
  blockchain: Blockchains;
}
