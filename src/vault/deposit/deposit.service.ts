import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bitcoin } from 'src/blockchain-interaction/bitcoin';
import { Binance } from 'src/blockchain-interaction/EVM/binance';
import { Ethereum } from 'src/blockchain-interaction/EVM/ethereum';
import { Solana } from 'src/blockchain-interaction/solana';
import { Tron } from 'src/blockchain-interaction/tron';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Blockchains } from 'src/blockchain-interaction/blockchains';
import { UserBalanceService } from 'src/user-balance/user-balance.service';
import { DepositType } from '../types';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private tron: Tron,
    private solana: Solana,
    private binance: Binance,
    private ethereum: Ethereum,
    private bitcoin: Bitcoin,
    private userBalanceService: UserBalanceService,
  ) {}

  async deposit(deposit: DepositType) {
    let testSwitcher = false;
    try {
      const mnemonicPhrase = await this.getMnemonicPhrase(deposit.userId);
      switch (deposit.blockchain) {
        case Blockchains.Tron:
          return this.tron.restoreAddressFromMnemonic(mnemonicPhrase);
        case Blockchains.Solana:
          return this.solana.restoreAddressFromMnemonic(mnemonicPhrase);
        case Blockchains.Binance:
          return this.binance.restoreAddressFromMnemonic(mnemonicPhrase);
        case Blockchains.Ethereum:
          return this.ethereum.restoreAddressFromMnemonic(mnemonicPhrase);
        case Blockchains.Bitcoin:
          return this.bitcoin.restoreAddressFromMnemonic(mnemonicPhrase);
        default:
          console.log("Blockchain doesn't exist");
          return null;
      }
    } catch (error) {
      if (testSwitcher) testSwitcher = false;
      console.log(error);
    } finally {
      // await this.changeBalance(deposit);
    }
  }

  private async getMnemonicPhrase(id: string) {
    return (await this.usersRepository.findOne({ where: { id } })).seed;
  }

  // private async changeBalance(deposit: DepositType) {
  //   await this.userBalanceService.changeUserBalance(deposit, 'add');
  // }
}
