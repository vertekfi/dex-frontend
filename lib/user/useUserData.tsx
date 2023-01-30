import { useGetUserDataQuery } from '~/apollo/generated/graphql-codegen-generated';
import { sum } from 'lodash';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { makeVar } from '@apollo/client';
import { useAsyncEffect } from '~/lib/util/custom-hooks';
import { createContext, ReactNode, useContext } from 'react';

const refetchingVar = makeVar(false);
const currentUserAddressVar = makeVar<string | null>(null);

export function _useUserData() {
  const { userAddress } = useUserAccount();
  const { data, loading, refetch, ...rest } = useGetUserDataQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  });
  const currentUserAddress = currentUserAddressVar();
  const userAddressChanged = userAddress !== currentUserAddress;

  useAsyncEffect(async () => {
    if (!refetchingVar()) {
      refetchingVar(true);
      await refetch();
      refetchingVar(false);
      currentUserAddressVar(userAddress);
    }
  }, [userAddress]);

  const poolBalances = data?.balances || [];
  const staking = data?.staking || [];

  const portfolioValueUSD = sum(
    poolBalances.map((balance) => parseFloat(balance.totalBalance) * balance.tokenPrice),
  );

  const stakedValueUSD = sum(
    poolBalances.map((balance) => parseFloat(balance.stakedBalance) * balance.tokenPrice),
  );

  function bptBalanceForPool(poolId: string): AmountHumanReadable {
    const bptBalance = poolBalances.find((pool) => pool.poolId === poolId)?.totalBalance || '0';
    return bptBalance;
  }

  function usdBalanceForPool(poolId: string): number {
    const balance = poolBalances.find((pool) => pool.poolId === poolId);
    if (!balance) {
      return 0;
    }

    return balance.tokenPrice * parseFloat(balance.totalBalance);
  }

  function usdBalanceForPoolAmount(poolId: string, amount: string): number {
    const balance = poolBalances.find((pool) => pool.poolId === poolId);
    if (!balance) {
      return 0;
    }

    return balance.tokenPrice * parseFloat(amount);
  }

  function hasBptInWalletForPool(poolId: string): boolean {
    const bptBalance = poolBalances.find((pool) => pool.poolId === poolId);

    return parseFloat(bptBalance?.walletBalance || '0') > 0;
  }

  return {
    ...rest,
    loading: loading || userAddressChanged,
    refetch,
    portfolioValueUSD,
    poolBalances,
    staking,
    userPoolIds: [...poolBalances.map((balance) => balance.poolId)],
    bptBalanceForPool,
    usdBalanceForPool,
    usdBalanceForPoolAmount,
    hasBptInWalletForPool,
    stakedValueUSD,
  };
}

export const UserDataContext = createContext<ReturnType<typeof _useUserData> | null>(null);

export function UserDataProvider(props: { children: ReactNode }) {
  const value = _useUserData();

  return <UserDataContext.Provider value={value}>{props.children}</UserDataContext.Provider>;
}

export function useUserData() {
  return useContext(UserDataContext) as ReturnType<typeof _useUserData>;
}
