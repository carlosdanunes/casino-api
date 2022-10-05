import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { Currency } from 'src/blockchain-interaction/currency';

export interface WithdrawArgs {
  userId: string;
  address: string;
  amount: number;
  blockchain: Blockchains;
  currency: Currency;
}
