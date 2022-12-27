import { useQuery } from 'react-query';
import { multicall, Multicaller } from '~/lib/services/util/multicaller.service';
import { networkProvider } from '~/lib/global/network';
import { mapValues } from 'lodash';
import { BigNumber } from 'ethers';
import { formatUnits } from '@ethersproject/units';

export type MulticallMappedBigNumberResult = Record<string, BigNumber>;

interface UseMultiCallInput {
  abi: any[];
  calls: { address: string; functionName: string; args?: any[] }[];
  options?: any;
  requireSuccess?: boolean;
  enabled?: boolean;
  cacheTimeMs?: number;
}

export function useMultiCall<T>({
  abi,
  calls,
  options = {},
  requireSuccess = false,
  enabled = true,
  cacheTimeMs,
}: UseMultiCallInput) {
  return useQuery<(T | null)[]>(
    [
      'useMultiCall',
      requireSuccess,
      JSON.stringify(abi),
      JSON.stringify(calls),
      JSON.stringify(options),
    ],
    async () => {
      if (calls.length === 0) {
        return [];
      }

      const response = await multicall<T>(
        networkProvider,
        abi,
        calls.map((call) => [call.address, call.functionName, call.args]),
        options,
        requireSuccess,
      );

      return response;
    },
    { enabled, refetchInterval: cacheTimeMs },
  );
}

export async function mapBigNumberResult(multicaller: Multicaller, decimlas = 18) {
  const result = await multicaller.execute<MulticallMappedBigNumberResult>();
  return mapValues(result, (bn) => formatUnits(bn, decimlas));
}
