import { useGetTokens } from './useToken';
import BigNumber from 'bignumber.js';
import { fNum2 } from '../util/useNumber';

export function useNumbers() {
  const { priceFor } = useGetTokens();

  function toFiat(amount: number | string, tokenAddress: string): string {
    const price = priceFor(tokenAddress);
    const tokenAmount = new BigNumber(amount);
    return tokenAmount.times(price).toString();
  }

  return {
    toFiat,
    fNum2,
  };
}
