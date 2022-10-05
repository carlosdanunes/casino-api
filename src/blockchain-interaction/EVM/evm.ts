import { Wallet } from 'ethers';
import { Blockchain } from '../blockchains';
export abstract class EVM implements Blockchain {
  wallet: Wallet;
  async restoreAddressFromMnemonic(mnemonicPhrase: string): Promise<string> {
    const walletMnemonic = Wallet.fromMnemonic(mnemonicPhrase);
    const address = await walletMnemonic.getAddress();
    return address;
  }
}
