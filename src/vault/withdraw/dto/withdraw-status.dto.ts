import { ApiProperty } from '@nestjs/swagger';
import { WithdrawStatus } from '../constants';

export class WithdrawStatusDto {
  @ApiProperty({ enum: WithdrawStatus })
  status: WithdrawStatus;
  @ApiProperty()
  id: string;
}
