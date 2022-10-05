import { ApiProperty } from '@nestjs/swagger';
import { Currency } from 'src/blockchain-interaction/currency';
import { VaultDto } from 'src/vault/vault.dto';

export class WithdrawDto extends VaultDto {
  @ApiProperty()
  amount: number;
  @ApiProperty({ enum: Currency })
  currency: Currency;
  @ApiProperty()
  address: string;
}
