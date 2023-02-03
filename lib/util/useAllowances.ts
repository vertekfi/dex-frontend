import { useMultiCall } from '~/lib/util/useMultiCall';
import {
  AmountHumanReadable,
  TokenAmountHumanReadable,
  TokenBase,
} from '~/lib/services/token/token-types';
import ERC20Abi from '../abi/ERC20.json';
import { networkConfig } from '~/lib/config/network-config';
import { formatFixed } from '@ethersproject/bignumber';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

//TODO: ideally we refetch anytime an allowance changes, so this could theoretically be very long living
const ALLOWANCES_CACHE_TIME_MS = 30_000;

export function useAllowances(
  account: string | null,
  tokens: TokenBase[] | { address: string; decimals: number }[],
  contract = networkConfig.balancer.vault,
) {
  const containsEth =
    tokens.filter((token) => token.address === networkConfig.eth.address.toLowerCase()).length > 0;
  const filteredTokens = tokens.filter(
    (token) => token.address !== networkConfig.eth.address.toLowerCase(),
  );

  const { data, ...rest } = useMultiCall<BigNumber>({
    abi: ERC20Abi,
    calls: filteredTokens.map((token) => ({
      address: token.address,
      functionName: 'allowance',
      args: [account || AddressZero, contract],
    })),
    enabled: account !== null,
    cacheTimeMs: ALLOWANCES_CACHE_TIME_MS,
  });

  const allowances: TokenAmountHumanReadable[] = data
    ? filteredTokens.map((token, index) => {
        return {
          address: token.address,
          amount: data && data[index] ? formatFixed(data[index] || '0', token.decimals) : '0',
        };
      })
    : [];

  if (containsEth) {
    allowances.push({
      address: networkConfig.eth.address.toLowerCase(),
      amount: MaxUint256.toString(),
    });
  }

  function hasApprovalForAmount(address: string, amount: AmountHumanReadable) {
    if (amount === '') return true;

    address = address.toLowerCase();
    console.log(allowances);
    const allowance =
      allowances.find((allowance) => allowance.address.toLowerCase() === address)?.amount || '0';

    console.log(allowance);

    if (parseFloat(allowance) === 0) return false;

    const decimals =
      tokens.find((token) => token.address.toLowerCase() === address)?.decimals || 18;
    return parseUnits(allowance, decimals).gte(parseUnits(amount, decimals));
  }

  return {
    data: allowances,
    hasApprovalForAmount,
    ...rest,
  };
}
