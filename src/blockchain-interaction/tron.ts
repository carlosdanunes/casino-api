import { Injectable } from '@nestjs/common';
import * as ecc from 'tiny-secp256k1';
import { mnemonicToSeed } from 'bip39';
import { BIP32Factory } from 'bip32';
import * as TronWeb from 'tronweb';
import { Blockchain } from './blockchains';
@Injectable()
export class Tron implements Blockchain {
  private mnemonicToSeed = mnemonicToSeed;
  private bip32 = BIP32Factory(ecc);

  async restoreAddressFromMnemonic(mnemonicPhrase: string): Promise<string> {
    const seed = await this.mnemonicToSeed(mnemonicPhrase);
    const node = this.bip32.fromSeed(seed);
    const child = node.derivePath("m/44'/195'/0'/0/0");
    const privateKey = child.privateKey.toString('hex');
    return this.getPublicKeyFromPrivateKey(privateKey);
  }
  private getPublicKeyFromPrivateKey(privateKey: string): string {
    return TronWeb.address.fromPrivateKey(privateKey);
  }

  private _getPublicKeyFromPrivateKey(privateKey: string): string {
    return ecc.pointFromScalar(Buffer.from(privateKey, 'hex'), true).toString();
  }
}
