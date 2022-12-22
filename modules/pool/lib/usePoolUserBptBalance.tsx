import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { useUserBalances } from '~/lib/user/useUserBalances';
import { parseUnits } from 'ethers/lib/utils';
import { tokenGetAmountForAddress } from '~/lib/services/token/token-util';
import { useProvider } from 'wagmi';
import { useQuery } from 'react-query';
import { formatFixed } from '@ethersproject/bignumber';
import { gaugeStakingService } from '~/lib/services/staking/gauge-staking.service';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { usePool } from '~/modules/pool/lib/usePool';
import { createContext, ReactNode, useContext } from 'react';
import { BigNumber } from 'ethers';

const DUST_THRESHOLD = BigNumber.from('1000000000000');

export function _usePoolUserBptBalance() {
  const { pool } = usePool();
  const { userWalletBptBalance, ...userWalletBalanceQuery } = usePoolUserBptWalletBalance();
  const { data: userStakedBptBalance, ...userStakedBalanceQuery } = usePoolUserStakedBalance();

  const userStakedBptBalanceScaled = parseUnits(userStakedBptBalance || '0', 18);
  const userTotalBptBalanceScaled = userWalletBptBalance.add(userStakedBptBalanceScaled);
  const userTotalBptBalance = formatFixed(userTotalBptBalanceScaled, 18);
  const userPercentShare =
    parseFloat(userTotalBptBalance) / parseFloat(pool.dynamicData.totalShares);

  async function refetch() {
    await userWalletBalanceQuery.refetch();
    await userStakedBalanceQuery.refetch();
  }

  return {
    isLoading: userWalletBalanceQuery.isLoading || userStakedBalanceQuery.isLoading,
    isRefetching: userWalletBalanceQuery.isRefetching || userStakedBalanceQuery.isRefetching,
    isError: userWalletBalanceQuery.isError || userStakedBalanceQuery.isError,
    error: userWalletBalanceQuery.error || userStakedBalanceQuery.error,
    refetch,

    userTotalBptBalance: formatFixed(userWalletBptBalance.add(userStakedBptBalanceScaled), 18),
    userWalletBptBalance: formatFixed(userWalletBptBalance, 18),
    userStakedBptBalance: formatFixed(userStakedBptBalanceScaled, 18),
    hasBpt: userTotalBptBalanceScaled.gt(DUST_THRESHOLD),
    hasBptInWallet: userWalletBptBalance.gt(DUST_THRESHOLD),
    hasBptStaked: userStakedBptBalanceScaled.gt(DUST_THRESHOLD),
    userPercentShare,
  };
}

function usePoolUserBptWalletBalance() {
  const { pool } = usePool();
  const { userBalances, ...userBalancesQuery } = useUserBalances([pool.address], [pool]);

  const userWalletBptBalance = parseUnits(tokenGetAmountForAddress(pool.address, userBalances), 18);

  return {
    ...userBalancesQuery,
    userWalletBptBalance,
  };
}

function usePoolUserStakedBalance() {
  const { pool } = usePool();
  const { userAddress } = useUserAccount();
  const provider = useProvider();

  return useQuery(
    ['poolUserStakedBalance', pool.id, pool.staking?.id || '', userAddress || ''],
    async (): Promise<AmountHumanReadable> => {
      if (!userAddress || !pool.staking) {
        return '0';
      }

      switch (pool.staking.type) {
        case 'GAUGE':
          return gaugeStakingService.getUserStakedBalance({
            userAddress,
            gaugeAddress: pool.staking.gauge?.gaugeAddress || '',
            provider,
          });
      }

      return '0';
    },
    {},
  );
}

export const PoolUserBptBalanceContext = createContext<ReturnType<
  typeof _usePoolUserBptBalance
> | null>(null);

export function PoolUserBptBalanceProvider(props: { children: ReactNode }) {
  const value = _usePoolUserBptBalance();

  return (
    <PoolUserBptBalanceContext.Provider value={value}>
      {props.children}
    </PoolUserBptBalanceContext.Provider>
  );
}

export function usePoolUserBptBalance() {
  return useContext(PoolUserBptBalanceContext) as ReturnType<typeof _usePoolUserBptBalance>;
}
