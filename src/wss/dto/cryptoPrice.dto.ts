import Currency from '../../crypto-price/symbols';

export class CryptoPrice {
  symbol: Currency;
  priceChange: string;
  priceChangePercent: string;
  prevPrice: string;
  currentPrice: string;
  volume: string;
}
