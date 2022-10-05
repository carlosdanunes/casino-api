import { validate } from 'bitcoin-address-validation';
import { Blockchains } from 'src/blockchain-interaction/blockchains';

const checkBitcoinAddress = (address: string) => {
  return validate(address);
};
const checkEthereumAddress = (address: string) => {
  return address.match(/^0x[a-fA-F0-9]{40}$/) !== null;
};

const checkTronAddress = (address: string) => {
  return address.match(/^(T|t)[a-zA-Z1-9]{33}$/) !== null;
};

const checkSolanaAddress = (address: string) => {
  return address.match(/^[a-zA-Z0-9]{43}$/) !== null;
};

export const checkValidAddress = (chain: Blockchains) => {
  switch (chain) {
    case Blockchains.Bitcoin:
      return checkBitcoinAddress;
    case Blockchains.Ethereum:
      return checkEthereumAddress;
    case Blockchains.Tron:
      return checkTronAddress;
    case Blockchains.Solana:
      return checkSolanaAddress;
    default:
      return checkEthereumAddress;
  }
};
