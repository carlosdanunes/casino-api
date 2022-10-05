export enum Blockchains {
  Ethereum = 'ethereum',
  Binance = 'binance',
  Solana = 'solana',
  Tron = 'tron',
  Bitcoin = 'bitcoin',
}

export interface Blockchain {
  restoreAddressFromMnemonic(mnemonicPhrase: string): Promise<string>;
}
