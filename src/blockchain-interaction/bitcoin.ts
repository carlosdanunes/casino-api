import { Injectable } from '@nestjs/common';
import { BIP32Factory } from 'bip32';
import { mnemonicToSeed } from 'bip39';
import { networks, payments } from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { Blockchain } from './blockchains';
@Injectable()
export class Bitcoin implements Blockchain {
  private mnemonicToSeed = mnemonicToSeed;
  private bip32 = BIP32Factory(ecc);

  async restoreAddressFromMnemonic(mnemonicPhrase: string): Promise<string> {
    const seed = await this.mnemonicToSeed(mnemonicPhrase);
    const root = this.bip32.fromSeed(seed, networks.bitcoin);
    const child = root.derivePath("m/44'/0'/0'/0/0");
    return payments.p2wpkh({ pubkey: child.publicKey }).address;
  }
}
