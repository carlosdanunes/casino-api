import { DepositDto } from './deposit/dto/deposit.dto';

export type DepositType = DepositDto & { userId: string };
