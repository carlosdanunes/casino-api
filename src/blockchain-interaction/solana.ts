import { Injectable } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeed } from 'bip39';
import { Blockchain } from './blockchains';
@Injectable()
export class Solana implements Blockchain {
  private keypair = Keypair;
  private mnemonicToSeed = mnemonicToSeed;
  async restoreAddressFromMnemonic(mnemonicPhrase: string): Promise<string> {
    const seed = await this.mnemonicToSeed(mnemonicPhrase);
    const keypair = this.keypair.fromSeed(seed.slice(0, 32));
    return keypair.publicKey.toBase58();
  }
}
